const express = require("express");
const cors  = require("cors");
const mongoose = require("mongoose");
require("dotenv/config");

const exercisesRouter = require('./Routes/exercises');
const usersRouter = require('./Routes/users');

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



app.use('/exercises',exercisesRouter);

app.use('/users',usersRouter);


app.listen(port,() => {
    console.log(`Server is Running on Port: ${port}`);
})