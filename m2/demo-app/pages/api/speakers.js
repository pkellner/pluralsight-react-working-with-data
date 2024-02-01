// pages/api/speakers.js

let records = [{
  id: 1,
  speakerId: 1269,
  name: "Arun Gupta",
  roomName: "Ballroom"
}, {
  id: 2,
  speakerId: 1124,
  name: "Douglas Crockford",
  roomName: "Garden"
}, {
  id: 3,
  speakerId: 2920,
  name: "Ron Lichty",
  roomName: "Pavilion"
}, {
  id: 4,
  speakerId: 1530,
  name: "Tammy Baker",
  roomName: "Terrace"
}];

const rooms = ["Unassigned","Ballroom", "Garden", "Pavilion", "Terrace"];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      // Return the list of records
      res.status(200).json(records);
      break;

    case "PUT":
      const { id, speakerId, speakerName, roomName } = req.body;

      // Check if the record exists and update it
      const index = records.findIndex((record) => record.id === id);
      if (index > -1) {
        records[index] = { id, speakerId, name, roomName };
        res.status(200).json(records[index]);
      } else {
        // Or add a new record if it doesn't exist
        records.push({ id, speakerId, name, roomName });
        res.status(201).json(records[records.length - 1]);
      }
      break;

    default:
      // Handle any other HTTP methods
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
