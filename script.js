// ========== NAVBAR ==========
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("open");
  })
);

// ========== SCROLL REVEAL ==========
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

reveals.forEach((el) => revealObserver.observe(el));

// ========== CONTACT FORM ==========
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

const EMAILJS_SERVICE_ID = "service_9qpyzak";
const EMAILJS_TEMPLATE_ID = "template_ixa6lxh";
const EMAILJS_PUBLIC_KEY = "3tAtLVvS7kCP8bou_";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  status.textContent = "Sending...";
  status.style.color = "var(--accent-2)";

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: name,
        from_email: email,
        message,
        reply_to: email,
      },
      { publicKey: EMAILJS_PUBLIC_KEY }
    );

    status.textContent = `Thanks, ${name}! Your message has been sent. I'll get back to you soon.`;
    status.style.color = "#059669";
    form.reset();
  } catch (err) {
    status.textContent = (err && err.text) || "Something went wrong. Please try again.";
    status.style.color = "#db2777";
  }

  setTimeout(() => (status.textContent = ""), 6000);
});

// ========== SMOOTH SCROLL OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    const id = anchor.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 20;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

// ========== CURSOR GLOW ==========
const glow = document.getElementById("cursorGlow");
const finePointer = window.matchMedia("(pointer: fine)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (glow && finePointer && !reducedMotion) {
  let tx = window.innerWidth / 2;
  let ty = window.innerHeight / 3;
  let x = tx;
  let y = ty;

  window.addEventListener("pointermove", (e) => {
    tx = e.clientX;
    ty = e.clientY;
    glow.style.opacity = 1;
  });

  (function tick() {
    x += (tx - x) * 0.08;
    y += (ty - y) * 0.08;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(tick);
  })();
}

// ========== STAT COUNT-UP ==========
const counters = document.querySelectorAll(".stat-number[data-count]");
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 900;
        const start = performance.now();

        (function frame(now) {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(eased * target)}${suffix}`;
          if (p < 1) requestAnimationFrame(frame);
        })(start);

        countObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.6 }
);
counters.forEach((el) => countObserver.observe(el));

// ========== SCROLLSPY ==========
const spySections = document.querySelectorAll("section[id]");
const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.querySelectorAll("a").forEach((a) =>
        a.classList.toggle(
          "active",
          a.getAttribute("href") === `#${entry.target.id}`
        )
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
spySections.forEach((s) => spyObserver.observe(s));
