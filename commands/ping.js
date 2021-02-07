module.exports = {
  name: 'ping',
  usage: '{prefix}ping',
  execute(bot, msg, args) {
    bot.createMessage(msg.channel.id, 'Pong!');
  },
};
