const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AssignmentSchema = Schema({
  name: { type: String },
  score: { type: Number, min: 0, max: 100 },
  studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
});

module.exports = mongoose.model('Assignment', AssignmentSchema);
