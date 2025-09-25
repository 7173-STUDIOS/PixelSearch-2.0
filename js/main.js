async function search(query) {
    const res = await fetch("http://localhost:3000/search", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ query: input })
});

    return res.json(); // structured data
}

async function showResults(query) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<p>Results for: <strong>${query}</strong></p>`;

    try {
        const data = await search(query);
        const searchResults = data.organic_results || [];

        if(searchResults.length === 0){
            resultsDiv.innerHTML += "<p>No results found.</p>";
            return;
        }

        searchResults.forEach(r => {
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `
                <div class="title"><a href="${r.link}" target="_blank">${r.title}</a></div>
                <div class="url">${r.link}</div>
                <div class="snippet">${r.snippet || ''}</div>
            `;
            resultsDiv.appendChild(div);
        });
    } catch (e) {
        resultsDiv.innerHTML += "<p>Error fetching results.</p>";
        console.error(e);
    }
}
