import SpeakerList from "./speaker-list";
import { Suspense } from "react";
import path from "path";

const fs = require('fs').promises;

const dataFilePath = path.join(process.cwd(), 'data.json');

async function readData() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
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
      await fs.writeFile(dataFilePath, JSON.stringify(defaultData, null, 2));
      return defaultData;
    } else {
      throw error;
    }
  }
}


export default async function Page() {
  const speakers = await readData();
  return (
    <div className="container mt-3">
      <h1>Conference Speakers</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <SpeakerList  speakers={speakers} />
      </Suspense>
    </div>
  );
}
