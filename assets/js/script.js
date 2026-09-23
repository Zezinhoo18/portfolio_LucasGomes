const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

// Filtres projets
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      if (filter === "all" || card.dataset.category === filter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Modales
const modalButtons = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");

function closeModal(modal) {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalButtons.forEach(button => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.modal);
    if (modal) {
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  });
});

modals.forEach(modal => {
  modal.querySelector(".modal-close").addEventListener("click", () => closeModal(modal));
  modal.querySelector(".modal-overlay").addEventListener("click", () => closeModal(modal));
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal.open").forEach(closeModal);
  }
});

// Apparition au scroll
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Navbar : lien actif
const sections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove("active"));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add("active");
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach(section => navObserver.observe(section));

// Année
document.getElementById("year").textContent = new Date().getFullYear();


// Mode clair / nuit
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeIcon) themeIcon.textContent = theme === "dark" ? "☀" : "☾";
  if (themeToggle) {
    const dark = theme === "dark";
    themeToggle.setAttribute("aria-label", dark ? "Activer le mode clair" : "Activer le mode nuit");
    themeToggle.title = dark ? "Mode clair" : "Mode nuit";
  }
}

const savedTheme = localStorage.getItem("portfolio-theme");
applyTheme(savedTheme === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("portfolio-theme", nextTheme);
  applyTheme(nextTheme);
});
