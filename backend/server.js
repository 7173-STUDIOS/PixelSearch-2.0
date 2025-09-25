app.post('/search', async (req, res) => {
    const { query } = req.body;

    try {
        const response = await axios.get('https://serpapi.com/search.json', {
            params: {
                q: query,
                const SCRAPER_API_KEY = "0903e6c63facdc6807e7c10b6f21ef4f"; // safe in backend
                engine: "google"  // ensure JSON structured results
            }
        });

        res.json(response.data); // returns structured search results
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Search failed" });
    }
});
