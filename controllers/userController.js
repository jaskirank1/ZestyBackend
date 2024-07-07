import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});

        //if we do not have any use4r with the mentioned email then this if is executed 
        if(!user){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);    // user is the collection name, isMatch stores bool value 

        if(!isMatch){
            return res.json({success:false,message:"Incorrect Password"})
        }

        const token = createToken(user._id);
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in loginUser in userController"})
    }
}

// creation of token 
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;

    // firstly check the user with emailid curently entered should not be already present is present send a response 
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format and strong password 
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Invalid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Enter a strong password with 8 or more length"})
        }

        // hashing/encrypting user passowrd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in registerUser in userController"});
    }
}

export {loginUser,registerUser};