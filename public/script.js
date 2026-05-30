const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function getSavedTheme() {
  try {
    return localStorage.getItem("orca-theme");
  } catch (_) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("orca-theme", theme);
  } catch (_) {}
}

if (menuButton && mobileNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      mobileNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const navLinks = Array.from(document.querySelectorAll(".desktop-nav a, .mobile-nav a"));
const navTargets = navLinks
  .map((link) => document.querySelector(link.getAttribute("href") ?? ""))
  .filter(Boolean);

function updateActiveNav() {
  const offset = window.scrollY + 120;
  let activeId = "top";

  for (const target of navTargets) {
    if (target.offsetTop <= offset) {
      activeId = target.id;
    }
  }

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("hashchange", updateActiveNav);
updateActiveNav();

function setTheme(theme) {
  const isDark = theme === "dark";

  if (isDark) {
    root.dataset.theme = "dark";
  } else {
    root.removeAttribute("data-theme");
  }

  themeToggle?.setAttribute("aria-pressed", String(isDark));
  themeToggle?.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  saveTheme(isDark ? "dark" : "light");
}

setTheme(getSavedTheme() === "dark" ? "dark" : "light");

themeToggle?.addEventListener("click", () => {
  setTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}

if (!prefersReducedMotion) {
  document.querySelectorAll("[data-rotator]").forEach((element) => {
    const words = element.getAttribute("data-words")?.split("|").filter(Boolean) ?? [];
    if (words.length < 2) return;

    let index = 0;
    window.setInterval(() => {
      element.classList.add("is-changing");
      window.setTimeout(() => {
        index = (index + 1) % words.length;
        element.textContent = words[index];
        element.classList.remove("is-changing");
      }, 180);
    }, 2600);
  });
}


const codeGenerator = document.querySelector("[data-code-generator]");
const generatedCode = [
  "const workflow = await orca.discover({",
  "  team: \"operations\",",
  "  bottleneck: \"manual handoffs\"",
  "});",
  "",
  "const automation = ai.build({",
  "  inputs: workflow.steps,",
  "  output: \"internal tool\"",
  "});",
  "",
  "await orca.ship(automation);"
].join("\n");

if (codeGenerator) {
  if (prefersReducedMotion) {
    codeGenerator.textContent = generatedCode;
  } else {
    let index = 0;

    const typeCode = () => {
      codeGenerator.textContent = generatedCode.slice(0, index);
      index += 1;

      if (index <= generatedCode.length) {
        window.setTimeout(typeCode, index % 24 === 0 ? 160 : 28);
        return;
      }

      window.setTimeout(() => {
        index = 0;
        typeCode();
      }, 2400);
    };

    typeCode();
  }
}

const testimonialCards = Array.from(document.querySelectorAll("[data-testimonial-card]"));
const testimonialDots = Array.from(document.querySelectorAll("[data-testimonial-dot]"));
const testimonialPrev = document.querySelector("[data-testimonial-prev]");
const testimonialNext = document.querySelector("[data-testimonial-next]");

if (testimonialCards.length > 0) {
  let testimonialIndex = testimonialCards.findIndex((card) => card.classList.contains("is-active"));
  testimonialIndex = testimonialIndex < 0 ? 0 : testimonialIndex;

  const updateTestimonials = () => {
    testimonialCards.forEach((card, index) => {
      card.classList.remove("is-active", "testimonial-featured", "testimonial-side", "testimonial-left", "testimonial-right");

      const offset = (index - testimonialIndex + testimonialCards.length) % testimonialCards.length;
      if (offset === 0) {
        card.classList.add("is-active", "testimonial-featured");
      } else if (offset === 1) {
        card.classList.add("testimonial-side", "testimonial-right");
      } else {
        card.classList.add("testimonial-side", "testimonial-left");
      }
    });

    testimonialDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === testimonialIndex);
    });
  };

  testimonialPrev?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonials();
  });

  testimonialNext?.addEventListener("click", () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    updateTestimonials();
  });

  updateTestimonials();
}

const contactForm = document.querySelector(".contact-form");
const contactStatus = contactForm?.querySelector(".form-status");
const contactButton = contactForm?.querySelector('button[type="submit"]');
const contactSubmissionId = contactForm?.querySelector('input[name="submissionId"]');
const contactButtonLabel = contactButton?.textContent ?? "Send Project Note";

function refreshSubmissionId() {
  if (!contactSubmissionId) return;

  if (window.crypto?.randomUUID) {
    contactSubmissionId.value = window.crypto.randomUUID();
    return;
  }

  contactSubmissionId.value = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function setContactStatus(message, type = "") {
  if (!contactStatus) return;

  contactStatus.textContent = message;
  contactStatus.classList.toggle("is-error", type === "error");
  contactStatus.classList.toggle("is-success", type === "success");
}

refreshSubmissionId();

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    setContactStatus("Please complete the required fields.", "error");
    return;
  }

  const formData = new FormData(contactForm);
  const payload = {
    submissionId: String(formData.get("submissionId") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
    website: String(formData.get("website") ?? "")
  };

  contactButton?.setAttribute("disabled", "disabled");
  if (contactButton) contactButton.textContent = "Sending...";
  setContactStatus("Sending your project note...");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || "Email could not be sent.");
    }

    contactForm.reset();
    refreshSubmissionId();
    setContactStatus("Thanks. Your project note has been sent.", "success");
  } catch (error) {
    setContactStatus(error.message || "Email could not be sent. Please try again.", "error");
  } finally {
    contactButton?.removeAttribute("disabled");
    if (contactButton) contactButton.textContent = contactButtonLabel;
  }
});
