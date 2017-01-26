const studentFactory = require('../factories/studentFactory');
const assignmentModel = require('../../models').assignment;
const assignmentsController = require('../../controllers/assignmentsController');
const { verifySent } = require('../support/helpers');

describe('assignmentsController', () => {
  beforeAll((done) => {
    const self = this;

    studentFactory
      .reset()
      .then(() => studentFactory.createStudents())
      .then((result) => {
        self.student = result
      })
      .then(done)
  });

  describe('#createAssignment', () => {
    beforeAll((done) => {
      const self = this;

      self.response = jasmine.createSpyObj('response', ['json', 'status']);
      self.assignmentBody = {name: 'Test Assignment', score: 100};

      assignmentsController
        .createAssignment(
          { params: { studentId: self.student._id }, body: self.assignmentBody },
          self.response)
        .then(done);
    });

    it('returns 201', () => {
      expect(this.response.status).toHaveBeenCalledWith(201);
    });

    it('returns the assignment', () => {
      const student = Object.assign(this.assignmentBody, { studentId: this.student._id });
      verifySent(this.response.json, [ student ], 'assignments')
    });
  });

  describe('#getAll', () => {
    beforeAll((done) => {
      const self = this;

      self.assignments = [
        { name: 'First Assignment', score: 78, studentId: self.student._id},
        { name:  'Midterm', score: 85, studentId: self.student._id },
        { name: 'Final Exam', score: 68, studentId: self.student._id }
      ];

      assignmentModel
        .remove({})
        .then(() => {
          return assignmentModel.create(self.assignments)
        })
        .then(() => {
          const request = { params: { studentId: self.student._id } };
          self.response = jasmine.createSpyObj('response', ['json']);

          return assignmentsController.getAll(request, self.response);
        })
        .then(done)
    });

    it('returns the assignments', () => {
      const self = this;

      verifySent(self.response.json, self.assignments, 'assignments');
    });
  });
});