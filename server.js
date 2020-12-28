const Eris = require('eris');
const fs = require('fs')
const config = require('./config.js')
const db = require('./database/connectDB.js')
const gc = require('./gc.js').get

const bot = new Eris(config.token);
const prefix = config.prefix
bot.commands = new Eris.Collection();

const gcCache = gc.gcCache

module.exports = {}

bot.on('ready', () => {
    console.log('Bot updated successfully')
    gc.allGCInfo().then((data) => {
      data.forEach((g) => gcCache.push({mainChat: g.chatID, category: g.categoryID, ownerID: g.ownerID}))
    })
    bot.editStatus('online', { name: 'group chats', type: 3})
    const commandFiles = fs.readdirSync(__dirname + '/commands').filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
	    const command = require(__dirname + `/commands/${file}`)
        bot.commands.set(command.name, command)
    }
})

bot.on('channelDelete', (channel) => {
  const db = require('./database/template.js')
  if (channel.type === 4){
  db.findOne({categoryID: channel.id}).then((data) => {
    if (data === null) return
    data.delete()
  })
  }

  if (channel.type === 2){
    db.findOne({categoryID: channel.parentID}).then((data) => {
      if (data === null) return
      data.delete()
    })
  }

  if (channel.type === 0){
    db.findOne({chatID: channel.id}).then((data) => {
      if (data === null) return
      data.delete()
    })
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
})

bot.connect();