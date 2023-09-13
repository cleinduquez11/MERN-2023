const express = require('express');

const usersRouter = express.Router();


let User = require('../Models/User.model');


usersRouter.route('/').get((req,res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));

});


usersRouter.route('/add').post((req,res) => {
    const username = req.body.username;
    const newUser = new User({username});
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});


module.exports = usersRouter;