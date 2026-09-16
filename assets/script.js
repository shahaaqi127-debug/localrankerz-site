document.addEventListener('DOMContentLoaded', () => {
  // Progressive enhancement: links stay visible when JavaScript is unavailable.
  const nav = document.querySelector('.nav');
  const links = nav?.querySelector('.nav-links');
  if (links) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'nav-toggle';
    toggle.textContent = 'Menu';
    links.id = 'primary-navigation';
    toggle.setAttribute('aria-controls', links.id);
    toggle.setAttribute('aria-expanded', 'false');
    nav.querySelector('.nav-cta').append(toggle);
    nav.classList.add('has-menu');
    const setOpen = (open) => {
      nav.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
    };
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('menu-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', (event) => {
      if (!nav.contains(event.target)) setOpen(false);
    });
    window.matchMedia('(max-width: 760px)').addEventListener('change', () => setOpen(false));
  }

  // Footer year
  document.querySelectorAll('.js-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Contact form (front-end only demo — no backend wired up)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(field => { if (!field.value.trim()) valid = false; });

      if (!valid) {
        status.textContent = 'Please fill in all required fields before sending.';
        status.classList.remove('ok');
        return;
      }
      status.textContent = 'Thanks — your message has been noted. We reply within one business day.';
      status.classList.add('ok');
      form.reset();
    });
  }
});
