const express = require('express');
const routes = express.Router();

const students = require('./studentsRoutes');

routes.use('/students', students);

module.exports = routes;