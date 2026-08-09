// ─── 1. NAVBAR SCROLL ───────────────────────────────────────────────
window.addEventListener("scroll", () => {
  const nav = document.getElementById("navbar");
  nav.style.borderBottomColor =
    window.scrollY > 50 ? "rgba(59,74,62,0.4)" : "rgba(59,74,62,0.2)";
});

// ─── 2. CANVAS PARTICLE SYSTEM ──────────────────────────────────────
(function () {
  const canvas = document.getElementById("particles-canvas");
  const section = document.getElementById("hero");
  const ctx = canvas.getContext("2d");
  let W, H, particles;
  const COUNT = 55;
  const MAX_DIST = 140;
  const GREEN = "57,255,155";

  function resize() {
    W = canvas.width = section.offsetWidth;
    H = canvas.height = section.offsetHeight;
  }

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: rand(0, W),
      y: rand(0, H),
      vx: rand(-0.25, 0.25),
      vy: rand(-0.25, 0.25),
      r: rand(1, 2.2),
      alpha: rand(0.15, 0.45),
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.12;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(${GREEN},${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    // Draw dots
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${GREEN},${p.alpha})`;
      ctx.fill();
    });
    // Update
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    resize();
    initParticles();
  });
  resize();
  initParticles();
  draw();
})();

// ─── 3. SCROLL REVEAL ───────────────────────────────────────────────
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();

// ─── 4. MAGNETIC BUTTONS ────────────────────────────────────────────
document.querySelectorAll(".mag-btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.18;
    const dy = (e.clientY - cy) * 0.18;
    btn.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// ─── 5. SMOOTH SCROLL ───────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ─── 6. MOBILE NAV TOGGLE ───────────────────────────────────────────────
(function () {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("mobile-menu");
  if (!toggle || !menu) return;

  function openMenu() {
    menu.style.transform = "translateY(0)";
    menu.style.opacity = "1";
    menu.style.pointerEvents = "auto";
    menu.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.classList.add("open");
  }
  function closeMenu() {
    menu.style.transform = "translateY(-100%)";
    menu.style.opacity = "0";
    menu.style.pointerEvents = "none";
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.classList.remove("open");
  }

  toggle.addEventListener("click", function () {
    toggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
  });

  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });
})();
