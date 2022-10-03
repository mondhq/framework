import { ColorResolvable } from "discord.js";

export default interface MondEmbedConfig {
    titleFormat?: string;
    colors?: {
        [key: string]: ColorResolvable;
    };
}
