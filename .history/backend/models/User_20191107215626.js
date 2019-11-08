const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  phone: {
    type: Number
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary']
  },
  createdToday: {
    type: Boolean,
    default: false
  },
  time: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
