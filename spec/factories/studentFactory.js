const studentModel = require('../../models').student;

function createStudents(studentOrArray){
  if (studentOrArray === undefined) {
    const data = { firstName: 'test', lastName: 'User', birthday: new Date() };
  }
  else {
    const data = studentOrArray;
  }
  return studentModel.create(studentOrArray)
}

function reset() {
  return studentModel
    .remove({})
}

module.exports = {
  createStudents,
  reset
};