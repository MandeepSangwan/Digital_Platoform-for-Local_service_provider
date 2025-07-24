const API = "/api";


// Registration
const regForm = document.getElementById("registerForm");
if (regForm) {
  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
      service: document.getElementById("service").value,
      contact: document.getElementById("contact").value
    };
    await fetch(`${API}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Provider Registered!");
    regForm.reset();
  });
}

// Booking
const bookingForm = document.getElementById("bookingForm");
if (bookingForm) {
  bookingForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      customer: document.getElementById("customer").value,
      service: document.getElementById("service").value,
      date: document.getElementById("date").value
    };
    await fetch(`${API}/booking`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Booking Successful!");
    bookingForm.reset();
  });
}

// Feedback
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      user: document.getElementById("user").value,
      feedback: document.getElementById("feedbackText").value
    };
    await fetch(`${API}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert("Feedback Submitted!");
    feedbackForm.reset();
  });
}

// Admin Dashboard
const adminDiv = document.getElementById("adminData");
if (adminDiv) {
  fetch(`${API}/admin-data`)
    .then(res => res.json())
    .then(data => {
      adminDiv.innerHTML = `
        <h2>Providers</h2><pre>${JSON.stringify(data.providers, null, 2)}</pre>
        <h2>Bookings</h2><pre>${JSON.stringify(data.bookings, null, 2)}</pre>
        <h2>Feedback</h2><pre>${JSON.stringify(data.feedback, null, 2)}</pre>
      `;
    });
}
// Admin Login
const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true");
      alert("Login successful!");
      window.location.href = "admin.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// Check if admin is logged in before loading admin.html
const adminPage = window.location.pathname.includes("admin.html");
if (adminPage && localStorage.getItem("adminLoggedIn") !== "true") {
  window.location.href = "admin-login.html";
}
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn");
    alert("Logged out successfully!");
    window.location.href = "admin-login.html";
  });
}
  