import mongoose from "mongoose";

const connectToMongoDb = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/notes-app"); // connection string from your db goes here.
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Error while connecting to MongoDB", error.message)
    }
}

export default connectToMongoDb
