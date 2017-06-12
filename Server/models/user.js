const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email must be unique']
  },
  password: String,
  isAdmin: {
    default: false,
    type: Boolean
  }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
