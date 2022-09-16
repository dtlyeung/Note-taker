// Requires
const fs = require("fs");
const express = require("express");
const path = require("path");

// Ports 
const PORT = process.env.PORT ||3000;

// Express 
const app = express();

// Public directory
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Route - GET notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Route - Read db and return notes as JSON
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Route - Index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Add new notes to db
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("/db/db.json", "utf-8"))
    let noteLength = (noteList.length).toString();

    //
    newNote.id = noteLength;

    //
    noteList.push(newNote);

    //
    fs.writeFileSync("/db/db.json", JSON.stringify(noteList));
});

app.listen(PORT, () => console.log('Server listening on port' + PORT));




