import orderModel from "../models/orderModels.js";
import userModel from '../models/userModel.js'
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend 
const placeOrder = async (req,res)=>{

    const frontend_url = "http://localhost:5174";
    
    try{
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();     // it will save the order in db
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
        
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data: {
                    name:item.name
                },
                unit_amount:item.price*100,
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:30*100
            },
            quantity:1,
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&OrderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&OrderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url})

    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
 
const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body;
    try{
        if(success == "true"){
            // if success is true then add the payment as true in db which awas previuosly stored as false, orderId where chnages have to be made 
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            // payment is not made so just delete the order from db
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false.valueOf,message:"Error"})
    } 
}

//user orders for frontend 
const userOrders = async(req,res)=>{
    try{
        // we will get all the orders of the user in orders
        const orders = await orderModel.find({userId:req.body.userId})
        console.log(orders);
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//listing orders for admin pannel
const listOrder = async (req,res)=>{
    try{
        const orders = await orderModel.find({});       // we will get all data of orders
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error in listOrder in orderController"})
    }
}

// api for updating order status
const updateStatus = async (req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error in updating Status in Database"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrder,updateStatus};