// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const app = express();
const port = 3000;

app.use(express.json());

let leaderboard = [];

app.post('/submit', (req, res) => {
    const { name, score } = req.body;
    leaderboard.push({ name, score });

    // Write to Excel
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(leaderboard);
    xlsx.utils.book_append_sheet(wb, ws, 'Leaderboard');
    xlsx.writeFile(path.join(__dirname, 'leaderboard.xlsx'), wb);

    res.send('Data recorded');
});

app.get('/leaderboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'leaderboard.xlsx'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
