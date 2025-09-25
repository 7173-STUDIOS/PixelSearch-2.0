const res = await fetch("https://pixel-search-2-0.vercel.app/pixelai", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: input })
});
