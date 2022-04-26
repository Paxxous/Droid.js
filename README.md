# Droid.js

The javascript version of my discord bot, this time written in [Discord.js](https://discord.js.org/#/).

## Setup Droid

In order to setup droid to host on your own pc, you must have node.js installed. Fist, clone the repository via the git.

```sh
git clone https://github.com/Paxxous/Droid.js.git
```

Once the source has been cloned to your pc, install the required packages.

```sh
npm install
```

Once the packages have been installed, create a file called config.json, which requires the following:

```json
{
  "TOKEN": "YOUR BOT TOKEN",
  
  "clientId": "YOUR BOTS CLIENT ID (found in the discord developer portal)",
  "guildId": "YOUR SERVER ID",
  "name": "Droid"
}
```

Finally, run your bot.

```sh
node .
```

Feel free to tweak the source as much as you like ;D.
