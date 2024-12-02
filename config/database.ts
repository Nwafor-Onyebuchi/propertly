import mongoose from "mongoose";

// let connected: boolean = false

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState > 0) {
        console.log('MongoDB is already connected');
        return;
    }

    if (!process.env.MONGO_URI) {
        console.log('MongoDB URI is not defined');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

export default connectDB;



