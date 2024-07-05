import mongoose from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect('mongodb+srv://Zesty:Jaskiran01082002@cluster0.bjizldy.mongodb.net/food-app').then(()=>console.log("DB connected"));
}

