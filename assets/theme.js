// Inkcora Theme — assets/theme.js

// Scroll reveal
function initScrollReveal() {
  if (!window.IntersectionObserver) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el));
}

// Sticky header
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 48);
  }, { passive: true });
}

// Mobile nav
function initMobileNav() {
  const toggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
}

// Announcement bar countdown
function initCountdown() {
  const el = document.getElementById('ink-countdown');
  if (!el) return;
  function update() {
    const now = new Date();
    const friday = new Date(now);
    friday.setDate(now.getDate() + ((5 - now.getDay() + 7) % 7 || 7));
    friday.setHours(15, 0, 0, 0);
    const diff = friday - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    el.textContent = `(${h}h ${m}m)`;
  }
  update();
  setInterval(update, 60000);
}

// Social proof toasts
const TOASTS = [
  'A company in Boston just ordered 48 custom hoodies',
  'A Salem business requested a quote 2 minutes ago',
  'Order from Newburyport — 24 custom polos approved',
  'An agency in Cambridge shipped 200 tote bags',
];
let toastIdx = 0;
function showToast() {
  const el = document.createElement('div');
  el.style.cssText = 'position:fixed;bottom:100px;left:24px;z-index:500;background:#fff;border:1px solid var(--color-border);border-radius:10px;padding:14px 18px;box-shadow:0 8px 32px rgba(0,0,0,0.12);font-family:var(--font-body);font-size:13px;color:var(--color-text);max-width:280px;line-height:1.5;animation:slideInLeft 0.4s ease';
  el.innerHTML = `<div style="display:flex;align-items:center;gap:10px"><div style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0"></div>${TOASTS[toastIdx % TOASTS.length]}</div><div style="font-size:10px;color:var(--color-text-muted);margin-top:4px;letter-spacing:0.04em">JUST NOW · INKCORA.COM</div>`;
  document.body.appendChild(el);
  toastIdx++;
  setTimeout(() => el.remove(), 5000);
}

// Exit intent
let exitShown = false;
function initExitIntent() {
  if (window.Shopify && window.Shopify.designMode) return;
  document.addEventListener('mouseleave', e => {
    if (e.clientY < 10 && !exitShown) {
      exitShown = true;
      const overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:600;display:flex;align-items:center;justify-content:center';
      overlay.innerHTML = `<div style="background:#fff;border-radius:8px;padding:48px;max-width:480px;width:90%;text-align:center;position:relative"><button onclick="this.closest('#exit-overlay').remove()" style="position:absolute;top:16px;right:16px;background:none;border:none;cursor:pointer;font-size:22px;color:#999">x</button><div style="font-family:var(--font-heading);font-size:28px;font-weight:600;margin-bottom:12px">Wait — before you go!</div><p style="font-size:15px;color:var(--color-text-muted);line-height:1.7;margin-bottom:24px">Get a <strong style="color:var(--color-primary)">free digital proof</strong> for your custom order within 24 hours.</p><a href="/pages/contact" style="display:block;background:var(--color-primary);color:#fff;padding:14px 32px;border-radius:var(--radius-button);font-size:14px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;text-decoration:none">Get My Free Proof</a><button onclick="this.closest('#exit-overlay').remove()" style="background:none;border:none;cursor:pointer;font-size:12px;color:var(--color-text-muted);padding:8px;margin-top:8px;display:block;width:100%">No thanks</button></div>`;
      overlay.id = 'exit-overlay';
      document.body.appendChild(overlay);
    }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { const o = document.getElementById('exit-overlay'); if (o) o.remove(); } });
}

// Color swatches on product cards — image swap
function initProductCardSwatches() {
  document.querySelectorAll('.product-card').forEach(card => {
    const img = card.querySelector('.product-card__image');
    if (!img) return;
    card.querySelectorAll('[data-swatch-image]').forEach(swatch => {
      swatch.addEventListener('mouseenter', () => { img.src = swatch.dataset.swatchImage; });
    });
  });
}

// Cart drawer toggle
function initCartDrawer() {
  document.querySelectorAll('[data-cart-toggle]').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = document.getElementById('cart-drawer');
      if (drawer) { drawer.classList.toggle('open'); document.body.classList.toggle('drawer-open'); }
    });
  });
  document.querySelectorAll('[data-drawer-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const drawer = btn.closest('.drawer');
      if (drawer) { drawer.classList.remove('open'); document.body.classList.remove('drawer-open'); }
    });
  });
}

// Init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStickyHeader();
  initMobileNav();
  initCountdown();
  initProductCardSwatches();
  initCartDrawer();
  // Social proof toasts after 8s
  setTimeout(() => { showToast(); setInterval(showToast, 30000); }, 8000);
  // Exit intent
  initExitIntent();
});
