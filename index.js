// # csv conversion
const csvToArray = require('./csv_reader.js');
const filePath = './transactions.csv'; 

csvToArray(filePath)
    .then((array) => {
        console.log('Received array from CSV:');
        console.log(array);
    })
    .catch((error) => {
        console.error('Error processing the CSV file:', error.message);
    });
// # csv conversion





