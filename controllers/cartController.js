import userModel from '../models/userModel.js'

// add items to user cart 
const addToCart = async (req,res)=>{
    try{
        //get all data of user and then extract the cart data
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        // if the itemId sent doesnot exist in cart already then add that item in cart but if that itemId already exists then just inc the value
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//remove items from user cart
const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;      //extract cart data from the user data 
        if(cartData[req.body.itemId]>0){         // if the value of the item_id we got is >0 then -1
            cartData[req.body.itemId] -= 1;
        }
        //update userModel
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"Error"});
    }
}

//fetch user cart data 
const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

export {addToCart,removeFromCart,getCart}