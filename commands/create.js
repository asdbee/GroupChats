const gc = require('../gc.js').get;
const config = require('../config.js');
module.exports = {
  name: 'gc',
  usage: '{prefix}gc [name]',
  execute(bot, msg, args) {
    if (args[1] === undefined) {
      const getName = `${msg.author.username}#${msg.author.discriminator}`;
      bot.createChannel(msg.guildID, getName, 4).then(async (cat) => {
        let chat = await bot.createChannel(msg.guildID, 'chat', 0);
        let vc = await bot.createChannel(msg.guildID, 'Voice', 2);
        await gc.createGC(cat.id, chat.id, msg.author.id);
        await gc.gcCache.push({ mainChat: chat.id, category: cat.id, ownerID: msg.author.id });
        await chat.edit({ parentID: cat.id, topic: `This group chat is owned by ${msg.author.username}#${msg.author.discriminator}` }),
          await vc.edit({ parentID: cat.id }),
          await cat.editPermission(msg.author.id, '117760', '0', 'member', 'GC Owner'),
          await cat.editPermission(msg.guildID, '0', '117760', 'role', 'GC');
      });
    } else if (args[1] !== undefined) {
      const getName = msg.content.slice(config.prefix.length + args[0].length).trim();
      bot.createChannel(msg.guildID, getName, 4).then(async (cat) => {
        let chat = await bot.createChannel(msg.guildID, 'chat', 0);
        let vc = await bot.createChannel(msg.guildID, 'Voice', 2);
        await gc.createGC(cat.id, chat.id, msg.author.id);
        await gc.gcCache.push({ mainChat: chat.id, category: cat.id, ownerID: msg.author.id });
        await chat.edit({ parentID: cat.id, topic: `This group chat is owned by ${msg.author.username}#${msg.author.discriminator}` }),
          await vc.edit({ parentID: cat.id }),
          await cat.editPermission(msg.author.id, '117760', '0', 'member', 'GC Owner'),
          await cat.editPermission(msg.guildID, '0', '117760', 'role', 'GC');
      });
    }
  },
};
