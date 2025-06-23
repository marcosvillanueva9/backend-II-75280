document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const payload = {
    username: formData.get("username"),
    password: formData.get("password")
  };

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Error de login");
      return;
    }

    // Guardar JWT en cookie sin httpOnly
    document.cookie = `token=${data.token}; path=/`;

    // Mostrar cookie en consola
    console.log("document.cookie:", document.cookie);
  } catch (err) {
    console.error("Error:", err);
  }
});
