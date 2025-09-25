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

    // Simple AI: basic responses
    let response = '';
    if(query.toLowerCase().includes('hello')){
        response = "Hello! I'm PixelAI, your 7173 STUDIOS assistant.";
    } else if(query.toLowerCase().includes('pixelium')){
        response = "Pixelium is your custom browser!";
    } else {
        response = `PixelAI received: "${query}"`;
    }

    res.json({ response });
});

app.listen(PORT, () => console.log(`PixelAI server running at http://localhost:${PORT}`));
