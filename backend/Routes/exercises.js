const express = require('express');
const exercisesRouter = express.Router();
let Exercise = require('../Models/Exercise.model');


exercisesRouter.route('/').get((req,res) => {
    Exercise.find()
    .then(exercises => res.status(200).json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));

});

exercisesRouter.route('/add').post((req,res) => {

    const {username,description, duration, date} = req.body;
    // const username = req.body.username;
    // const description = req.body.description;
    // const duration = Number(req.body.duration);
    // const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    
    });
    newExercise.save()
    .then(() => res.status(200).json('Exercises added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});

exercisesRouter.route('/:id').get((req,res) => {
    const id = req.params.id;
    Exercise.findById(id)
    .then(exercise => res.status(200).json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));

});

exercisesRouter.route('/:id').delete((req,res) => {
    const id = req.params.id;
    if (req.User.isAdmin) {
        Exercise.findByIdAndDelete(id)
        .then(() => res.status(200).json("Exercise has been deleted"))
        .catch(err => res.status(400).json('Error: ' + err));
        
    }
    else {
        res.status(403).json("You are not allowed to delete this user");
    }

    



});


exercisesRouter.route('/update/:id').patch((req,res) => {
    const {username,description, duration, date} = req.body;
    
    const id = req.params.id;
    Exercise.findById(id)
    .then(exercise => {
        exercise.username = username;
        exercise.description = description;
        exercise.duration = duration;
        exercise.date = date;
        exercise.save()
        .then(()=>res.status(200).json('Exercise updated'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err));

});






module.exports = exercisesRouter;