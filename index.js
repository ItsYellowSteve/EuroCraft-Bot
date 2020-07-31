const botConfig = require("./botconfig.json")

const discord = require('discord.js');

const client = new discord.Client();

const fs = require('fs');

const { Console } = require("console");

fs.readdir("./commands/" , (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <= 0) {
        console.log("No files found");
        return;
    }

    jsFiles.forEach((f,i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`The file ${f} is loaded`);

    })

});

client.commands = new discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log(`${client.user.username} is online!`);
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const arguments = messageArray(1);

    const command = messageArray[0];

    var prefix = botConfig.prefix;
    
    var messageArray = message.content.split(" ");

    if(command === `${prefix}ping`){
        client.commands.get('ping').execute(message, args);
    } else if(command === `${prefix}info`){
        client.commands.get('info').execute(message, args);
    }
})

client.login(process.env.token);
