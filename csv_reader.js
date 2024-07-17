const fs = require('fs');
const csvParse = require('csv-parse');

function csvToArray(filePath) {
    return new Promise((resolve, reject) => {
        const rows = [];

        fs.createReadStream(filePath)
            .pipe(csvParse.parse({ delimiter: ',', from_line: 1 }))
            .on('data', (row) => {
                rows.push(row.join(','));
            })
            .on('end', () => {
                resolve(rows);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}

// Export the function
module.exports = csvToArray ;

// Example usage
if (require.main === module) {
    const filePath = process.argv[2];

    if (!filePath) {
        console.error('Please provide the path to the CSV file.');
        process.exit(1);
    }

    csvToArray(filePath)
        .then((array) => {
            console.log('CSV as array:');
            console.log(array);
        })
        .catch((error) => {
            console.error('Error processing the CSV file:', error.message);
        });
}
