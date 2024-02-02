import fs from 'fs';
import path from 'path';

// Define the path to the data file
const dataFilePath = path.join(process.cwd(), 'data.json');

// Sleep function to introduce delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Function to read data from the file
const readData = async () => {
  // Check if the file exists
  if (!fs.existsSync(dataFilePath)) {
    // Initialize the file with default data if it doesn't exist
    const defaultData = [
      {
        "id": 1124,
        "firstName": "Douglas",
        "lastName": "Crockford",
        "favorite": true,
      },
      {
        "id": 1530,
        "firstName": "Tammy",
        "lastName": "Baker",
        "favorite": false,
      },
      {
        "id": 2920,
        "firstName": "Ron",
        "lastName": "Lichty",
        "favorite": false,
      },
    ];
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  } else {
    // Read the file if it exists
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // Handle GET request with a 2-second delay
      await sleep(2000);
      const data = await readData();
      res.status(200).json(data);
      break;
    case 'PUT':
      // Handle PUT request with a 2-second delay
      await sleep(2000);
      const updatedRecord = req.body; // Assuming this contains the record to update, including its 'id'
      const records = await readData(); // Read the current data

      // Find the index of the record to update
      const recordIndex = records.findIndex(record => record.id === updatedRecord.id);
      if (recordIndex > -1) {
        // Replace the record in the array
        records[recordIndex] = updatedRecord;

        // Write the updated array back to data.json
        fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2));
        res.status(200).json(updatedRecord);
      } else {
        // If the record doesn't exist, return a 404
        res.status(404).json({message: "Record not found"});
      }
      break;
    default:
      // Immediately reject any other HTTP method
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
