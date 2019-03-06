const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug')('app:mongo');
const config = require(path.resolve('./app/config'));
module.exports = () => mongoose.connect( config.db.hosts, { useNewUrlParser: true })
  .then(() => debug('MongoDB Connected Success'))
  .catch(err => debug(err));
