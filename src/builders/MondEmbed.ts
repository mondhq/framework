import { EmbedBuilder as DiscordEmbedBuilder } from "discord.js";
import Mond from "../Mond";

export default class EmbedBuilder {
    private embed: DiscordEmbedBuilder;

    constructor() {
        this.embed = new DiscordEmbedBuilder();
    }

    public setTitle(title: string, useFormat = true) {
        const titleFormat = Mond.config?.embeds?.titleFormat;
        this.embed.setTitle(useFormat && titleFormat ? titleFormat.replace("%s", title) : title);
        return this;
    }

    public setDescription(description: string) {
        this.embed.setDescription(description);
        return this;
    }

    /*

    public setFooter(footer: string) {
        this.embed.setFooter(footer);
        return this;
    }

    public setTimestamp(timestamp: Date) {
        this.embed.setTimestamp(timestamp);
        return this;
    }

    public setAuthor(author: string) {
        this.embed.setAuthor(author);
        return this;
    }

    public setColor(color: string) {
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

    public setFields(fields: EmbedField[]) {
        this.embed.fields = fields;
        return this;
    }

    public addField(field: EmbedField) {
        this.embed.addField(field);
        return this;
    }

    */

    public build() {
        return this.embed;
    }
}
