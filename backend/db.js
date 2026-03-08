import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const ConnectionString = process.env.DB_STRING;

export default async function ConnectToDB() {
    try {
        await mongoose.connect(ConnectionString);
        console.log('Connected Successfully')
    } catch (error) {
        console.log(error.message, "Failed to Connect");
        process.exit(1);
    }
}