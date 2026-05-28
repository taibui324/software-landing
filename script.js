const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

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

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

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
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion) {
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

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
});
