import { ColorResolvable } from "discord.js";

export default interface MondEmbedConfig {
    titleFormat?: string;
    footerFormat?: string;
    colors?: {
        [key: string]: ColorResolvable;
    };
}
