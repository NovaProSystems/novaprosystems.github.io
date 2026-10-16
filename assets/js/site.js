// NovaPro Systems: tema, menu movil, cabecera, pestañas de capturas y animacion de entrada
(() => {
  const top = document.querySelector('.top');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('nav');

  // Menu movil
  const setOpen = open => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.close : toggle.dataset.open);
    nav.classList.toggle('open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });

  // Tema claro u oscuro: sigue al sistema hasta que el usuario elige
  const root = document.documentElement;
  const themeBtn = document.querySelector('.theme-toggle');
  const prefersLight = matchMedia('(prefers-color-scheme: light)');
  const currentTheme = () => root.dataset.theme || (prefersLight.matches ? 'light' : 'dark');
  const syncThemeBtn = () => {
    const light = currentTheme() === 'light';
    themeBtn.setAttribute('aria-label', light ? themeBtn.dataset.toDark : themeBtn.dataset.toLight);
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute('content', light ? '#fafaf7' : '#0b0b0c'));
  };
  themeBtn.addEventListener('click', () => {
    const next = currentTheme() === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('tema', next); } catch (e) { /* sin almacenamiento */ }
    syncThemeBtn();
  });
  prefersLight.addEventListener('change', syncThemeBtn);
  syncThemeBtn();

  // Borde de la cabecera al desplazar
  const onScroll = () => top.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Pestañas de capturas de Obradia
  const shot = document.getElementById('shot');
  const tabs = [...document.querySelectorAll('.tabs [role="tab"]')];
  tabs.forEach(t => {
    const pre = new Image(); pre.src = t.dataset.src;
    t.addEventListener('click', () => {
      tabs.forEach(o => o.setAttribute('aria-selected', String(o === t)));
      shot.classList.add('fading');
      setTimeout(() => { shot.src = t.dataset.src; shot.alt = t.dataset.alt; shot.classList.remove('fading'); }, 180);
    });
  });

  // Animacion de entrada
  const items = document.querySelectorAll('.sec-head, .card, .showcase, .feat, .steps li, .contact-in > *');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(entries => entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    items.forEach(el => { el.classList.add('reveal'); io.observe(el); });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
