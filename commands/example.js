module.exports = {
    description:"this command is a test",
    alias:new Set(["e","ex"]),
    form: "[number:int] [choice:a|b|c] [code_block:block] <optional>",
    run:(command_parsed, msg, client)=>{
        return `cool. The input I received from this command was \n ${JSON.stringify(command_parsed.form,null,4)}`
    }
}