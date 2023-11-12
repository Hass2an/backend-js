import mongoose from "mongoose";
import {DB_Name} from "../constants.js"
const connectDB = async ()=>{
try {
    const connectionsinstance = await mongoose.connect(`${process.env.DATABASE_CON}/${DB_Name}`)
    console.log(`\n MongoDb is connected on: ${connectionsinstance.connection.host}`);
} catch (error) {
    console.log(error);
}

}

export default connectDB;