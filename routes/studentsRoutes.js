const express = require('express');

const router = express.Router();

const studentsController = require('../controllers/studentsController');
const assignmentsController = require('../controllers/assignmentsController');

router.route('/')
  .get(studentsController.getAll)
  .post(studentsController.createStudent);

router.route('/:id')
  .get(studentsController.find);

router.route('/:studentId/assignments')
  .get(assignmentsController.getAll)
  .post(assignmentsController.createAssignment);

module.exports = router;
