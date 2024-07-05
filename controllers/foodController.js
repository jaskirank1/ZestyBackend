import foodModel from "../models/foodModels.js"
import fs from 'fs'


// add food item

// addFood is an API - whenever we will hit this api in the body we will send the food details and in the backend we will access the data using this function  
// it contains logic using that we can store product data in the database 
const addFood = async (req,res)=>{

    let image_filename = `${req.file.filename}`

    // create a new food using the foodmodel object made in db
     const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
     })
     try{
        await food.save()    // using this method the fooditem will be saved in the db and after this we have to create one response of json type
        res.json({success:true,message:"Food Added"})
     }catch(error){
        console.log(error)
        res.json({success:false, message:"Error"})
     }
}

// all food list
const listFood = async (req,res)=>{
    try{
        const foods = await foodModel.find({});    // foodModel is a collection which has all data
        res.json({success:true,  data:foods})
    }catch(error){
        console.log(error)
        res.json({success:false,message: "Error"})
    }
}

// function for removing food item from database 
const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);    // in food we will have complete info about that fooditem 
        fs.unlink(`uploads/${food.image}`,()=>{})     // to delete the food item from uploads folder 
        await foodModel.findByIdAndDelete(req.body.id);     // delete the food item from the database
        res.json({success:true,message:"Food Removed"})
    }catch(error){
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {addFood, listFood, removeFood}