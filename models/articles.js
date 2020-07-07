const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articlesSchema = new Schema({
  title: { type: String, required: [true, 'title field is required'] },
  author: { type: String, required: [true, 'author field is required'] },
  body: Array,
  date: { type: Date, default: Date.now },
  show: Boolean
});

module.exports = mongoose.model('articles', articlesSchema);