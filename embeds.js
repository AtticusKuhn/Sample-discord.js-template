const Discord = require('discord.js');
const config = require("./config.js")
function simple_embed(title, success=true, message){
// inside a command, event listener, etc.
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor(success ? config.success_color : config.failure_color)
	.setTitle(title)
	.setURL('https://repl.it/@AtticusKuhn/Sample-discordjs-template')
	.setDescription(message)
	.setThumbnail('https://storage.googleapis.com/replit/images/1578865152393_256089a828f3a4aad28080aba5e80078.jpeg')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://storage.googleapis.com/replit/images/1578865152393_256089a828f3a4aad28080aba5e80078.jpeg');
    return exampleEmbed
}
function json_embed(json){
    let fields = []
    for(key of Object.keys(json)){
        fields.push({
            name:key,
            value:json[key]
        })
    }
    const json_embed = {
        color: config.info_color,
        title: 'Sample Bot',
        url: 'https://repl.it/@AtticusKuhn/Sample-discordjs-template',
        thumbnail: {
            url: 'https://storage.googleapis.com/replit/images/1578865152393_256089a828f3a4aad28080aba5e80078.jpeg',
        },
        fields: fields,
        timestamp: new Date(),
        footer: {
            text: 'Made by Euler',
            icon_url: 'https://storage.googleapis.com/replit/images/1578865152393_256089a828f3a4aad28080aba5e80078.jpeg',
        },
    };
    return { embed: json_embed }
}
module.exports = {
    simple_embed,
    json_embed
}