/* ============================================================
   HAND HYGIENE PORTAL — module.js
   Shared script for all Module pages (module1–3.html)
   ============================================================ */

/* ── READING PROGRESS BAR ── */
const progressFill = document.getElementById('progressFill');
const progressPct  = document.getElementById('progressPct');

function updateProgress() {
  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const pct          = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
  const clamped      = Math.min(pct, 100);

  progressFill.style.width = clamped + '%';
  progressPct.textContent  = clamped + '%';
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();


/* ── TABLE OF CONTENTS — ACTIVE LINK HIGHLIGHT ── */
const tocLinks   = document.querySelectorAll('.toc-list a');
const sections   = document.querySelectorAll('.content-section');

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      tocLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, {
  rootMargin: '-30% 0px -60% 0px',
  threshold: 0
});

sections.forEach(s => tocObserver.observe(s));


/* ── SCROLL REVEAL for content cards ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity  = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.icon-card, .step-item, .info-box, .content-table').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});
