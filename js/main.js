const dummyResults = [
    {title: "PixelSearch Official Site", url: "#", snippet: "Welcome to PixelSearch 2.0 by 7173 STUDIOS."},
    {title: "Pixelium Browser", url: "#", snippet: "Check out the Pixelium browser—customized just for you."},
    {title: "7173 STUDIOS", url: "#", snippet: "7173 STUDIOS official page with games, apps, and tools."}
];

function showResults(query) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<p>Showing results for: <strong>${query}</strong></p>`;

    dummyResults.forEach(result => {
        if(result.title.toLowerCase().includes(query.toLowerCase()) || result.snippet.toLowerCase().includes(query.toLowerCase())){
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `
                <div class="title"><a href="${result.url}">${result.title}</a></div>
                <div class="url">${result.url}</div>
                <div class="snippet">${result.snippet}</div>
            `;
            resultsDiv.appendChild(div);
        }
    });
}

// Run when search.html loads
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if(query) showResults(query);
};
