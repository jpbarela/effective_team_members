const mongoose = require('mongoose');

const config = require('../config');

const student = require('./student');

mongoose.Promise = global.Promise;
const connection = mongoose.connect(config.db);

module.exports = {
  connection,
  student,
};
