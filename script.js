const certificates = [
  { title: "Claude Platform 101", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/01-claude-platform-101.png" },
  { title: "Claude Code 101", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/02-claude-code-101.png" },
  { title: "Claude Code in Action", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/03-claude-code-in-action.png" },
  { title: "AI Fluency for Builders", issuer: "Anthropic · CodePath.org", group: "anthropic", image: "/assets/certificates/04-ai-fluency-builders.png" },
  { title: "AI Fluency for Nonprofits", issuer: "Anthropic · GivingTuesday", group: "anthropic", image: "/assets/certificates/05-ai-fluency-nonprofits.png" },
  { title: "Teaching the AI Fluency Framework", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/06-teaching-ai-fluency-framework.png" },
  { title: "AI Fluency for Educators", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/07-ai-fluency-educators.png" },
  { title: "AI Fluency for Small Businesses", issuer: "Anthropic · PayPal", group: "anthropic", image: "/assets/certificates/08-ai-fluency-small-businesses.png" },
  { title: "AI Fluency for Students", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/09-ai-fluency-students.png" },
  { title: "AI Fluency: AI Capabilities & Limitations", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/10-ai-capabilities-limitations.png" },
  { title: "Introduction to Claude Cowork", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/11-introduction-claude-cowork.png" },
  { title: "Claude 101", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/12-claude-101.png" },
  { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", group: "anthropic", image: "/assets/certificates/13-ai-fluency-foundations.png" },
  { title: "Beginning C++ Programming - From Beginner to Beyond", issuer: "Udemy", group: "udemy", image: "/assets/certificates/14-udemy-cpp.png", detail: "Issued April 14, 2026 · 46 total hours · Certificate ID: UC-ec0ec1b1-3694-4433-9f95-3f930d926e01" },
  { title: "Java Programming with AI", issuer: "Unstop", group: "unstop", image: "/assets/certificates/15-unstop-java-ai.png" },
  { title: "Operating System (OS)", issuer: "Unstop", group: "unstop", image: "/assets/certificates/16-unstop-operating-system.png" }
];

const grid = document.querySelector("#certificate-grid");
const modal = document.querySelector("#certificate-modal");
const modalImage = document.querySelector("#certificate-image");
const modalTitle = document.querySelector("#certificate-title");
const modalIssuer = document.querySelector("#certificate-issuer");
const modalMeta = document.querySelector("#certificate-meta");

const readableGroup = { anthropic: "Anthropic", udemy: "Udemy", unstop: "Unstop" };

function buildCertificates() {
  grid.innerHTML = certificates.map((certificate, index) => `
    <button class="certificate-card reveal" type="button" data-index="${index}" data-group="${certificate.group}" aria-label="View ${certificate.title} certificate">
      <span class="certificate-thumb"><img src="${certificate.image}" alt="${certificate.title} certificate thumbnail" loading="lazy" /></span>
      <span class="certificate-meta">${readableGroup[certificate.group]}</span>
      <h3>${certificate.title}</h3>
      ${certificate.detail ? '<p class="certificate-detail">Issued April 2026</p>' : '<p class="certificate-detail">Original certificate</p>'}
      <span class="open-icon" aria-hidden="true">↗</span>
    </button>`).join("");

  document.querySelectorAll(".certificate-card").forEach((card) => {
    card.addEventListener("click", () => openCertificate(certificates[card.dataset.index]));
  });
}

function openCertificate(certificate) {
  modalTitle.textContent = certificate.title;
  modalIssuer.textContent = certificate.issuer;
  modalImage.src = certificate.image;
  modalImage.alt = `${certificate.title} original certificate`;
  modalMeta.textContent = certificate.detail || "Original supplied completion certificate.";
  modal.showModal();
}

document.querySelector(".close-modal").addEventListener("click", () => modal.close());
modal.addEventListener("click", (event) => {
  if (event.target === modal) modal.close();
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
    document.querySelectorAll(".certificate-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.group !== filter;
    });
  });
});

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  mobileMenu.hidden = isOpen;
});
mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
}));

buildCertificates();
document.querySelector("#year").textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

window.addEventListener("load", () => {
  window.setTimeout(() => document.body.classList.add("is-loaded"), 260);
});
