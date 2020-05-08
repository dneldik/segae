const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  body: String,
  date: { type: Date, default: Date.now },
  hidden: Boolean
});

module.exports = mongoose.model('Languages', languageSchema);