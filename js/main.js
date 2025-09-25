async function search(query) {
    const res = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });
    const html = await res.text();
    return html;
}

async function showResults(query) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<p>Results for: <strong>${query}</strong></p>`;

    try {
        const html = await search(query);

        // Simple parsing: get <h3> titles and their links
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const titles = doc.querySelectorAll('h3');

        if (titles.length === 0) {
            resultsDiv.innerHTML += "<p>No results found.</p>";
            return;
        }

        titles.forEach(h3 => {
            const link = h3.closest('a')?.href || "#";
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `
                <div class="title"><a href="${link}" target="_blank">${h3.textContent}</a></div>
                <div class="url">${link}</div>
            `;
            resultsDiv.appendChild(div);
        });
    } catch (e) {
        resultsDiv.innerHTML += "<p>Error fetching results.</p>";
        console.error(e);
    }
}

// Run when search.html loads
window.onload = () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q') || '';
    if(query) showResults(query);
};
