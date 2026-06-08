// Auto-sliding image carousel (about page header)
(function () {
  const track = document.querySelector('.slideshow__track');
  if (!track) return;
  const count = track.children.length;
  let current = 0;
  setInterval(() => {
    current = (current + 1) % count;
    track.style.transform = `translateX(-${current * 100}%)`;
  }, 2000);
})();

// Staggered pillar card entrance
(function () {
  const stack = document.querySelector('.pillars__stack');
  if (!stack) return;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { stack.classList.add('is-visible'); obs.disconnect(); }
  }, { threshold: 0.2 });
  obs.observe(stack);
})();

// Board generation tabs
(function () {
  const tabs = document.querySelectorAll('.team-tab');
  const gens = document.querySelectorAll('.team-gen');
  if (!tabs.length) return;
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
      gens.forEach(g => g.classList.remove('is-active'));
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      document.getElementById('gen-' + tab.dataset.gen)?.classList.add('is-active');
    });
  });
})();

// Count-up animation for hero stats
(function () {
  const statsEl = document.querySelector('.hero__stats');
  if (!statsEl) return;

  const counters = Array.from(statsEl.querySelectorAll('strong')).map(el => {
    const text = el.textContent.trim();
    return { el, target: parseInt(text, 10), suffix: text.replace(/\d/g, '') };
  });

  const run = () => {
    // Lock each number's width at its final value before counting from 0
    counters.forEach(({ el }) => {
      el.style.display = 'inline-block';
      el.style.minWidth = el.getBoundingClientRect().width + 'px';
    });

    const duration = 1000;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      counters.forEach(({ el, target, suffix }) => {
        el.textContent = Math.floor(eased * target) + suffix;
      });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { run(); obs.disconnect(); }
  }, { threshold: 0.4 });
  obs.observe(statsEl);
})();

// Newsletter form stub (no backend).
document.getElementById('newsletter')?.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks! (Newsletter is a visual stub for now.)');
});

// Floating event popup — auto-dismisses when the countdown bar finishes.
(function () {
  const EVENT_ID = 'spring-career-kickoff-2026';
  const pop = document.getElementById('eventpop');
  const closeBtn = document.getElementById('eventpopClose');
  const timerFill = document.getElementById('eventpopTimer');
  if (!pop || !closeBtn || !timerFill) return;

  const dismissedKey = 'cscareers:eventpop:dismissed';

  // If the user dismissed this specific event before, never show it.
  try {
    if (localStorage.getItem(dismissedKey) === EVENT_ID) {
      pop.classList.add('is-gone');
      return;
    }
  } catch (_) {}

  const hide = (rememberDismiss) => {
    pop.classList.add('is-hidden');
    // Remove from layout after the transition so it can't be tabbed to.
    setTimeout(() => pop.classList.add('is-gone'), 400);
    if (rememberDismiss) {
      try { localStorage.setItem(dismissedKey, EVENT_ID); } catch (_) {}
    }
  };

  // Manual close
  closeBtn.addEventListener('click', () => hide(true));

  // Auto-hide when the timer bar animation ends.
  timerFill.addEventListener('animationend', (e) => {
    if (e.animationName === 'timerShrink') hide(false);
  });

  // Pause timer on hover so users who are reading it don't lose it.
  pop.addEventListener('mouseenter', () => {
    timerFill.style.animationPlayState = 'paused';
  });
  pop.addEventListener('mouseleave', () => {
    timerFill.style.animationPlayState = 'running';
  });
})();
