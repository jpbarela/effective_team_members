const studentModel = require('../../models').student;
const studentController = require('../../controllers/studentsController');

describe('studentsController', () => {
  function yearsAgo(years) {
    return new Date(new Date() - (1000 * 60 * 60 * 24 * 365 * years));
  }

  describe('createStudent', () => {
    beforeAll((done) => {
      const self = this;

      self.student = { firstName: 'Test', lastName: 'User', birthday: yearsAgo(7) };
      const request = { body: self.student };
      self.response = jasmine.createSpyObj('response', ['json']);

      studentController
        .createStudent(request, self.response)
        .then(() => {
          const newStudentId = self.response.json.calls.argsFor(0)[0].students[0]._id;
          return studentModel
            .findById(newStudentId)
            .exec();
        })
        .then((student) => {
          self.createdStudent = student;
        })
        .then(done);
    });

    it('returns the document including id', () => {
      const self = this;
      const document = self.response.json.calls.argsFor(0)[0].students[0];
      expect(document._id).not.toBeUndefined();
      expect(document).toEqual(jasmine.objectContaining(self.student));
    });

    it('creates the student in the mongo database', () => {
      expect(this.createdStudent).toBeDefined();
    });
  });

  describe('find', () => {
    beforeAll((done) => {
      const self = this;

      self.studentData = [
        { firstName: 'Test', lastName: 'User', birthday: yearsAgo(7) },
      ];

      studentModel
        .remove({})
        .then(() => studentModel.create(self.studentData))
        .then((results) => {
          self.students = results;
        })
        .then(() => {
          const request = { params: { id: self.students[0]._id } };
          self.response = jasmine.createSpyObj('response', ['json']);
          return studentController.find(request, self.response);
        })
        .then(done)
        .catch(done.fail);
    });

    it('calls the response with the document', () => {
      expect(this.response.json).toHaveBeenCalledWith({
        students: this.studentData.map(student => jasmine.objectContaining(student)),
      });
    });
  });

  describe('getAll', () => {
    beforeAll((done) => {
      const self = this;

      self.studentData = [
        { firstName: 'Test', lastName: 'User', birthday: yearsAgo(7) },
        { firstName: 'Example', lastName: 'Student', birthday: yearsAgo(8) },
        { firstName: 'Fake', lastName: 'Person', birthday: yearsAgo(7) },
      ];

      studentModel
        .remove({})
        .then(() => studentModel.create(self.studentData))
        .then((results) => {
          self.students = results;
        })
        .then(() => {
          const request = {};
          self.response = jasmine.createSpyObj('response', ['json']);
          return studentController.getAll(request, self.response);
        })
        .then(done)
        .catch(done.fail);
    });

    it('calls response json with the array', () => {
      expect(this.response.json).toHaveBeenCalledWith({
        students: this.studentData.map(student => jasmine.objectContaining(student)),
      });
    });
  });
});
