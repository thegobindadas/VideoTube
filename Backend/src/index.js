import dotenv from "dotenv"
import mongoose from "mongoose";
import express from "express";
import config from "./config/index.js";
import { DB_NAME } from './constants.js'



dotenv.config({
    path: './.env'
})



const app = express();

;(async () => {
    try {
        await mongoose.connect(`${config.MONGODB_URI}/${DB_NAME}`);

        app.on("error", (error) => {
            console.log("Error: ", error);
            throw error
        })

        app.listen(config.PORT, () => {
            console.log(`App is listening on port: ${config.PORT}`);
        })
    } catch (error) {
        console.log("MongoDB connection error: ", error);
        throw error
    }
})()