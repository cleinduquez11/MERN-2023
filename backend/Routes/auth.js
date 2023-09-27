const express = require('express');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();
const Secret_AccessToken = process.env.ACCESS_TOKEN;
let User = require('../Models/User.model');



authRouter.post('/add', (req,res) => {

    const {user, pass, isAdmin} = req.body;

    const newUser = new User({username: user,
    password:pass,isAdmin:isAdmin,accessToken:""});
    newUser.save()
    .then(() => res.status(200).json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));

});



authRouter.post('/authUser', (req,res)=>{
    const { user, pass} = req.body;
     User.find({username: user, password: pass}).then((userFound)=>{
        
            const accesstoken = jwt.sign({
                id: userFound[0]._id.toString() ,
                isAdmin: userFound[0].isAdmin
            }, Secret_AccessToken,
            { expiresIn: '3m' }
            );
             User.findByIdAndUpdate(userFound[0]._id , {
                accessToken:  accesstoken}).then((u)=> {
                    res.json({message:"You are now Authenticated", accesstoken})
                }) 
    
     }).catch((e) => {
        res.status(401).json(`${e}, You are not authenticated`)
     })
      
  
});


authRouter.get('/authUser', (req,res)=>{
    const { user, pass} = req.query;
     User.find({username: user, password: pass}).then((userFound)=>{
        
            const accesstoken = jwt.sign({
                id: userFound[0]._id.toString() ,
                isAdmin: userFound[0].isAdmin
            }, "MySecretKey"
            );
             User.findByIdAndUpdate(userFound[0]._id , {
                accessToken:  accesstoken}).then((u)=> {
                    res.json({message:"You are now Authenticated", accesstoken})
                })
     
             
        
      
      
    
     }).catch((e) => {
        res.status(401).json("You are not authenticated")
     })
      
  
});

module.exports = authRouter;