async function search(query) {
    const res = await fetch("http://localhost:3000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    });

    return res.text(); // get raw HTML from backend
}

async function showResults(query) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<p>Results for: <strong>${query}</strong></p>`;

    try {
        const html = await search(query);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Grab all <a> tags that contain <h3> (Google result links)
        const links = Array.from(doc.querySelectorAll('a h3')).map(h3 => {
            const a = h3.closest('a');
            return { title: h3.textContent, url: a.href };
        });

        if (links.length === 0) {
            resultsDiv.innerHTML += "<p>No results found.</p>";
            return;
        }

        links.forEach(r => {
            const div = document.createElement("div");
            div.className = "result";
            div.innerHTML = `
                <div class="title"><a href="${r.url}" target="_blank">${r.title}</a></div>
                <div class="url">${r.url}</div>
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
