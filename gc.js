let get = {}

get.allGCInfo = () => {
    const gcs = require('./database/template.js')
    return gcs.find()
}

get.getGCInfo = (id) => {
    const gcs = require('./database/template.js')
    return gcs.findById(id)
}

get.createGC = (category,main,owner) => {
    try {
        const gc = require('./database/template.js')
        const newGc = new gc ({
            _id: main,
            chatID: main,
            categoryID: category,
            ownerID: owner
        })
        newGc.save().then(() => {
            return true
        })
    }
    catch (err) {
        console.error(err)
        return false
    }
}

get.gcCache = [ { mainChat: '', category: '', ownerID: '' } ]

module.exports = { get }