require("dotenv").config();
const express = require("express");
const cors  = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const exercisesRouter = require('./Routes/exercises');
const usersRouter = require('./Routes/users');
const authRouter = require("./Routes/auth");
const Verify = require("./Helpers/VerifyToken");
const path = require('path');
const uri = process.env.ATLAS_URI;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());



mongoose.connect(uri);
  
if (mongoose.ConnectionStates.connected) {
    console.log('MongoDB is Connected');
} else {
    console.log('MongoDB is not Connected');
}

app.use('/api/auth', authRouter);
app.use('/api/exercises' , Verify, exercisesRouter);

app.use('/api/users', Verify, usersRouter);

app.all('*',(req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'Views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})


app.listen(port,() => {
    console.log(`Server is Running on Port: ${port}`);
})