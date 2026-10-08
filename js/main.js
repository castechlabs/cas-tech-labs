const menuButton = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));
}

const form = document.querySelector("#contact-form");
const statusEl = document.querySelector("#form-status");
if (form && statusEl) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.textContent = "Sending...";
    statusEl.className = "status";
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to send your message.");
      form.reset();
      statusEl.textContent = "Thank you. Your message has been sent to CAS Tech Labs.";
      statusEl.className = "status success";
    } catch (err) {
      statusEl.textContent = err.message || "Unable to send your message. Please email hr@castechlabs.com.";
      statusEl.className = "status error";
    }
  });
}