const assignmentModel = require('../models').assignment;

function createAssignment(req, res) {
  const student = Object.assign(req.body, { studentId: req.params.studentId });

  return assignmentModel
    .create(student)
    .then((student) => {
      res.status(201);
      res.json({ assignments: [ student ] })
    })
}

function getAll(req, res) {
  return assignmentModel
    .find({ studentId: req.params.studentId })
    .exec()
    .then((results) => {
      res.json({ assignments: results })
    })
}

module.exports = {
  createAssignment,
  getAll
};