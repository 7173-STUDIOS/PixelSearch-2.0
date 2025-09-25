const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Replace with your ScraperAPI key
const SCRAPER_API_KEY = "YOUR_SCRAPERAPI_KEY";

// Search endpoint
app.post('/search', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios.get('https://api.scraperapi.com', {
            params: {
                api_key: SCRAPER_API_KEY,
                url: `https://www.google.com/search?q=${encodeURIComponent(query)}`
            }
        });

        // Send raw HTML back (ScraperAPI returns the page HTML)
        res.send(response.data);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Search failed" });
    }
});

// PixelAI endpoint (optional)
app.post('/pixelai', (req, res) => {
    const { query } = req.body;
    res.json({ response: `PixelAI received: "${query}"` });
});

app.listen(PORT, () => console.log(`PixelSearch & PixelAI server running at http://localhost:${PORT}`));
