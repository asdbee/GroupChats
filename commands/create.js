const gc = require('../gc.js').get
module.exports = {
    name: 'gc',
    usage: '{prefix}gc [name]',
    execute(bot,msg,args){
        gc.createGC('d','d','d','d')
        if (args[1] === undefined){
            const getName = msg.author.username
            bot.createChannel(msg.guildID,getName,4).then(async (cid) => {
            let chat = await bot.createChannel(msg.guildID,'chat',0)
            let vc = await bot.createChannel(msg.guildID,'Voice',2)
              await chat.edit({ parentID: cid.id}),
              await vc.edit({ parentID: cid.id}),
              await cid.editPermission(msg.author.id,'117760','0','member','GC Owner'),
              await cid.editPermission(msg.guildID,'0','117760','role','GC')
          })
        }
          else if (args[1] !== undefined){
          const getName = msg.content.slice(prefix.length+args[0].length).trim()
          bot.createChannel(msg.guildID,getName,4).then(async (cid) => {
          let chat = await bot.createChannel(msg.guildID,'chat',0)
          let vc = await bot.createChannel(msg.guildID,'Voice',2)
            await chat.edit({ parentID: cid.id, topic: msg.author.id}),
            await vc.edit({ parentID: cid.id, topic: msg.author.id}),
            await cid.editPermission(msg.author.id,'117760','0','member','GC Owner'),
            await cid.editPermission(msg.guildID,'0','117760','role','GC')
        })
    }
    }
}