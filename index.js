// Discord.js classes
const { Client, Intents } = require('discord.js');
const { TOKEN, name } = require('./config.json');
const { MessageEmbed, Message } = require('discord.js');
const fs = require('fs');



// Create a client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
	partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

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

      // Update the shill count
      shill.shillcount += 1;

      // Write the new shillcount to the json file
      fs.writeFile('commands/shill/shillcount.json', JSON.stringify(shill, null, 2), function(err) {});

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
      .setTimestamp()
      .setFooter({
        text: `Total amount of requested shills: ${shill.shillcount}`
      });

      await interaction.reply({ embeds: [shillEmbed] });
      break;

    case "rockpaperscissors":
      // Send interaction and react to it
      var emojiis = ['🪨', '🧻', '✂️'];
      var choice = emojiis[Math.floor(Math.random() * emojiis.length)];
      console.log(choice);
      
      rps = await interaction.reply({ content: 'Rock paper or scissors?', fetchReply: true });
      rps.react('🪨');
      rps.react('🧻');
      rps.react('✂️');

      // So no other user ruins the game, and that other emojis aren't added
      const filter = (react, usr) => {
        return ['🪨', '🧻', '✂️'].includes(react.emoji.name) && usr.id === interaction.user.id;
      };

      // Get the choice of the bot

      // Wait for the users reply
      rps.awaitReactions({ filter, max: 1, time: 6000, errors: ['time'] })
        .then(collected => {
          const react = collected.first();

          // Rock paper scissors logic
          if (choice === react.emoji.name) {
            interaction.followUp('It\'s a tie :0');
          }

          // Rock
          else if (react.emoji.name === '🪨') {
            if (choice === '🧻') {
              interaction.followUp('Get pwned lmaoooo, (paper beats rocks)');
            }

            else {
              interaction.followUp('You\'re mad. You\'re mad. Just because I picked scissors doesn\'t mean you\'re good. Cope. Cope.');
            }
          }

          // Paper
          else if (react.emoji.name === '🧻') {
            if (choice === '🪨') {
              interaction.followUp('LOLOLOL, scissors cut paper if you didn\'t know that before ;)');
            }
            else {
              interaction.followUp('I didn\'t mean rock I swear...');
            }
          }

          // Scissors
          else if (react.emoji.name === '✂️') {
            if (choice === '🪨') {
              interaction.followUp('Always remember. I can beat scissors with rocks lmao');
            }
            else {
              interaction.followUp('I make my decisions at random. So it\'s not my fault I picked paper.');
            }
          }
        })
        .catch(collected => {
          interaction.followUp('Time ran out bozo ;)');
        });

      break;

    case "remember":
      interaction.reply('Please reply with the content you want me to remember.').then(() =>{
        const filter = m => interaction.user.id === m.author.id;

        interaction.channel.awaitMessages({ filter, time: 10000, max: 1, errors: ['time'] })
          .then(messages => {
            // Get and save the user input
            const note = messages.first().content;
            let remember = JSON.parse(fs.readFileSync('./commands/remember/remember.json'));
            remember[interaction.user.id] = note;
            fs.writeFile('./commands/remember/remember.json', JSON.stringify(remember, null, 2), function(err) {});

            // Notify the user when the note is saved
            interaction.followUp('Note has been saved :D');
          })
          .catch(() => {
            interaction.followUp('You didn\'t say anything');
          });
      });
      break;

    case "remind":
      await interaction.reply('Fetching note...').then(() => {
        // Get the note
        const remember = JSON.parse(fs.readFileSync('./commands/remember/remember.json'));
        // console.log(interaction.user.id);

        // Index the note via user id
        const userNote = remember[interaction.user.id];

        // Send over the note
        interaction.followUp(userNote);
      })
      .catch(() => {
        interaction.followUp('Failed to collect note');
      });
      break;
  }
});

// login to the bot
client.login(TOKEN);