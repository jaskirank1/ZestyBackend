import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

// express router 
const foodRouter = express.Router();

// Image storage engine 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{     // cb: callback
        return cb(null,`${Date.now()}${file.originalname}`)    // we will add unique name for each image-> 2nd parameter specifies this 
    }
})

const upload = multer({storage:storage})    // upload is a middleware used to store images in upload
foodRouter.post("/add", upload.single("image"), addFood)     // on the route /add we have to use this upload middleware 
foodRouter.get("/list",listFood)        // this /list is a new endpoint 
foodRouter.post("/remove", removeFood)

export default foodRouter;