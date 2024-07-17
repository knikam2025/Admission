import mongoose from "mongoose";

const uri = 'mongodb+srv://admin:admin@cluster0.pwcf3b3.mongodb.net/Studentdata';

async function connectDB() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDBdata'.bgBlack);

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

export default connectDB;


