const embeds = require("../embeds.js")
module.exports = {
    description:"this shows all availiable commands",
    form: "<anything>",
    run:(command_parsed, msg, client)=>{
        const commands_json = {}
        for(const[command, value] of client.commands){
            commands_json[command] = value.description
        }
        return embeds.json_embed(commands_json)
    }
}