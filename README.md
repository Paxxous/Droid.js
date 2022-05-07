# Droid.js

The javascript version of my discord bot, this time written in [Discord.js](https://discord.js.org/).

## Setup Droid

In order to setup droid to host on your own machine, you must have [Node.js](https://nodejs.org/) installed. Fist, clone the repository via git.

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

## Commands

* **/ping**
  * Dm the user the word "pong"

* **/shill**
  * Shills stuff like my website or my github to the user who requests it. Had fun making this because I got to play around with the embed system that node.js has.

* **/rockpaperscissors**
  * Plays rock, paper, scissors, with the user who runs the command. This incorporates reactions to give the user a choice against droid. Droid just picks the reaction randomly.

* **/remember**
  * Saves the user's input to an advanced database called a json file. I had fun making this because I got to learn how I could interact with a json file using node. I may swap over to an actual database though, since a json file isn't really the best place to put this info, if it were encrypted it would be much safer.

* **/remind**
  * Get the text that you saved to the remember.json file. droid responds based on your user id, so if you're requesting your note through another account, you're not going to get the correct note.

* **/cat**
  * Use the aws random cat REST api to get random cat pictures. Currently not working, sometimes an image is recieved, and sometimes you get an error.
  