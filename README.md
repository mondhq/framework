> **⚠️ This project is still in development and is not ready for production use.**

<div align="center">

![Mond](https://raw.githubusercontent.com/mondhq/framework/main/.github/assets/banner.png)

<br />

![Lines of code](https://img.shields.io/tokei/lines/github/mondhq/framework)
![npm Downloads](https://img.shields.io/npm/dy/@mondhq/framework)
![GitHub issues](https://img.shields.io/github/issues/mondhq/framework)
![GitHub pull requests](https://img.shields.io/github/issues-pr/mondhq/framework)
![GitHub](https://img.shields.io/github/license/mondhq/framework)
![GitHub Repo stars](https://img.shields.io/github/stars/mondhq/framework)
![npm Version](https://img.shields.io/npm/v/@mondhq/framework)
![GitHub contributors](https://img.shields.io/github/contributors/mondhq/framework)

</div>

🌙 Mond Framework for modern Discord Bot Development

## About

Mond is a modern Discord Bot Framework and acts as a wrapper around discord.js. It is designed to be easy to use and to make the development of Discord Bots easier.

## Tech Stack

-   [TypeScript](https://www.typescriptlang.org/)
-   [Jest](https://jestjs.io/)
-   [ESLint](https://eslint.org/)
-   [Prettier](https://prettier.io/)

## Example Usage

```ts
import { Mond, MondEvent, MondCommand, MondEvents } from "@mondhq/framework";
import { config as dotenv } from "dotenv";
import { CommandInteraction } from "discord.js";
dotenv();

const mond = new Mond();

const readyEvent = new MondEvent()
    .setName("myReadyEvent")
    .setEvent(MondEvents.Ready)
    .setHandler((mond: Mond) => {
        mond.logger.info("Bot is Ready!");
        mond.discordjs().user?.setActivity("with Mond 🌙");
    });

const pingCommand = new MondCommand()
    .setName("ping")
    .setDescription("Pong!")
    .setHandler((_mond: Mond, interaction: CommandInteraction) => {
        interaction.reply("Pong!");
    });

mond.registerMultiple(readyEvent, pingCommand);

mond.deploy().then(() => {
    mond.start();
});
```

## Roadmap

-   [x] Commands
-   [x] Events
-   [x] Embeds
-   [ ] Other Interactions
    -   [ ] Buttons
    -   [ ] Select Menus
    -   [ ] Dropdown Actions
    -   [ ] Modals
-   [ ] Automatic loading elements from folders
-   [ ] Color Management
-   [ ] Better Formats (Footers, Titles, Messages, etc.)
-   [ ] Message Commands
-   [ ] Tests

## How to report issues/questions

-   For general issues/questions, [open an issue](https://github.com/mondhq/framework/issues)
-   For security issues, please email [security@blazing.works](mailto:security@blazing.works)
-   For important questions, please email [opensource@blazing.works](mailto:opensource@blazing.works)

## License

As this is an open-source project, support is limited. Please use [GitHub Issues](https://github.com/mondhq/framework/issues) for community support or contact [opensource@blazing.works](mailto:opensource@blazing.works) for very important matters.

**ℹ️ All code in this repository is licensed under the [MIT License](LICENSE.md).**
