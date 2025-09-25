// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Dummy PixelAI endpoint
app.post('/pixelai', (req, res) => {
    const { query } = req.body;

    // Here you can replace this with a real AI API call
    const response = `PixelAI says: You asked "${query}". This is a placeholder response!`;

    res.json({ response });
});

// Start the server
app.listen(PORT, () => {
    console.log(`PixelAI server running at http://localhost:${PORT}`);

    app.get('/', (req, res) => {
  res.send('PixelAI server is running!');
});
