/* -----------------------------------------------------
    CONTACT FORM (FormSubmit with loading animation)
------------------------------------------------------ */
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();  

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const loader = submitBtn.querySelector(".loader");
  const status = document.getElementById("formStatus");

  // UI: loading state
  loader.style.display = "inline-block";
  btnText.textContent = "Sending...";
  submitBtn.disabled = true;
  status.textContent = "";

  try {
    const formData = new FormData(this);

    const response = await fetch(this.action, {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      status.style.color = "rgb(0, 200, 120)";
      status.textContent = "Message sent successfully!";
      this.reset();
    } else {
      throw new Error("Failed");
    }
  } catch (err) {
    status.style.color = "rgb(255, 90, 90)";
    status.textContent = "Message failed to send. Try again.";
  }

  loader.style.display = "none";
  btnText.textContent = "Send message";
  submitBtn.disabled = false;
});

/* CLEAR FORM BUTTON */
document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("contactForm").reset();
  document.getElementById("formStatus").textContent = "";
});


/* -----------------------------------------------------
    TYPING TEXT (Hero Section – rotating phrases)
------------------------------------------------------ */
const phrases = [
  "Build Something Legendary",
  "Create Premium Designs",
  "Bring Ideas To Life",
  "Make Digital Experiences Stand Out"
];

const typingEl = document.querySelector(".typing-text");
let phraseIndex = 0;

function typePhrase() {
  typingEl.style.width = "0";
  typingEl.textContent = phrases[phraseIndex];

  // Restart animation
  typingEl.style.animation = "none";
  void typingEl.offsetWidth; 
  typingEl.style.animation = "typing 3s steps(30) forwards, blink .7s infinite";

  phraseIndex = (phraseIndex + 1) % phrases.length;
}

typePhrase();
setInterval(typePhrase, 4000);


/* -----------------------------------------------------
    YEAR AUTO UPDATE
------------------------------------------------------ */
document.getElementById('year').textContent = new Date().getFullYear();


/* -----------------------------------------------------
    MOBILE MENU TOGGLE
------------------------------------------------------ */
const hambtn = document.getElementById("hambtn");
const mobileMenu = document.getElementById("mobileMenu");

hambtn.addEventListener("click", () => {
  if (mobileMenu.style.display === "flex") {
    mobileMenu.style.display = "none";
  } else {
    mobileMenu.style.display = "flex";
  }
});

/* -----------------------------------------------------
    SMOOTH SCROLL FOR NAV LINKS
------------------------------------------------------ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');

    if (target.length > 1) {
      e.preventDefault();
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Auto-close mobile menu
    if (window.innerWidth <= 640) {
      mobileMenu.style.display = 'none';
      menuBtn.setAttribute('aria-expanded','false');
    }
  });
});


/* -----------------------------------------------------
    TYPEWRITER #2 (small text somewhere else)
------------------------------------------------------ */
(function(){
  const phrases = [
    'premium interfaces',
    'fast & accessible sites',
    'delightful animations',
    'clean UX'
  ];

  const el = document.getElementById('typed');
  let pi = 0, ch = 0, forward = true;

  function step() {
    const p = phrases[pi];

    if (forward) {
      ch++;
      el.textContent = p.slice(0, ch);
      if (ch === p.length) {
        forward = false;
        setTimeout(step, 1000);
        return;
      }
    } else {
      ch--;
      el.textContent = p.slice(0, ch);
      if (ch === 0) {
        forward = true;
        pi = (pi + 1) % phrases.length;
      }
    }
    setTimeout(step, forward ? 60 : 28);
  }

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!(mq && mq.matches)) step();
  else el.textContent = phrases[0];
})();


/* -----------------------------------------------------
    PROJECT LINKS FALLBACK
------------------------------------------------------ */
document.querySelectorAll('.proj-links a').forEach(a => {
  if (a.getAttribute('href') === '#') {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Replace this with your project link (Live demo or GitHub).');
    });
  }
});
