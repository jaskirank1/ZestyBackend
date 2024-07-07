import jwt from 'jsonwebtoken'

// a middleware
const authMiddleware = async (req,resp,next)=>{
    const {token} = req.headers;
    if(!token){
        return resp.json({success:false,message:"Not Authorised login again"})
    }
    try{
        //decode the token -> with verify method add the token we got from user and JWT_SECRET token from .env file 
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;     //as in create (userController) we used an object userId -> and on decoding we will get that id that we will send in the req body
        next();
    }catch(error){
        console.log(error);
        resp.json({success:false,message:"Error in auth middleware"});
    }
}

export default authMiddleware;