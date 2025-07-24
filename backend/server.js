// backend/server.js
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const path = require("path");

// Serve all files from frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const DB_FILE = __dirname + "/db.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.post("/register", (req, res) => {
  const db = readDB();
  db.providers.push(req.body);
  writeDB(db);
  res.json({ success: true, message: "Provider registered!" });
});

app.post("/booking", (req, res) => {
  const db = readDB();
  db.bookings.push(req.body);
  writeDB(db);
  res.json({ success: true, message: "Booking created!" });
});

app.post("/feedback", (req, res) => {
  const db = readDB();
  db.feedback.push(req.body);
  writeDB(db);
  res.json({ success: true, message: "Feedback submitted!" });
});

app.get("/admin-data", (req, res) => {
  res.json(readDB());
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
