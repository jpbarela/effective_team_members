const express = require('express');

const router = express.Router();

const studentsController = require('../controllers/studentsController');

router.route('/')
  .get(studentsController.getAll)
  .post(studentsController.createStudent);

router.route('/:id')
  .get(studentsController.find);

module.exports = router;
