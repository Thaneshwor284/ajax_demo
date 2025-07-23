const form = document.getElementById("greet-form");
const nameInput = document.getElementById("name-input");
const responseBox = document.getElementById("response");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const style     = e.submitter.value;           // "nice"  |  "hate"
  const endpoint  = style === "hate" ? "/api/hate" : "/api/greet";

  // Build the request body
  const data = { name: nameInput.value };

  try {
    // POST to FastAPI
    const res = await fetch(`https://ajax-demo-crf1.vercel.app${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    responseBox.textContent = json.message;   // “Hello, …!”
  } catch (err) {
    responseBox.textContent = "Server unreachable 😢";
    console.error(err);
  }
});