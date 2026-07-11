/* Gulf Coast Clinical Consulting — motion + interactions */

(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- nav scrolled state ---------- */
  var nav = document.getElementById('nav');
  var body = document.body;
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- mobile drawer ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelectorAll('.nav-links a');

  function closeNav() {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    body.classList.remove('no-scroll');
  }
  function openNav() {
    nav.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    body.classList.add('no-scroll');
  }
  toggle.addEventListener('click', function () {
    if (nav.classList.contains('open')) closeNav(); else openNav();
  });
  links.forEach(function (a) {
    a.addEventListener('click', function () {
      if (nav.classList.contains('open')) closeNav();
    });
  });
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) closeNav();
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 720 && nav.classList.contains('open')) closeNav();
  });

  /* ---------- reveal (IntersectionObserver + hard fallback) ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(function (el) { io.observe(el); });

    // Safety: reveal any element already within 2x viewport after 700ms
    setTimeout(function () {
      var vh = window.innerHeight * 2;
      reveals.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh) el.classList.add('in');
      });
    }, 700);

    // Ultimate fallback: force-reveal everything after 3s so no section can stay opacity:0
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add('in'); });
    }, 3000);
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- count-up numbers (skip years) ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCount(el) {
    if (el.dataset.done) return;
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var duration = 1600;
    var start = performance.now();
    function step(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      var val = Math.round(target * eased);
      el.textContent = val.toLocaleString();
      if (t < 1) requestAnimationFrame(step);
      else { el.textContent = target.toLocaleString(); el.dataset.done = '1'; }
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cio.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });

    // Fallback: settle any un-animated counter after 2s
    setTimeout(function () {
      counters.forEach(function (el) {
        if (!el.dataset.done) {
          var t = parseInt(el.getAttribute('data-count'), 10) || 0;
          el.textContent = t.toLocaleString();
          el.dataset.done = '1';
        }
      });
    }, 2000);
  } else {
    counters.forEach(function (el) {
      var t = parseInt(el.getAttribute('data-count'), 10) || 0;
      el.textContent = t.toLocaleString();
    });
  }

  /* ---------- GSAP layer (parallax + micro-motion) ---------- */
  function initGsap() {
    if (reduced) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    // Portrait parallax
    var frame = document.querySelector('.portrait-frame');
    if (frame) {
      gsap.to(frame, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6
        }
      });
      gsap.to('.frame-glow', {
        rotation: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }

    // Hero-first entry: stagger the hero children on load
    var heroChildren = document.querySelectorAll('.hero .reveal');
    gsap.fromTo(heroChildren, {
      autoAlpha: 0, y: 30
    }, {
      autoAlpha: 1, y: 0, duration: 1, stagger: 0.09, ease: 'power3.out', delay: 0.15,
      onComplete: function () {
        heroChildren.forEach(function (el) { el.classList.add('in'); });
      }
    });

    // Service card subtle scroll parallax on numbers
    gsap.utils.toArray('.service').forEach(function (card, i) {
      var num = card.querySelector('.service-num');
      if (!num) return;
      gsap.fromTo(num, { x: -6 }, {
        x: 0,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 40%', scrub: true }
      });
    });

    // About portrait subtle rise
    var about = document.querySelector('.about-portrait');
    if (about) {
      gsap.fromTo(about, { y: 30 }, {
        y: -10,
        ease: 'none',
        scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: 1 }
      });
    }
  }

  // Wait for GSAP scripts (loaded with defer)
  if (document.readyState === 'complete') initGsap();
  else window.addEventListener('load', initGsap);
})();
