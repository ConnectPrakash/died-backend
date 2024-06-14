const jwt = require('jsonwebtoken');

const authentication = (req,res,next) => {
     
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"missing Token"});
    }

    const getTokenFrom = (req) =>{
        const authorization = req.headers.authorization;

        if(authorization && authorization.toLowerCase().startsWith('bearer ')){
            return authorization.substring(7);
        }
        return null;
    }
    try{
        jwt.verify(getTokenFrom(req),'apple',(error,decodedToken) =>{
            if(error){
                return res.json({error:'Token is invalid1'});
            }

            req.userId= decodedToken.userId;
            console.log(req.userId);
            next();
        })
        
    }catch(error){
        return res.json({error:"Token is invalid2"})
    }
   
}

module.exports = authentication;