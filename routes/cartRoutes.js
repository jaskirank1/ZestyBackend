import express from 'express'
import { addToCart,removeFromCart,getCart } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// created 3api endpoints using the express router cartRouter 
cartRouter.post("/add",authMiddleware,addToCart)
cartRouter.post("/remove",authMiddleware,removeFromCart)
cartRouter.get("/get",authMiddleware,getCart)

export default cartRouter;