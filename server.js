import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import userRouter from "./routes/userRoutes.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoutes.js"
import orderRouter from "./routes/orderRoute.js"

// app config - we will initialize the app using express package 
const app = express()
const PORT = process.env.PORT || 4000

// middleware 
app.use(express.json())   // using this middleware whenever we get request from the front-end to backend that will be parsed using this json
app.use(cors())   // using this we can acceess the backend from any front-end

// db connection 
connectDB();

//API END-POINTS -> footRoute
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))    
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
// get method is an http method using this we can request the data form the server and we give path where we want to run this in point 
// "/" - home route
app.get("/",(req,res)=>{ 
    res.send("API WORKING")     // whatever text we write here will be displayed at this endpoint "/" mentioned   
})

//run the express server - give port number and one callback function 
app.listen(PORT,()=>{
    console.log(`Server started on http://localhost:${PORT}`)
})
