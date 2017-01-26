const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = Schema({
  firstName: { type: String },
  lastName: { type: String },
  birthday: { type: Date },
});

module.exports = mongoose.model('Student', StudentSchema);
