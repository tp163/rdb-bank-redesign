const mongoose = require('mongoose');
const dns = require('dns');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Use Google DNS to resolve MongoDB Atlas SRV records
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        console.error('MongoDB Connection Error: MONGODB_URI is not set in backend/.env');
        return false;
    }

    try {
        const conn = await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return true;
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
        console.warn('Continuing without database connection. Dynamic API features may not work until MongoDB is reachable.');
        return false;
    }
};

module.exports = connectDB;
