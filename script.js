
// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a navigation link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navigationLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { rootMargin: "-25% 0px -60% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Automatically update the footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: open the visitor's email application
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject").trim() || "Portfolio contact";
  const message = formData.get("message").trim();

  // Replace this with your real email address.
  const recipient = "YOUR_EMAIL@example.com";

  if (recipient === "YOUR_EMAIL@example.com") {
    formNote.textContent =
      "Please add your real email address in script.js to enable message sending.";
    return;
  }

  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailtoURL =
    `mailto:${recipient}?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(body)}`;

  formNote.textContent = "Opening your email application...";
  window.location.href = mailtoURL;
});
