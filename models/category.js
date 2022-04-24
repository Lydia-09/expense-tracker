const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    require: true
  },
  icon: {
    type: String,
    trim: true,
    require: true,
  }
})

module.exports = mongoose.model('Category', categorySchema)