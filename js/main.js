/* =========================================================
   ADAGIO ENSAMBLE — Interacciones
   Requiere js/datos.js cargado antes.
   ========================================================= */
(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const ICON_PLAY = '<svg viewBox="0 0 24 24"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></svg>';

  /* ---------- Enlaces de WhatsApp / redes ---------- */
  const waLink = (msg) => `https://wa.me/${CONTACTO.whatsapp}?text=${encodeURIComponent(msg)}`;
  const DEFAULT_MSG = 'Hola Academia Adagio, quisiera información para contratar a Adagio Ensamble para un evento.';
  $$('[data-wa]').forEach(a => {
    a.href = waLink(a.dataset.wa || DEFAULT_MSG);
    a.target = '_blank'; a.rel = 'noopener';
  });
  $$('[data-wa-text]').forEach(el => { el.textContent = CONTACTO.whatsappVisible; });
  $$('[data-ig]').forEach(a => { a.href = CONTACTO.instagram; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-tiktok]').forEach(a => { a.href = CONTACTO.tiktok; a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ---------- Cabecera ---------- */
  const header = $('.header');
  const onScroll = () => header && header.classList.toggle('is-scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil ---------- */
  const toggle = $('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = document.body.classList.toggle('nav-open');
      document.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', open);
    });
    $$('.nav a').forEach(a => a.addEventListener('click', () => {
      document.body.classList.remove('nav-open', 'no-scroll');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }

  /* Enlace activo según la sección visible */
  const navLinks = $$('.nav a[href^="#"]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.forEach(a => { const s = $(a.getAttribute('href')); if (s) spy.observe(s); });
  }

  /* ---------- Revelado al hacer scroll ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Polvo dorado en el hero ---------- */
  const canvas = $('#particles');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, dots = [], raf;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, w / 14));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + .3,
        vy: -(Math.random() * .35 + .08), vx: (Math.random() - .5) * .15,
        a: Math.random() * .6 + .2, t: Math.random() * Math.PI * 2
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.t += .02;
        if (d.y < -10) { d.y = h + 10; d.x = Math.random() * w; }
        const alpha = d.a * (.6 + .4 * Math.sin(d.t));
        ctx.beginPath();
        ctx.fillStyle = `rgba(232,201,106,${alpha})`;
        ctx.shadowColor = 'rgba(232,201,106,.8)'; ctx.shadowBlur = 6;
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    resize(); draw();
    window.addEventListener('resize', resize);
    // Pausa cuando el hero no está a la vista
    new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) draw();
    }).observe(canvas);
  }

  /* ---------- Modales (genérico) ---------- */
  function openModal(m) { m.classList.add('is-open'); m.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); $('.modal__close', m).focus(); }
  function closeModal(m) {
    m.classList.remove('is-open'); m.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    $$('video', m).forEach(v => v.pause());
  }
  $$('.modal').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m || e.target.closest('.modal__close')) closeModal(m); });
  });
  document.addEventListener('keydown', e => {
    const open = $('.modal.is-open');
    if (!open) return;
    if (e.key === 'Escape') closeModal(open);
    if (open.id === 'lightbox' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) stepLightbox(e.key === 'ArrowRight' ? 1 : -1);
  });

  /* ---------- Integrantes ---------- */
  const memberModal = $('#member-modal');
  $$('.member').forEach(card => {
    card.addEventListener('click', () => {
      const tpl = $('.member__details', card);
      const img = $('img', card);
      $('.profile__img img', memberModal).src = img.src;
      $('.profile__img img', memberModal).alt = img.alt;
      $('.profile__body', memberModal).innerHTML = tpl.innerHTML;
      $('.profile', memberModal).scrollTop = 0;
      openModal(memberModal);
    });
  });

  /* ---------- Videos ---------- */
  const reel = $('#reel');
  const stage = $('#stage');
  if (reel && stage && typeof VIDEOS !== 'undefined') {
    const video  = $('video', stage);
    const cover  = $('.stage__play', stage);
    const blur   = $('.stage__blur', stage);
    let current  = Math.max(0, VIDEOS.findIndex(v => v.destacado));
    let visible  = VIDEOS.map((_, i) => i);

    reel.innerHTML = VIDEOS.map((v, i) => `
      <button class="vcard reveal" data-i="${i}" data-cat="${v.categoria}" aria-label="Reproducir: ${v.titulo}">
        <div class="vcard__thumb">
          <img src="imagenes/videos/${v.id}.jpg" alt="${v.titulo}" loading="lazy">
          <span class="vcard__tag">${CATEGORIAS[v.categoria] || ''}</span>
          <span class="vcard__dur">${v.duracion || ''}</span>
          <span class="vcard__icon">${ICON_PLAY}</span>
        </div>
        <div class="vcard__caption"><h3>${v.titulo}</h3><small>${v.lugar}</small></div>
      </button>`).join('');

    const cards = $$('.vcard', reel);
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } }), { threshold: .1 });
      cards.forEach(c => io.observe(c));
    } else cards.forEach(c => c.classList.add('is-visible'));

    function load(i, autoplay) {
      const v = VIDEOS[i];
      current = i;
      stage.dataset.formato = v.formato;
      video.pause();
      video.poster = `imagenes/videos/${v.id}.jpg`;
      video.src = `videos/${v.id}.mp4`;
      blur.style.backgroundImage = `url('imagenes/videos/${v.id}.jpg')`;
      $('.stage__cat', stage).textContent = CATEGORIAS[v.categoria] || '';
      $('.stage__title', stage).textContent = v.titulo;
      $('.stage__desc', stage).textContent = v.descripcion;
      $('.stage__place', stage).textContent = v.lugar;
      cards.forEach(c => c.classList.toggle('is-playing', +c.dataset.i === i));
      cover.classList.remove('is-hidden');
      if (autoplay) play();
    }
    function play() {
      cover.classList.add('is-hidden');
      video.controls = true;
      const p = video.play();
      if (p && p.catch) p.catch(() => cover.classList.remove('is-hidden'));
    }
    function step(dir) {
      const pos = visible.indexOf(current);
      const next = visible[(pos + dir + visible.length) % visible.length];
      load(next, !video.paused);
    }

    cover.addEventListener('click', play);
    video.addEventListener('pause', () => { if (!video.seeking && video.currentTime === 0) cover.classList.remove('is-hidden'); });
    video.addEventListener('ended', () => step(1));
    $('[data-prev]', stage).addEventListener('click', () => step(-1));
    $('[data-next]', stage).addEventListener('click', () => step(1));

    cards.forEach(c => c.addEventListener('click', () => {
      load(+c.dataset.i, true);
      const top = stage.getBoundingClientRect().top + window.scrollY - (header ? header.offsetHeight : 0) - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }));

    $$('.filter').forEach(f => f.addEventListener('click', () => {
      $$('.filter').forEach(x => x.classList.toggle('is-active', x === f));
      const cat = f.dataset.filter;
      visible = [];
      cards.forEach(c => {
        const show = cat === 'todos' || c.dataset.cat === cat;
        c.classList.toggle('is-hidden', !show);
        if (show) visible.push(+c.dataset.i);
      });
    }));

    load(current, false);
  }

  /* Videos sueltos (página Acerca de) */
  $$('[data-inline-video]').forEach(wrap => {
    const v = $('video', wrap), btn = $('.stage__play', wrap);
    btn.addEventListener('click', () => { btn.classList.add('is-hidden'); v.controls = true; v.play(); });
  });

  /* ---------- Galería + visor ---------- */
  const lightbox = $('#lightbox');
  const figures = $$('.gallery figure');
  let lbIndex = 0;
  function showLightbox(i) {
    lbIndex = (i + figures.length) % figures.length;
    const fig = figures[lbIndex], img = $('img', fig);
    $('.lightbox__inner img', lightbox).src = img.dataset.full || img.src;
    $('.lightbox__inner img', lightbox).alt = img.alt;
    $('.lightbox__inner p', lightbox).textContent = ($('figcaption', fig) || {}).textContent || '';
  }
  function stepLightbox(d) { showLightbox(lbIndex + d); }
  if (lightbox) {
    figures.forEach((f, i) => f.addEventListener('click', () => { showLightbox(i); openModal(lightbox); }));
    $('.lightbox__arrow--prev', lightbox).addEventListener('click', () => stepLightbox(-1));
    $('.lightbox__arrow--next', lightbox).addEventListener('click', () => stepLightbox(1));
    let x0 = null;
    lightbox.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
      x0 = null;
    });
  }

  /* ---------- Formulario de contratación → WhatsApp ---------- */
  const form = $('#booking-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(form));
      let fecha = d.fecha;
      if (fecha) { const [y, m, dd] = fecha.split('-'); fecha = `${dd}/${m}/${y}`; }
      const lines = [
        'Hola Academia Adagio, quiero contratar a *Adagio Ensamble* 🎶',
        '',
        `• Nombre: ${d.nombre}`,
        `• Tipo de evento: ${d.evento}`,
        fecha ? `• Fecha: ${fecha}` : '',
        d.ciudad ? `• Ciudad / lugar: ${d.ciudad}` : '',
        d.mensaje ? `• Detalles: ${d.mensaje}` : ''
      ].filter(Boolean);
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  }
})();
