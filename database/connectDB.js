const mongoose = require('mongoose')
mongoose.connect(require('../config.js').databaseToken, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log('Database Connected'))
