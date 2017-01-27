const express = require('express');

const routes = express.Router();

const students = require('./studentsRoutes');
const meanScoreController = require('../controllers/meanScores');

routes.use('/students', students);
routes.use('/', meanScoreController);

module.exports = routes;
