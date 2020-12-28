const gc = require('../gc.js').get
const config = require('../config.js')
function getGC(id){
    return gc.gcCache.find((g) => g.mainChat === id)
}
module.exports = {
    name: 'name',
    usage: '{prefix}name',
    execute(bot,msg,args){
        if (getGC(msg.channel.id) === undefined) return bot.createMessage(msg.channel.id,'`X` There is no GroupChat in this channel.')
        const getName = msg.content.slice(config.prefix.length+args[0].length).trim()
        msg.channel.guild.channels.get(getGC(msg.channel.id).category).edit({name: getName}).then(
            bot.createMessage(msg.channel.id,'`✓` Renamed to '+getName)
        )
    }
}