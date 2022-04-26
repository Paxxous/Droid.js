const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, TOKEN } = require('../config.json');

// Js array of commands
const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with the utf-8 rendered text that is decoded in the human mind as "pong"'),
  new SlashCommandBuilder().setName('shill').setDescription('Praise the all mighty godlike creator of droid, who birthed him out of pity.'),
  new SlashCommandBuilder().setName('rockpaperscissors').setDescription('Play rock paper scissors with your favorite bot (me).'),
  new SlashCommandBuilder().setName('remember').setDescription('Keep your darkest secrets and notes in a database, (aka a json file {/remind to receive your note.})'),
  new SlashCommandBuilder().setName('remind').setDescription('Remind you with the note that you requested me to save :D, if you didn\'t save a note, use /remember.'),
]/* Note: the reson the array is being mapped to json is because the discord api uses json instead of a js array */.map(command => command.toJSON());

const rest = new REST({ version: '9'}).setToken(TOKEN);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log('Successfully initialized commands.'))
  .catch(console.error);