/**
 * Lewis Apartments — shared includes loader
 * Injects nav.html + footer.html into every page.
 * data-root on <html> controls the path prefix (set per page).
 */
(function () {
  // base href handles path resolution — just use relative paths
  const root = '';

  function loadInclude(url, targetId, cb) {
    fetch(url)
      .then(r => r.text())
      .then(html => {
        const el = document.getElementById(targetId);
        if (!el) return;
        el.innerHTML = html;
        if (cb) cb();
      })
      .catch(e => console.warn('Include failed:', url, e));
  }

  function initNav() {
    const nav = document.getElementById('nav');
    const bar = document.getElementById('announce-bar');
    const ham = document.getElementById('nav-ham');
    const mob = document.getElementById('nav-mob');
    if (!nav) return;

    /* Scroll state */
    function onScroll() {
      const y = window.scrollY;
      nav.classList.toggle('scrolled', y > 60);
      if (y > 36) {
        bar && bar.classList.add('hidden');
        nav.classList.add('bar-hidden');
      } else {
        bar && bar.classList.remove('hidden');
        nav.classList.remove('bar-hidden');
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Hamburger / mobile menu */
    if (ham && mob) {
      ham.addEventListener('click', () => {
        const open = ham.classList.toggle('open');
        ham.setAttribute('aria-expanded', open);
        mob.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mob.querySelectorAll('a').forEach(a =>
        a.addEventListener('click', () => {
          ham.classList.remove('open');
          mob.classList.remove('open');
          document.body.style.overflow = '';
        })
      );
    }

    /* Active state on nav links */
    const path = window.location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.nav-links a, .nav-mob a').forEach(a => {
      try {
        const aPath = new URL(a.href).pathname.replace(/\/$/, '') || '/';
        if (aPath !== '/' && path.startsWith(aPath)) {
          a.classList.add('nav-active');
          a.closest('li')?.classList.add('nav-active');
        }
      } catch {}
    });
  }

  /* Community tabs — used on our-communities page */
  window.switchTab = function (id, el) {
    document.querySelectorAll('.tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    el.classList.add('active');
    el.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + id).classList.add('active');
  };

  /* Filter function — used on communities page */
  window.filterCommunities = function (state, location, type) {
    document.querySelectorAll('.c-card[data-state]').forEach(card => {
      const matchState    = !state    || card.dataset.state === state;
      const matchLocation = !location || card.dataset.location === location;
      const matchType     = !type     || card.dataset.type === type;
      card.style.display  = (matchState && matchLocation && matchType) ? '' : 'none';
    });
    // Update count
    const visible = document.querySelectorAll('.c-card[data-state]:not([style*="none"])').length;
    const countEl = document.getElementById('results-count');
    if (countEl) countEl.textContent = visible + ' communities';
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadInclude(root + 'includes/nav.html',    'nav-include', initNav);
    loadInclude(root + 'includes/footer.html', 'footer-include');
  });
})();
