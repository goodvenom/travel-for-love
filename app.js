/* ============ Travel for love — interactions ============ */
(() => {
  'use strict';
  const fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------- custom cursor ---------- */
  if (fine && !reduced) {
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    const label = ring.querySelector('.cursor-label');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    });
    (function loop() {
      rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16);
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const bindCursor = () => {
      document.querySelectorAll('[data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', () => {
          label.textContent = el.dataset.cursor;
          ring.classList.add('is-active');
        });
        el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
      });
      document.querySelectorAll('a, button, .btn').forEach(el => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-link'));
        el.addEventListener('mouseleave', () => ring.classList.remove('is-link'));
      });
    };
    bindCursor();
  }

  /* ---------- hero 3D parallax (cursor-driven) ---------- */
  const hero = document.querySelector('.hero');
  const scene = document.getElementById('heroScene');
  const title = document.getElementById('heroTitle');
  if (hero && fine && !reduced) {
    const layers = scene.querySelectorAll('[data-depth]');
    let tx = 0, ty = 0, cx = 0, cy = 0;
    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
    (function loop() {
      cx = lerp(cx, tx, 0.06); cy = lerp(cy, ty, 0.06);
      layers.forEach(l => {
        const d = parseFloat(l.dataset.depth);
        const s = l.dataset.scale ? ` scale(${l.dataset.scale})` : '';
        l.style.transform = `translate3d(${-cx * d * 900}px, ${-cy * d * 900}px, 0)${s}`;
      });
      // title tilts *toward* the cursor in 3D
      title.style.transform =
        `rotateY(${cx * 14}deg) rotateX(${-cy * 10}deg)`;
      requestAnimationFrame(loop);
    })();
  }

  /* ---------- magnetic buttons ---------- */
  if (fine && !reduced) {
    document.querySelectorAll('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.28}px, ${y * 0.28}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 3D tilt cards ---------- */
  if (fine && !reduced) {
    document.querySelectorAll('.tilt').forEach(card => {
      let raf = null;
      card.addEventListener('mousemove', e => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform =
            `perspective(1000px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-4px)`;
          raf = null;
        });
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ---------- scroll reveals ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach((en, i) => {
      if (en.isIntersecting) {
        en.target.style.transitionDelay = `${(i % 4) * 90}ms`;
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  /* ---------- animated counters ---------- */
  const cio = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, t0 = performance.now();
      const tick = t => {
        const p = Math.min((t - t0) / 1200, 1);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3)))).padStart(2, '0');
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));

  /* ---------- nav on scroll ---------- */
  const nav = document.getElementById('nav');
  addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', scrollY > 40);
  }, { passive: true });
})();
