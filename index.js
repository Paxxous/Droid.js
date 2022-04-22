// Discord.js classes
const { Client, Intents } = require('discord.js');
const { TOKEN, name } = require('./config.json');
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');



// Create a client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// On ready
client.on('ready', () => {
  console.log(`${name} is ready :D`);
});



// Commands rn
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand) return;

  const { commandName } = interaction;

  switch(commandName) {
    case "ping":
      await interaction.reply('check your dms ;)');
      await interaction.user.send('pong >:(');
      break;

    case "shill":
      // Read the json file
      let shill = JSON.parse(fs.readFileSync('./commands/shill/shillcount.json'));
      shill = JSON.stringify(shill, null, 2);

      // Before
      console.log(shill);

      shill.shillcount += 1;

      fs.writeFileSync('./commands/shill/shillcount.json', shill);

      // After
      console.log(shill);

      // Create embed and send it      
      const shillEmbed = new MessageEmbed()
      .setColor('#e6d953')
      .setTitle('paxxous ;D')
      .setURL('https://paxxous.com')
      .setDescription('Praise paxx :D')
      .addFields(
        {name: 'Personal website:', value: 'https://paxxous.com'},
        
        {name: 'Patreon:', value: 'https://www.patreon.com/Paxxous'},
        {name: 'Github:', value: 'https://github.com/Paxxous'},
        {name: 'Youtube:', value: 'https://www.youtube.com/channel/UCFVw6QqeUbshvw2vmIv94mg'},
        {name: 'Itch:', value: 'https://itch.io/profile/paxxous'}
      )
      .setImage('https://i.imgur.com/HruUrwM.png')
      .setThumbnail('https://i.imgur.com/HruUrwM.png')
      // .setFooter('')
      .setTimestamp();

      await interaction.reply({ embeds: [shillEmbed] });
      break;
  }
});

// login to the bot
client.login(TOKEN);