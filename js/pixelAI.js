document.getElementById("pixelAI-submit").addEventListener("click", async () => {
    const input = document.getElementById("pixelAI-input").value;
    const responseDiv = document.getElementById("pixelAI-response");

    if(!input) return;

    const res = await fetch("http://localhost:3000/pixelai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input })
    });

    const data = await res.json();
    responseDiv.innerHTML = `<p>${data.response}</p>`;
});
