const config=require("../config.js")
const parse_commands = require("../parse_commands.js")
const embeds = require("../embeds.js")

module.exports = (client, msg) => { // Function for when a message is sent. "message" = the message object of said new message.
   //bot should not interact with other bots
    if (msg.author.bot) return
    //bot only responds to messages beggining with prefix
    if (!msg.content.startsWith(config.prefix)) return
    const trimmed = msg.content.substr(config.prefix.length)//remove prefix from command
    const command_parsed = parse_commands(trimmed,client)
    console.log(command_parsed)
    if(!command_parsed.success){
        msg.reply(embeds.simple_embed(command_parsed.title,  false,command_parsed.error_message))
    }else{
        msg.reply(command_parsed.command.run(command_parsed, msg, client))
    }
}