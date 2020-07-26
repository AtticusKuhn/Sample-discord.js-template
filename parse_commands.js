const config = require("./config.js");

function parse_commands(msg, client){
    let command = msg.split(" ")[0];
    //get command from data
    let found_command = client.commands.get(command)|| client.commands.find(c => c.alias ? c.alias.has(command) : false )
    if(!found_command){
        return{
            success:false,
            title:"command error",
            error_message:`not a valid command. To see a list of possible commands, type ${config.prefix}help`
        }
    }
    //check the number of arguments supplied
    const command_args= msg.match(/(```(.|\n)*?```|\S+)/g).slice(1)// this regex splits on spaces but does not distrub code blocks
        if(found_command.args && command_args.length != found_command.args){
        return{
            success:false,
            error_message:`incorrect number of arguments. I exprected ${found_command.args}, but got ${command_args.length}`,
            title:"args error"
        }
    }
    if(found_command.min_args && command_args.length < found_command.min_args){
        return{
            success:false,
            title:"args error",
            error_message:`incorrect number of arguments. I exprected at least ${found_command.min_args}, but got ${command_args.length}`
        }
    }
    if(found_command.max_args && command_args.length < found_command.max_args){
        return{
            success:false,
            title:"args error",
            error_message:`incorrect number of arguments. I exprected at most ${found_command.max_args}, but got ${command_args.length}`
        }
    }
    //check for form
    if(found_command.form){
        const form = {}
        for(const [index, argument] of found_command.form.match(/(\[.*?\]|\<.*?\>|\S+)/g).entries()){
            let name = argument.split(":")[0].substring(1)
            name = name.replace(/]/g,"")
            name = name.replace(/>/g,"")
            if(argument.startsWith("[") && index >=  command_args.length){
                return{
                    success:false,
                    title:"missing error",
                    error_message:`Missing Argument: ${name}`
                }
            }
            if(argument.startsWith("<") && index >=  command_args.length){
                break
            }
            if(argument.indexOf(":")>-1){
                const datatype = argument.split(":")[1].slice(0,-1)
                switch(datatype) {
                    case "number":
                        if(isNaN(command_args[index])){
                            return{
                                success:false,
                                title:"type error",
                                error_message:`The argument ${name} expected a number, but got ${command_args[index]}`
                            }
                        }
                        break
                    case "int":
                        if(Number(command_args[index]) %1 != 0){
                            return{
                                success:false,
                                title:"type error",
                                error_message:`The argument ${name} expected a integer, but got ${command_args[index]}`
                            }
                        }
                        break;
                    case "ping":
                        if(!/^<@\!?\d{18}>$/.test(command_args[index])){
                            return{
                                success:false,
                                title:"type error",
                                error_message:`The argument ${name} expected a ping, but got ${command_args[index]}`
                            }
                        }
                        break
                    case "block":
                        if( !(command_args[index].startsWith("```") && command_args[index].endsWith("```"))  ){
                            return{
                                success:false,
                                title:"type error",
                                error_message:`The argument ${name} expected a code block, but got ${command_args[index]}`
                            }
                        }
                        break
                }
                if(datatype.includes("|")){
                    const options = datatype.split("|")
                    if(!options.includes(command_args[index])){
                        return{
                            success:false,
                            title:"type error",
                            error_message: `The arguement ${name} expects one of the options ${options}, but it got ${command_args[index]}`
                        }
                    }
                }
            }
            form[name] = command_args[index]
        }
        return{
            success:true,
            form:form,
            command:found_command,
            args:command_args
        }
    }
    return{
        success:true,
        command:found_command,
        args:command_args
    }
}


module.exports = parse_commands