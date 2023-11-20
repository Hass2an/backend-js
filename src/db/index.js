import mongoose from "mongoose";
import {DB_Name} from "../constants.js"

const connectDB = async ()=>{
try {
    const connectionsinstance = await mongoose.connect("mongodb+srv://Hassan:hassan123@cluster0.thzw56s.mongodb.net")
    console.log(`\n MongoDb is connected on: ${connectionsinstance.connection.host}`);
} catch (error) {
    console.log(error);
}

}

export default connectDB;