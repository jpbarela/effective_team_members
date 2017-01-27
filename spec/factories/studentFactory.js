const studentModel = require('../../models').student;

function createStudents(studentOrArray) {
  let data;

  if (studentOrArray === undefined) {
    data = { firstName: 'test', lastName: 'User', birthday: new Date() };
  } else {
    data = studentOrArray;
  }
  return studentModel.create(data);
}

function reset() {
  return studentModel
    .remove({});
}

module.exports = {
  createStudents,
  reset,
};
