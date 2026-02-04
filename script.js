const form = document.getElementById("loginForm");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://api.auth.getlucid.lol/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      // Store JWT locally
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html"; // redirect to dashboard
    } else {
      errorEl.textContent = data.message;
      errorEl.classList.remove("hidden");
    }
  } catch (err) {
    errorEl.textContent = "Network error";
    errorEl.classList.remove("hidden");
  }
});
