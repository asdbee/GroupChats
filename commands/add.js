const gc = require('../gc.js').get;
const config = require('../config.js');
function getGC(id) {
  return gc.gcCache.find((g) => g.mainChat === id);
}
module.exports = {
  name: 'add',
  usage: '{prefix}add',
  execute(bot, msg, args) {
    if (msg.channel.parentID === config.ignoredCatagory) return;
    if (getGC(msg.channel.id) === undefined) return bot.createMessage(msg.channel.id, '`X` There is no GroupChat in this channel.');
    const user = args[1].replace(/[\\<>@#&!]/g, '');
    const brotherChannels = msg.channel.guild.channels.filter((c) => c.parentID === msg.channel.parentID);
    Promise.all(brotherChannels.map((c) => c.editPermission(user, '117760', '0', 'member', 'Added'))).then(() => {
      bot.createMessage(msg.channel.id, msg.author.username + ' added <@' + user + '>');
    });
  },
};
