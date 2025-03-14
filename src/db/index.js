import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

//The function is asynch function because the database is in another continent
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance}`)
    } catch (error) {
        console.log("MONGODB connection failed",error);
        process.exit(1);
        //process.exit in nodejs means exiting the program

    }
}

export default connectDB