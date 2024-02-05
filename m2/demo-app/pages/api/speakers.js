import fs from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data.json");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const readData = async () => {
  if (!fs.existsSync(dataFilePath)) {
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
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  } else {
    const data = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(data);
  }
};

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      await sleep(3000);
      const data = await readData();
      res.status(200).json(data);
      break;
    case "PUT":
      await sleep(3000);
      const updatedRecord = req.body;
      const records = await readData();

      const recordIndex = records.findIndex(
        (record) => record.id === updatedRecord.id,
      );
      if (recordIndex > -1) {
        records[recordIndex] = updatedRecord;
        fs.writeFileSync(dataFilePath, JSON.stringify(records, null, 2));
        res.status(200).json(updatedRecord);
      } else {
        res.status(404).json({ message: "Record not found" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
