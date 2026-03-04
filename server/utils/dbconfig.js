import mongoose from 'mongoose'
import 'dotenv/config'

const uri = process.env.DB_URL;

export const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to Atlas');
        return true;
    } catch (err) {
        console.error('Failed to connect to Atlas:', err);
        return false;
    }
};

