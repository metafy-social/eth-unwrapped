import mongoose from "mongoose";

import { MONGODB_URI } from "./config";

export async function connectDb() {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

export async function disconnectDb() {
    try {
        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}