import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), "db.json");

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  if (req.method === "POST" && req.url === "/register") {
    const db = readDB();
    db.providers.push(req.body);
    writeDB(db);
    return res.status(200).json({ success: true, message: "Provider registered!" });
  }

  if (req.method === "POST" && req.url === "/booking") {
    const db = readDB();
    db.bookings.push(req.body);
    writeDB(db);
    return res.status(200).json({ success: true, message: "Booking created!" });
  }

  if (req.method === "POST" && req.url === "/feedback") {
    const db = readDB();
    db.feedback.push(req.body);
    writeDB(db);
    return res.status(200).json({ success: true, message: "Feedback submitted!" });
  }

  if (req.method === "GET" && req.url === "/admin-data") {
    return res.status(200).json(readDB());
  }

  res.status(404).json({ error: "Not Found" });
}
