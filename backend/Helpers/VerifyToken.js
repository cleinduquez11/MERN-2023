const jwt = require('jsonwebtoken');
require("dotenv").config();
const Secret_AccessToken = process.env.ACCESS_TOKEN;

const  Verify = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
            const token = authHeader.split(" ")[1];

            jwt.verify(token, Secret_AccessToken, (err,User)=>{
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


module.exports = Verify;