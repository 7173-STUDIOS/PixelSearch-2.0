document.getElementById("pixelAI-submit").addEventListener("click", () => {
  const input = document.getElementById("pixelAI-input").value;
  const responseDiv = document.getElementById("pixelAI-response");

  // Dummy AI response
  responseDiv.innerHTML = `<p>PixelAI says: You asked "${input}". This is a placeholder response!</p>`;
});
