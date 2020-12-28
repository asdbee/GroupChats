const gc = require('../gc.js').get
const config = require('../config.js')
function getGC(id){
    return gc.gcCache.find((g) => g.mainChat === id)
}
module.exports = {
    name: 'remove',
    usage: '{prefix}remove',
    execute(bot,msg,args){
    if (msg.channel.parentID === config.ignoredCatagory) return;
    if (getGC(msg.channel.id) === undefined) return bot.createMessage(msg.channel.id,'`X` There is no GroupChat in this channel.')
    if (getGC(msg.channel.id).ownerID !== msg.author.id) return bot.createMessage(msg.channel.id, '`!` You are not the owner of this GC!')
    const user = (args[1].replace(/[\\<>@#&!]/g, ""))
    if (msg.channel.guild.members.get(user).voiceState.channelID !== null){
    msg.channel.guild.members.get(user).edit({channelID: null})
    }
    const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID)
    Promise.all(brotherChannels.map((c) => c.editPermission(user,'0','117760','member','Added')))
    .then(() => {
    bot.createMessage(msg.channel.id,msg.author.username+' removed <@'+user+'>')
    })
    }
}