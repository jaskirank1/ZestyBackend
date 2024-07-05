import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {type:String, required:true},        // if we do not give the name the entry wont be inserted 
    description: {type:String, required:true},
    price: {type:Number, required:true},
    image: {type:String, required:true},
    category: {type:String, required:true}
    }
    // {timestamps: true}     // it will also store the time at which the data was inserted in the db 
);

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema)     // food is the name of collection and second parameter is that we have to pass the schema 

export default foodModel;