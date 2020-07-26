const embeds = require("../embeds.js")
const util = require('util');

module.exports = {
    description:"gives info on a specific command",
    alias: new Set(["information","data"]),
    form: "[command]",
    run:(command_parsed, msg, client)=>{
        const found_command = client.commands.get(command_parsed.form.command)
        if(!found_command){
            return embeds.simple_embed("Invalid Command",false,"I can't find that command. Try typing help to see all commands")
        }
        const temp = found_command
        delete temp.run
        if(temp.alias){
            temp.alias = util.inspect([...temp.alias]);
        }
        return embeds.json_embed(temp)
    }
}