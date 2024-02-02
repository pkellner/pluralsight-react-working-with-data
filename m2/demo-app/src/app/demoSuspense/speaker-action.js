"use server";

const fs = require("fs");
import path from "path";
import {readFile} from "node:fs";

const dataFilePath = path.join(process.cwd(), 'data.json');

export default async function speakerAction(updatedRecord) {

  async function readData() {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // If the file does not exist, write the default data to a new file
      if (error.code === "ENOENT") {
        const defaultData = [
          {
            id: 1124,
            firstName: "Douglas",
            lastName: "Crockford",
            favorite: true,
          },
          {
            id: 1530,
            firstName: "Tammy",
            lastName: "Baker",
            favorite: false,
          },
          {
            id: 2920,
            firstName: "Ron",
            lastName: "Lichty",
            favorite: false,
          },
        ];
        await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
        return defaultData;
      } else {
        // If there's another error, throw it to be handled by the caller
        throw error;
      }
    }
  }

  const records = await readData();
  const recordIndex = records.findIndex(
    (record) => record.id === updatedRecord.id,
  );

  if (recordIndex > -1) {
    // Replace the record in the array
    records[recordIndex] = updatedRecord;

    // Write the updated array back to data.json
    fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2));
    return true;
  }


}
