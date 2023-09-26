
const jwt = require('jsonwebtoken');


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


export{Verify};