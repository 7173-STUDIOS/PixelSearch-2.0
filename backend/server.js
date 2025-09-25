app.post('/search', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                q: query,
                api_key: "YOUR_SCRAPERAPI_KEY",
                engine: "google"  // ensure JSON structured results
            }
        });

        res.json(response.data); // returns structured search results
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Search failed" });
    }
});
