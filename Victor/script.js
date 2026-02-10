/* =====================================================
   CONTACT FORM (FormSubmit + Loading Animation)
===================================================== */
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn?.querySelector(".btn-text");
    const loader = submitBtn?.querySelector(".loader");
    const status = document.getElementById("formStatus");

    if (loader) loader.style.display = "inline-block";
    if (btnText) btnText.textContent = "Sending...";
    if (submitBtn) submitBtn.disabled = true;
    if (status) status.textContent = "";

    try {
      const formData = new FormData(this);

      const response = await fetch(this.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (response.ok) {
        if (status) {
          status.style.color = "rgb(0,200,120)";
          status.textContent = "Message sent successfully!";
        }
        this.reset();
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      if (status) {
        status.style.color = "rgb(255,90,90)";
        status.textContent = "Message failed. Try again.";
      }
    }

    if (loader) loader.style.display = "none";
    if (btnText) btnText.textContent = "Send message";
    if (submitBtn) submitBtn.disabled = false;
  });
}

/* CLEAR FORM */
const clearBtn = document.getElementById("clearBtn");
if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    contactForm?.reset();
    const status = document.getElementById("formStatus");
    if (status) status.textContent = "";
  });
}

/* =====================================================
   HERO TYPING TEXT
===================================================== */
const typingEl = document.querySelector(".typing-text");
const phrases = [
  "Build Something Legendary",
  "Create Premium Designs",
  "Bring Ideas To Life",
  "Make Digital Experiences Stand Out"
];

let phraseIndex = 0;

function typePhrase() {
  if (!typingEl) return;

  typingEl.style.width = "0";
  typingEl.textContent = phrases[phraseIndex];

  typingEl.style.animation = "none";
  void typingEl.offsetWidth;
  typingEl.style.animation =
    "typing 3s steps(30) forwards, blink .7s infinite";

  phraseIndex = (phraseIndex + 1) % phrases.length;
}

if (typingEl) {
  typePhrase();
  setInterval(typePhrase, 4000);
}

/* =====================================================
   YEAR AUTO UPDATE
===================================================== */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =====================================================
   MOBILE MENU TOGGLE
===================================================== */
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.style.display === "flex";
    mobileMenu.style.display = isOpen ? "none" : "flex";
    menuBtn.setAttribute("aria-expanded", String(!isOpen));
  });
}

/* =====================================================
   SMOOTH SCROLL + AUTO CLOSE MOBILE MENU
===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

    if (window.innerWidth <= 640 && mobileMenu) {
      mobileMenu.style.display = "none";
      menuBtn?.setAttribute("aria-expanded", "false");
    }
  });
});

/* =====================================================
   TYPEWRITER #2 (Small Text)
===================================================== */
(function () {
  const el = document.getElementById("typed");
  if (!el) return;

  const words = [
    "premium interfaces",
    "fast & accessible sites",
    "delightful animations",
    "clean UX"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let forward = true;

  function type() {
    const word = words[wordIndex];

    if (forward) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        forward = false;
        setTimeout(type, 1000);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        forward = true;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(type, forward ? 60 : 30);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reduceMotion.matches) type();
  else el.textContent = words[0];
})();

/* =====================================================
   PROJECT LINKS FALLBACK
===================================================== */
document.querySelectorAll(".proj-links a").forEach(link => {
  if (link.getAttribute("href") === "#") {
    link.addEventListener("click", e => {
      e.preventDefault();
      alert("Replace this with your project link (Live demo or GitHub).");
    });
  }
});
