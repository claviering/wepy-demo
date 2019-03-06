const path = require('path');
const config = require(path.resolve('./app/config'));
const mongoose = require('mongoose');

const UserSchema = {
  title: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  author: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  detail: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: '',
  },
  grade: {
    type: String,
    default: '',
  },
  money: {
    type: String,
    default: '',
  },
  createTime: {
    type: String,
    default: ''
  }
}

const infoModel = mongoose.model(config.db.infoModel, UserSchema);

module.exports = infoModel;
