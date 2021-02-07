const gc = require('../gc.js').get;
const config = require('../config.js');

function getGC(id) {
  return gc.gcCache.find((g) => g.mainChat === id);
}
module.exports = {
  name: 'delete',
  usage: '{prefix}delete',
  execute(bot, msg, args) {
    if (msg.channel.parentID === config.ignoredCatagory) return;
    if (getGC(msg.channel.id) === undefined) return bot.createMessage(msg.channel.id, '`X` There is no GroupChat in this channel.');
    if (getGC(msg.channel.id).ownerID !== msg.author.id) return bot.createMessage(msg.channel.id, '`!` You are not the owner of this GC!');
    const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID);
    Promise.all(brotherChannels.map((c) => c.delete()))
      .then(() => {
        bot.getChannel(msg.channel.parentID).delete();
        gc.getGCInfo(msg.channel.id).then((data) => {
          data.delete();
        });
      })
      .catch((err) => {
        bot.createMessage(msg.channel.id, 'Unable to delete. \n`' + err + '`');
      });
  },
};
