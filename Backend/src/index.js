import dotenv from "dotenv"
import mongoose from "mongoose";
import config from "./config/index.js";
import { DB_NAME } from './constants.js'



dotenv.config({
    path: './.env'
})





;(async () => {
    try {
        await mongoose.connect(`${config.MONGODB_URI}/${DB_NAME}`);

    } catch (error) {
        console.log("MongoDB connection error", error);
        throw error
    }
})()