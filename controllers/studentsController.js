const studentModel = require('../models').student;

function createStudent(req, res) {
  return studentModel
    .create(req.body)
    .then(student => res.json({ students: [student] }));
}

function find(req, res) {
  return studentModel
    .findById(req.params.id)
    .exec()
    .then(student => res.json({ students: [student] }));
}

function getAll(req, res) {
  return studentModel
    .find({})
    .exec()
    .then(students => res.json({ students }));
}

module.exports = {
  createStudent,
  find,
  getAll,
};
