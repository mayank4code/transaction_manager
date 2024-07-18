import { connect } from 'mongoose';
import dotenv from 'dotenv';
import startCLI from './src/system.js';
import csvToArray from './src/csvToArray.js';


dotenv.config();


async function processMultipleTransaction(filePath) {
    try {
      const array = await csvToArray('./assets/transactions.csv');
      // const array = await csvToArray(`./../assets/transacions.csv`);
      console.log(array)
    } catch (error) {
      console.error('Error processing the CSV file:', error);
    }
  }

const connectionString = process.env.MONGO_URI;

connect(connectionString)
    .then(() => {
        console.log('Connected to the MongoDB Database');
        // startCLI();
        processMultipleTransaction('./assets/transacions.csv')
    })
    .catch((err) => console.error('Connection error:', err));
