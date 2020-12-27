const { strict } = require('assert')
const mongoose  = require('mongoose')

const newGC = mongoose.Schema({
    _id: String,
    chatID: String,
    categoryID: String,
    ownerID: String
})

module.exports = mongoose.model('Chat', newGC)