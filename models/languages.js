const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  title: { type: String, required: [true, 'title field is required'] },
  author: { type: String, required: [true, 'author field is required'] },
  body: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

module.exports = mongoose.model('Languages', languageSchema);