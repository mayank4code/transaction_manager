import fs from 'fs';
import csvParse from 'csv-parse';

export async function csvToArray(filePath) {
    const rows = [];
    try {
        await fs.promises.readFile(filePath, 'utf-8')
            .then((data) => {
                csvParse(data, { delimiter: ',', from_line: 1 })
                    .on('data', (row) => {
                        rows.push(row.join(','));
                    });
            });
        return rows;
    } catch (error) {
        throw error;
    }
}

export default csvToArray;













// import fs from 'fs';
// import { parse } from 'csv-parse';

// function csvToArray(filePath) {
//     return new Promise((resolve, reject) => {
//         const rows = [];
//         fs.createReadStream(filePath)
//             .pipe(parse({ delimiter: ',', from_line: 1 }))
//             .on('data', (row) => {
//                 rows.push(row.join(','));
//             })
//             .on('end', () => {
//                 resolve(rows);
//             })
//             .on('error', (error) => {
//                 reject(error);
//             });
//     });
// }



// // Export the function
// export default csvToArray;

// // // Example usage
// // if (require.main === module) {
// //     const filePath = process.argv[2];

// //     if (!filePath) {
// //         console.error('Please provide the path to the CSV file.');
// //         process.exit(1);
// //     }

// //     csvToArray(filePath)
// //         .then((array) => {
// //             console.log('CSV as array:');
// //             console.log(array);
// //         })
// //         .catch((error) => {
// //             console.error('Error processing the CSV file:', error.message);
// //         });
// // }
