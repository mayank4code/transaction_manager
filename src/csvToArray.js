import fs from 'fs/promises';

async function csvToArray(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const values = data.split(','); // Split by comma to get individual values
        const formattedRows = [];

        for (let i = 0; i < values.length; i += 3) {
            const row = `${values[i]} ${values[i + 1]} ${values[i + 2]}`;
            formattedRows.push(row);
        }

        return formattedRows;
    } catch (error) {
        throw error;
    }

    
}

export default csvToArray;
