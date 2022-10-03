import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Mond from "../Mond";

export default class MondCommand extends SlashCommandBuilder {
    public handler: ((client: Mond, interaction: CommandInteraction) => void) | undefined = undefined;

    constructor() {
        super();
    }

    public setHandler(handler: (client: Mond, interaction: CommandInteraction) => void): MondCommand {
        this.handler = handler;
        return this;
    }

    public isValid() {
        return this.handler && this.name && this.description && this.toJSON();
    }
}
