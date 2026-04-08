/* =========================================
   PORTFOLIO — main.js
   ========================================= */

"use strict";

/* ---- CUSTOM CURSOR ---- */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  if (!cursor || !dot) return;

  let mx = -100, my = -100;
  let cx = -100, cy = -100;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  function animateCursor() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();

/* ---- NAVBAR SCROLL ---- */
(function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 40);
  }, { passive: true });

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    menu.classList.toggle("open");
    document.body.style.overflow = menu.classList.contains("open") ? "hidden" : "";
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      toggle.classList.remove("open");
      menu.classList.remove("open");
      document.body.style.overflow = "";
    });
  });
})();

/* ---- TYPEWRITER EFFECT ---- */
(function initTypewriter() {
  const el = document.getElementById("typeText");
  if (!el) return;

  const phrases = [
    "Fullstack Developer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
    "Coffee Addict ☕",
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pause = false;

  function type() {
    const current = phrases[phraseIdx];

    if (pause) {
      setTimeout(type, 1200);
      pause = false;
      return;
    }

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        pause = true;
        deleting = true;
      }
      setTimeout(type, 75);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
      setTimeout(type, 35);
    }
  }

  type();
})();

/* ---- ANIMATED GRID CANVAS ---- */
(function initGrid() {
  const canvas = document.getElementById("gridCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let w, h, cols, rows;
  let mouse = { x: -999, y: -999 };
  const CELL = 60;
  let animId;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    cols = Math.ceil(w / CELL) + 1;
    rows = Math.ceil(h / CELL) + 1;
  }

  window.addEventListener("resize", resize, { passive: true });
  resize();

  document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * CELL;
        const y = r * CELL;
        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;
        const opacity = dist < maxDist
          ? 0.08 + 0.12 * (1 - dist / maxDist)
          : 0.04;

        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(127,255,110,${opacity})`;
        ctx.fill();
      }
    }

    // Horizontal lines
    for (let r = 0; r < rows; r++) {
      const y = r * CELL;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    // Vertical lines
    for (let c = 0; c < cols; c++) {
      const x = c * CELL;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.strokeStyle = "rgba(255,255,255,0.025)";
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }

    animId = requestAnimationFrame(draw);
  }

  draw();
})();

/* ---- COUNTER ANIMATION ---- */
(function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-target]");
  if (!nums.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const dur = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  nums.forEach(n => obs.observe(n));
})();

/* ---- SKILL BARS ---- */
(function initSkillBars() {
  const bars = document.querySelectorAll(".bar-fill[data-w]");
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.w + "%";
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => obs.observe(b));
})();

/* ---- SCROLL REVEAL ---- */
(function initReveal() {
  const targets = [
    ".skill-card",
    ".project-card",
    ".about-grid",
    ".contact-wrap",
    ".section-title"
  ];

  const elements = document.querySelectorAll(targets.join(","));
  elements.forEach(el => el.classList.add("reveal"));

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -60px 0px" });

  elements.forEach(el => obs.observe(el));
})();

/* ---- CONTACT FORM ---- */
(function initForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form || !success) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector("button[type='submit']");
    btn.textContent = "enviando...";
    btn.disabled = true;

    // Simulate async send
    setTimeout(() => {
      form.reset();
      btn.textContent = "gửi tin nhắn →";
      btn.disabled = false;
      success.classList.add("show");
      setTimeout(() => success.classList.remove("show"), 4000);
    }, 1200);
  });
})();

/* ---- ACTIVE NAV HIGHLIGHT ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(link => {
          link.style.color = link.getAttribute("href") === `#${id}`
            ? "var(--accent)"
            : "";
        });
      }
    });
  }, { rootMargin: "-40% 0px -40% 0px" });

  sections.forEach(s => obs.observe(s));
})();

/* ---- SMOOTH LINK SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
