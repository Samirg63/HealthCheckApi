import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

export async function connect(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lo5l3ed.mongodb.net/?appName=Cluster0/HealthCheck`)

        console.log("Connected succefuly on Database")
    } catch (error) {
      return error  
    }
}