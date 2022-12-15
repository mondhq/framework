import { Logger } from "@blazingworks/logger";
import PrettyConsoleTransport from "@blazingworks/logger-transport-prettyconsole";
import * as fs from "fs";
import * as path from "path";
import errors, { ErrorData, errorLink } from "./errors";
import MondConfig from "./interfaces/config/MondConfig";
import { BaseInteraction, Client as DiscordClient, REST, RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js";
import MondCommand from "./builders/MondCommand";
import MondEvent from "./builders/MondEvent";
import MondEvents from "./enum/MondEvents";

export default class Mond {
    public logger: Logger;
    private configValid = false;
    private configLoaded = false;
    public static config: MondConfig = {
        logger: {},
    };

    private client: DiscordClient;
    private rest: REST;

    private commands: Map<string, MondCommand> = new Map();
    private events: Map<string, MondEvent> = new Map();

    constructor(logger?: Logger) {
        // Setup Config
        this.loadConfig();

        // Setup Logger
        this.logger = logger
            ? logger
            : new Logger({
                  transports: [
                      {
                          module: new PrettyConsoleTransport(Mond.config.logger),
                      },
                  ],
              });

        this.logger.info("Mond Client constructed");

        // Create Discord Client
        this.client = new DiscordClient({
            intents: [],
        });

        // Create Discord REST
        this.rest = new REST({ version: "10" }).setToken(process.env.MOND_TOKEN || "");

        // Warn if no config found or config is invalid
        if (!this.configLoaded) {
            this.error("noConfig");
        } else if (!this.configValid) {
            this.error("invalidConfig");
        }
    }

    public start() {
        this.logger.info("Starting Mond Client...");
        this.client.login(process.env.MOND_TOKEN);

        const interactionEvent = new MondEvent()
            .setName("mondInternal:interactionCreate")
            .setEvent(MondEvents.InteractionCreate)
            .setHandler((client: Mond, interaction: BaseInteraction) => {
                if (!interaction.isCommand()) return;
                const command = this.commands.get(interaction.commandName);
                if (!command || !command.isValid() || !command.handler) return;
                command.handler(client, interaction);
            });

        this.register(interactionEvent);

        this.events.forEach((event) => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            this.client.on(event.event as string, event.handler?.bind(null, this) || (() => {}));
        });
    }

    public deploy(): Promise<boolean> {
        const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
        this.commands.forEach((command) => {
            commands.push(command.toJSON());
        });
        const cachePath = path.join(process.cwd(), ".mondcache");
        let cache = "";
        if (fs.existsSync(cachePath)) {
            cache = fs.readFileSync(cachePath, "utf8");
        }
        if (cache === JSON.stringify(commands)) {
            this.logger.info("Commands are up to date, skipping deployment");
            return Promise.resolve(true);
        } else {
            this.logger.info("Commands are outdated, deploying...");
            return this.rest
                .put(Routes.applicationCommands(process.env.MOND_CLIENT_ID || ""), { body: commands })
                .then(() => {
                    fs.writeFileSync(cachePath, JSON.stringify(commands));
                    this.logger.info("Commands deployed");
                    return Promise.resolve(true);
                })
                .catch(() => {
                    this.logger.error("Failed to deploy commands");
                    return Promise.resolve(false);
                });
        }
    }

    public register(builder: MondCommand | MondEvent): void {
        if (builder instanceof MondCommand) {
            if (!builder.isValid()) {
                this.error("incompleteCommand");
                return;
            }
            this.commands.set(builder.name, builder);
            this.logger.info(`Registered command ${builder.name}`);
        } else if (builder instanceof MondEvent) {
            if (!builder.isValid()) {
                this.error("incompleteEvent");
                return;
            }
            this.events.set(builder.name, builder);
            this.logger.info(`Registered event ${builder.name}`);
        } else {
            throw new Error("Unhandled builder type provided to register()");
        }
    }

    public registerMultiple(...builders: (MondCommand | MondEvent)[]) {
        builders.forEach((builder) => this.register(builder));
    }

    public discordjs(): DiscordClient {
        return this.client;
    }

    private loadConfig() {
        const configPath = path.join(process.cwd(), "mond.config.json");
        if (!fs.existsSync(configPath)) return;
        this.configLoaded = true;

        const config = fs.readFileSync(configPath, "utf8");

        try {
            Mond.config = JSON.parse(config);
            this.configValid = true;
        } catch (e) {
            this.configValid = false;
        }
    }

    private error(errorCode: string) {
        const error: ErrorData | undefined = errors.find((e) => e.code === errorCode);
        if (!error) return;
        this.logger[error.type](`(${error.code}) ${error.message} - Read more: ${errorLink(error)}`);
    }
}
