const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    index: true,
    required: true
  },
  date: {
    type: Date,
    require: true
  },
  amount: {
    type: Number,
    min: [1, 'at least one dollar'],
    require: true
  }
})

module.exports = mongoose.model('Record', recordSchema)