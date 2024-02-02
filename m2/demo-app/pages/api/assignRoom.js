// Import the fs module to interact with the file system
import fs from 'fs';
import path from 'path';

// Define the path to the file where the message will be stored
const messageFilePath = path.join(process.cwd(), 'message.txt');

export default function handler(req, res) {
  // Handle PUT request
  if (req.method === 'PUT') {
    // Extract the message from the request body
    const { message } = req.body;

    // Validate input
    if (typeof message !== 'string') {
      return res.status(400).json({ error: 'Message must be a string.' });
    }

    // Write the message to a local file asynchronously
    fs.writeFile(messageFilePath, message, (err) => {
      if (err) {
        // If an error occurs, return a server error
        return res.status(500).json({ error: 'Failed to store the message.' });
      }

      // If the message is successfully written, respond with the stored message
      res.status(200).json({ message });
    });
  } else if (req.method === 'GET') {
    // Read the message from the file asynchronously
    fs.readFile(messageFilePath, 'utf8', (err, data) => {
      if (err) {
        // If an error occurs or the file doesn't exist, return a default message
        return res.status(200).json({ message: 'Unassigned' });
      }

      // If the message is successfully read, respond with the message
      res.status(200).json({ message: data });
    });
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
