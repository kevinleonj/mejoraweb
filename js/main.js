/* ============================================
   mejoraweb — Scroll Animations & Interactions
   ============================================ */

(function () {
  'use strict';

  // Scroll-reveal observer
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Observe all animated elements
  document.querySelectorAll('[data-animate]').forEach(function (el) {
    observer.observe(el);
  });

  // Header opacity on scroll
  var header = document.querySelector('.header');
  var lastScroll = 0;

  function onScroll() {
    var scrollY = window.scrollY;

    if (scrollY > 80) {
      header.style.borderBottomColor = '';
    } else {
      header.style.borderBottomColor = 'transparent';
    }

    lastScroll = scrollY;
  }

  // Throttle scroll events
  var ticking = false;
  window.addEventListener(
    'scroll',
    function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          onScroll();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  // Initial state
  onScroll();
})();
