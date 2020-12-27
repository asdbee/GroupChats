const Eris = require('eris');
const fs = require('fs')
const config = require('./config.js')
const db = require('./database/connectDB.js')
const gc = require('./gc.js').get

const bot = new Eris(config.token);
const prefix = config.prefix
bot.commands = new Eris.Collection();

const gcCache = [
  {mainChat: '', category: '', ownerID: ''}
]
module.exports = {gcCache: gcCache}

bot.on('ready', () => {
    console.log('Bot updated successfully')
    gc.allGCInfo().then((data) => {
      data.forEach((g) => gcCache.push({mainChat: g.chatID, category: g.categoryID, ownerID: g.ownerID}))
    })

    const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
	    const command = require(__dirname + `/commands/${file}`)
        bot.commands.set(command.name, command)
    }
})

bot.on('messageCreate', (msg) => {
    if (msg.author.bot) return;
    const args = msg.content.slice(prefix.length).trim().split(' ')
    if (!msg.content.startsWith(prefix)) return;
    const cmd = args[0]
    if (!bot.commands.has(cmd)) return

    try {
      bot.commands.get(cmd).execute(bot,msg,args)
    }
    catch (error) {
      console.error(error)
      bot.createMessage(msg.channel.id,'Unable to execute command.')
    }

    if (msg.content.toLowerCase().startsWith(prefix+'add')){
        if (msg.channel.parentID === config.ignoredCatagory) return;
        const user = (args[1].replace(/[\\<>@#&!]/g, ""))
        const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID)
        Promise.all(brotherChannels.map((c) => c.editPermission(user,'117760','0','member','Added')))
          .then(() => {
            bot.createMessage(msg.channel.id,msg.author.username+' added <@'+user+'>')
          })
    }

    if (msg.content.toLowerCase().startsWith(prefix+'remove')){
        if (msg.channel.parentID === config.ignoredCatagory) return;
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