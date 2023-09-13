const express = require('express');
const exercisesRouter = express.Router();



let Exercise = require('../Models/Exercise.model');


exercisesRouter.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));

});

exercisesRouter.route('/add').post((req,res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    
    });
    newExercise.save()
    .then(() => res.json('Exercises added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});



module.exports = exercisesRouter;