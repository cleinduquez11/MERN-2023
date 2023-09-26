const express = require("express");
const cors  = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");
const jwt = require('jsonwebtoken');
const exercisesRouter = require('./Routes/exercises');
const usersRouter = require('./Routes/users');
const authRouter = require("./Routes/auth");

const uri = process.env.ATLAS_URI;
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());





const  Verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
            const token = authHeader.split(" ")[1];

            jwt.verify(token, "MySecretKey", (err,User)=>{
                    if(err){
                        return res.status(403).json("Token is not Valid");
                    }
                    else {
                       
                        req.User = User
                        next();
                    }
            })

    }
    else {
        res.status(401).json("You are not authenticated");
    }
}


mongoose.connect(uri);
  
if (mongoose.ConnectionStates.connected) {
    console.log('MongoDB is Connected');
} else {
    console.log('MongoDB is not Connected');
}

app.use('/api/auth', authRouter);
app.use('/api/exercises', exercisesRouter);

app.use('/api/users', Verify, usersRouter);



app.listen(port,() => {
    console.log(`Server is Running on Port: ${port}`);
})