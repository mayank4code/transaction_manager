import { connect } from 'mongoose';
import dotenv from 'dotenv';
import startCLI from './src/functions.js';


dotenv.config();

const connectionString = process.env.MONGO_URI;

connect(connectionString)
    .then(() => {
        console.log('Connected to the MongoDB Database');
        startCLI();
    })
    .catch((err) => console.error('Connection error:', err));
