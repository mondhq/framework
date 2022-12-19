import { EmbedBuilder as DiscordEmbedBuilder, User, ColorResolvable, EmbedField } from "discord.js";
import { multiReplace } from "@blazingworks/utils/text";
import Mond from "../Mond";

export default class MondEmbed {
    private embed: DiscordEmbedBuilder;
    private footerString: string | undefined;
    private footerIcon: string | undefined;
    private authorString: string | undefined;
    private authorIcon: string | undefined;
    private client: Mond | undefined;

    constructor(client?: Mond) {
        this.embed = new DiscordEmbedBuilder();
        if (client) this.client = client;
    }

    public setTitle(title: string, useFormat = true) {
        const titleFormat = (this.client?.instanceConfig || Mond.config).embeds?.titleFormat || "{title}";
        if (useFormat) {
            this.embed.setTitle(multiReplace(titleFormat, [["{title}", title]]));
        } else {
            this.embed.setTitle(title);
        }
        return this;
    }

    public setDescription(description: string) {
        this.embed.setDescription(description);
        return this;
    }

    public setFooter(footer: string, useFormat = true, additionalData?: { user?: User }) {
        const footerFormat = (this.client?.instanceConfig || Mond.config).embeds?.footerFormat || "{footer}";
        if (useFormat) {
            this.footerString = multiReplace(footerFormat, [
                ["{footer}", footer],
                ["{user.tag}", additionalData?.user?.tag || "Clyde#0000"],
                ["{user.id}", additionalData?.user?.id || "000000000000000000"],
                ["{user.name}", additionalData?.user?.username || "Clyde"],
                ["{user.discriminator}", additionalData?.user?.discriminator || "0000"],
            ]);
        } else {
            this.footerString = footer;
        }
        return this;
    }

    public setFooterIcon(icon: string) {
        this.footerIcon = icon;
        return this;
    }

    public setTimestamp(timestamp: Date) {
        this.embed.setTimestamp(timestamp);
        return this;
    }

    public setAuthor(author: string) {
        this.authorString = author;
        return this;
    }

    public setAuthorIcon(icon: string) {
        this.authorIcon = icon;
        return this;
    }

    public setColor(color: ColorResolvable) {
        this.embed.setColor(color);
        return this;
    }

    public setThumbnail(thumbnail: string) {
        this.embed.setThumbnail(thumbnail);
        return this;
    }

    public setURL(url: string) {
        this.embed.setURL(url);
        return this;
    }

    /**
     * @deprecated
     */
    public addField(field: EmbedField) {
        this.embed.addFields(field);
        return this;
    }

    public addFields(...fields: EmbedField[]) {
        this.embed.addFields(...fields);
        return this;
    }

    public build() {
        if (this.footerString) {
            this.embed.setFooter({
                text: this.footerString,
                iconURL: this.footerIcon,
            });
        }
        if (this.authorString) {
            this.embed.setAuthor({
                name: this.authorString,
                iconURL: this.authorIcon,
            });
        }
        return this.embed;
    }
}
