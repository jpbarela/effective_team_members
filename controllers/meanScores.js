const express = require('express');
const assignmentModel = require('../models/assignment');

const router = express.Router();

router.get('/students/:studentId/meanScore', (req, res) => {
  assignmentModel.find({ studentId: req.params.studentId }, (err, assignments) => {
    let scoreSum = 0;
    for (let i = 0; i < assignments.length; i++) {
      scoreSum += assignments[i].score;
    }
    const average = assignments.length ? scoreSum / assignments.length : null;
    res.json({ meanScore: average });
  });
});

module.exports = router;
