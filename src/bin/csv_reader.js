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

module.exports = csvToArray;
