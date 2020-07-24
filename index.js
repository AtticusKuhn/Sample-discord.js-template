//import modules
const Discord = require('discord.js');
const client = new Discord.Client();
const fs=  require("fs")
//import files
const parse_commands = require("./parse_commands.js")
const config=require("./config.js")
//check for discord bot token
if(!process.env.token){
    console.log("no bot token found")
    process.exit(1)
}
//set up commands
client.commands = new Discord.Collection(); 
for(const file of fs.readdirSync('./commands/')) { // Iterates through every file in the ./commands/ folder.
    // This is to prevent any files that aren't .js files from being processed as a command.
    if(!file.endsWith(".js")){ 
        continue
    }
    var fileName = file.substring(0, file.length - 3); // Removes last three characters from file name to get rid of the .js extension (which should™ be .js ^^) for propper file name.
    var fileContenjs = require(`./commands/${file}`); // Defines fileContenjs of the export of the command in question.
    client.commands.set(fileName, fileContenjs); // Adds the command name to the client.commands collection with a value of it's respective exporjs.
}
//set up for each event
for(const file of fs.readdirSync('./events/')) { // Iterates through every file in the ./evenjs/ folder.
    if(!file.endsWith(".js")){ 
        continue
    }
    var fileName = file.substring(0, file.length - 3); // Removes last three characters from file name to get rid of the .js extension (which should™ be .js ^^) for propper file name.
    var fileContenjs = require(`./events/${file}`); // Defines fileContenjs of the export of the event in question.
    client.on(fileName, fileContenjs.bind(null, client)); // Set's the event of whatever the file name is to the bound function of said export (this will automatically make the first parmater of the export function to client.
}
//log in with bot
client.login(process.env.token)
undefined//get rid of implicit printing
