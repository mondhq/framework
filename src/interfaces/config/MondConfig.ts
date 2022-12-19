import MondEmbedOptions from "./MondEmbedOptions";
import MondLoggerConfig from "./MondLoggerConfig";

export default interface MondConfig {
    tokenKey?: string;
    clientIdKey?: string;
    logger?: MondLoggerConfig;
    embeds?: MondEmbedOptions;
}
