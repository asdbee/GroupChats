const Eris = require('eris');
const env = require('dotenv').config({path: __dirname + '/.env'})

const bot = new Eris(process.env.token);
const prefix = process.env.prefix

bot.on('ready',(bot) => {
    console.log('Ready')
})

bot.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(' ')

    if (msg.content.toLowerCase().startsWith(prefix+'gc')){
        if (args[1] === undefined){
            const getName = msg.author.username
          let cid = bot.createChannel(msg.guildID,getName,4).then(async (cid) => {
          let chat = await bot.createChannel(msg.guildID,'chat',0)
          let vc = await bot.createChannel(msg.guildID,'Voice',2)
            await chat.edit({ parentID: cid.id, topic: msg.author.id}),
            await vc.edit({ parentID: cid.id, topic: msg.author.id}),
            await cid.editPermission(msg.author.id,'117760','0','member','GC Owner'),
            await cid.editPermission(msg.guildID,'0','117760','role','GC')
            await bot.createMessage('744941930475028571','GC Created: '+getName+' Channel ID: '+chat.id)
        })
      }
        else if (args[1] !== undefined){
        const getName = msg.content.slice(prefix.length+args[0].length).trim()
        let cid = bot.createChannel(msg.guildID,getName,4).then(async (cid) => {
        let chat = await bot.createChannel(msg.guildID,'chat',0)
        let vc = await bot.createChannel(msg.guildID,'Voice',2)
          await chat.edit({ parentID: cid.id, topic: msg.author.id}),
          await vc.edit({ parentID: cid.id, topic: msg.author.id}),
          await cid.editPermission(msg.author.id,'117760','0','member','GC Owner'),
          await cid.editPermission(msg.guildID,'0','117760','role','GC')
          await bot.createMessage('744941930475028571','GC Created: '+getName+' Channel ID: '+chat.id)
    })
  }
}

    if (msg.content.toLowerCase().startsWith(prefix+'delete')){
        if (msg.channel.parentID === env.ignore) return;
        if (msg.channel.topic === msg.author.id){
            const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID)
            Promise.all(brotherChannels.map((c) => c.delete()))
              .then(() => {
                bot.getChannel(msg.channel.parentID).delete()
                bot.createMessage('744941930475028571',msg.author.username+' deleted '+bot.getChannel(msg.channel.parentID).name)
            }).catch((err) => {
                bot.createMessage('744941930475028571','Error Deleting GC: '+err)
      })
        }
    }

    if (msg.content.toLowerCase().startsWith(prefix+'add')){
        if (msg.channel.parentID === env.ignore) return;
        const user = (args[1].replace(/[\\<>@#&!]/g, ""))
        const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID)
        Promise.all(brotherChannels.map((c) => c.editPermission(user,'117760','0','member','Added')))
          .then(() => {
            bot.createMessage(msg.channel.id,msg.author.username+' added <@'+user+'>')
          })
    }

    if (msg.content.toLowerCase().startsWith(prefix+'remove')){
        if (msg.channel.parentID === env.ignore) return;
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
})

bot.connect();