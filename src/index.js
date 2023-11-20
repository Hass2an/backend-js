import dotenv from "dotenv"
import { app } from './app.js';
import connectDB from "./db/index.js";
const PORT = 3000;
dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(PORT || 3000,()=>{
        console.log(`Server is listening on ${PORT}`);
    })
})
.catch((err)=>{
    console.log("Connection Failed:",err);
})