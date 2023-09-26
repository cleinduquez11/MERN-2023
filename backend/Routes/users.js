const express = require('express');

const usersRouter = express.Router();


let User = require('../Models/User.model');





usersRouter.route('/').get((req,res) => {
        const {user, pass} = req.body;
    res.json({"Rt":`Hey you are login as ${user}`});
    // User.find()
    // .then(users => res.json(users))
    // .catch(err => res.status(400).json('Error: ' + err));

});

usersRouter.route('/').post((req,res) => {
    const {user, pass} = req.body;
res.json({"Rt":`Hey you are login as ${user}`});
// User.find()
// .then(users => res.json(users))
// .catch(err => res.status(400).json('Error: ' + err));

});

// usersRouter.route('/add').post((req,res) => {

//     const {user, pass} = 
//     const username = req.body.username;

//     const newUser = new User({username});
//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));

// });




usersRouter.delete('/delete/:userId',(req,res) => {
    if (req.User.id == req.params.userId || req.User.isAdmin) {
        res.status(200).json("User has been deleted");
    }
    else {
        res.status(403).json("You are not allowed to delete this user");
    }



});




module.exports = usersRouter;