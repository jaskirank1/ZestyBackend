import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true},
    cartData: {type:Object, default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
// user is the name of the collection in the database 

export default userModel; 