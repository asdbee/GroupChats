const gc = require('../gc.js').get

function getGC(id){
    return require('../server.js').gcCache.find((g) => g.mainChat === id)
}
module.exports = {
    name: 'delete',
    usage: '{prefix}delete',
    execute(bot,msg,args){
    if (msg.channel.parentID === config.ignoredCatagory) return;
    if (msg.channel.topic === msg.author.id){
    const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID)
    Promise.all(brotherChannels.map((c) => c.delete()))
      .then(() => {
        bot.getChannel(msg.channel.parentID).delete()
    }).catch((err) => {
})
}
}
}