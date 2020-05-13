const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languagesSchema = new Schema({
  name: { type: String, required: true },
  votes: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('languages', languagesSchema);