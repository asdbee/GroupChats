const gc = require('../gc.js').get;
const config = require('../config.js');
function getGC(id) {
  return gc.gcCache.find((g) => g.mainChat === id);
}
module.exports = {
  name: '',
  usage: '{prefix}',
  execute(bot, msg, args) {},
};
