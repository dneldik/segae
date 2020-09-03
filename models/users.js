const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: { type: String, required: [true, 'user field is required'] },
  password: { type: String, required: [true, 'password field is required'] },
  admin: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', UserSchema);