// server.js
require('dotenv').config();  // load .env variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;

app.use(cors());
app.use(bodyParser.json());

// ==================
// PixelAI Endpoint
// ==================
app.post('/pixelai', (req, res) => {
    const { query } = req.body;
    // Dummy AI response; you can expand later
    let responseText = "";

    if (!query) responseText = "Please enter a query.";
    else if (query.toLowerCase().includes("hello")) responseText = "Hello! I'm PixelAI, your assistant.";
    else responseText = `PixelAI received: "${query}"`;

    res.json({ response: responseText });
});

// ==================
// Search Endpoint using ScraperAPI
// ==================
app.post('/search', async (req, res) => {
    const { query } = req.body;

    if (!query) return res.status(400).json({ error: "Query is required." });

    try {
        // Call ScraperAPI Google JSON endpoint
        const response = await axios.get('https://api.scraperapi.com', {
            params: {
                api_key: SCRAPER_API_KEY,
                url: `https://www.google.com/search?q=${encodeURIComponent(query)}&hl=en`,
                render: "false"  // don’t render JS, just get HTML
            }
        });

        // Send raw HTML for frontend parsing
        res.send(response.data);
    } catch (err) {
        console.error("Search error:", err.message);
        res.status(500).json({ error: "Search failed." });
    }
});

// ==================
// Test root
// ==================
app.get('/', (req, res) => {
    res.send("PixelSearch & PixelAI server is running!");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
