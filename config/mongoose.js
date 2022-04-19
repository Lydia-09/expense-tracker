const mongoose = require('mongoose')
// 設定連線到 mongoDB
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

const db = mongoose.connection

db.on('error', () => {
    console.log('mongodb error')
})

db.once('open', () => {
    console.log('mongodb connected!')
})

module.exports = db