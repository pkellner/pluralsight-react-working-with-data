"use server";

const fs = require("fs");
import path from "path";

const dataFilePath = path.join(process.cwd(), 'data.json');

export default async function speakerAction(updatedRecord) {

  async function readData() {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
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
        throw error;
      }
    }
  }

  const records = await readData();
  const recordIndex = records.findIndex(
    (record) => record.id === updatedRecord.id,
  );

  if (recordIndex > -1) {
    records[recordIndex] = updatedRecord;
    fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2));
    return true;
  }


}
