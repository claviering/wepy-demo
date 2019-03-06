const path = require('path');
const config = require(path.resolve('./app/config'));
const mongoose = require('mongoose');

const UserSchema = {
  userName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    default: '男',
    required: false
  },
  email: {
    type: String,
    default: 'you@email.com',
    required: false
  },
  qq: {
    type: String,
    default: 'qq',
    required: false
  },
  country: {
    type: String,
    default: '中国'
  },
  openid: {
    type: String,
    required: true
  }
}

const userModel = mongoose.model(config.db.usersModel, UserSchema);

module.exports = userModel;
