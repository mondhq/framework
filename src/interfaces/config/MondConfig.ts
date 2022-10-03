import MondEmbedOptions from "./MondEmbedOptions";
import MondLoggerConfig from "./MondLoggerConfig";

export default interface MondConfig {
    logger?: MondLoggerConfig;
    embeds?: MondEmbedOptions;
}
