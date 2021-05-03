const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');
const { token, prefix } = require('./config.json');
const config = require('./config.json');

client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on("ready", () => {
    console.log(`${client.user} is online`);
    client.user.setActivity(config.status);
});

client.on('message', message => {
    
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'clear'){

        client.commands.get('clear').execute(message, args);
    }
})

client.login(token);