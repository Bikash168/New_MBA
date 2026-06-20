/**
 * Trident School of Business Administration — Modern Animations Layer (animations.js)
 * Enables scroll-reveal viewport entries and interactive micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Programmatically apply reveal animations to existing containers and lists
  setupDynamicAnimations();

  // 2. Initialize IntersectionObserver for scroll reveals
  initScrollObserver();
});

/**
 * Automatically applies scroll-reveal styles and staggering delays
 * to key components across the website's pages.
 */
function setupDynamicAnimations() {
  // Add base reveal class to section headers and titles
  const headers = document.querySelectorAll('.section-header, .section-title, .hero-desc, .rec-header, .hero-title, .hero-section .eyebrow');
  headers.forEach(el => el.classList.add('scroll-reveal'));

  // Homepage: Strengths grid items (select grid container direct children)
  const strengthCards = document.querySelectorAll('.section + .section [style*="display:grid"], .section [style*="display:grid"]');
  strengthCards.forEach(grid => {
    const children = grid.children;
    Array.from(children).forEach((child, idx) => {
      child.classList.add('scroll-reveal');
      child.classList.add(`stagger-${(idx % 4) + 1}`);
    });
  });

  // Homepage / Pages: Notice board cards
  const noticeCards = document.querySelectorAll('.notice-card, .editorial-card, .highlights-box, .testi-card');
  noticeCards.forEach((card, idx) => {
    card.classList.add('scroll-reveal');
    card.classList.add(`stagger-${(idx % 3) + 1}`);
  });

  // Campus Life: Infrastructure, Club, Sports, and Fest cards
  const campusCards = document.querySelectorAll('.infrastructure-card, .club-card, .sports-card, .fest-card, .infra-item');
  campusCards.forEach((card, idx) => {
    card.classList.add('scroll-reveal-scale');
    card.classList.add(`stagger-${(idx % 3) + 1}`);
  });

  // Placement Page: Stat strip items, recruiter logo cards
  const placementStats = document.querySelectorAll('.placement-stats-row > div, .stat-item');
  placementStats.forEach((stat, idx) => {
    stat.classList.add('scroll-reveal');
    stat.classList.add(`stagger-${(idx % 5) + 1}`);
  });

  const recruiterCards = document.querySelectorAll('.rec-logo-card, .logo-grid > div');
  recruiterCards.forEach((logo, idx) => {
    logo.classList.add('scroll-reveal-scale');
    logo.classList.add(`stagger-${(idx % 6) + 1}`);
  });

  // About Page: Hero stats, tile cards
  const tileCards = document.querySelectorAll('.tile-card, .hero-stat-card');
  tileCards.forEach((tile, idx) => {
    tile.classList.add('scroll-reveal');
    tile.classList.add(`stagger-${(idx % 4) + 1}`);
  });

  // Faculty and Curriculum: Faculty cards, curriculum wrappers
  const facultyCards = document.querySelectorAll('.faculty-card, .admission-card, .contact-card');
  facultyCards.forEach((fc, idx) => {
    fc.classList.add('scroll-reveal');
    fc.classList.add(`stagger-${(idx % 3) + 1}`);
  });

  // Image frames & showcase banners
  const images = document.querySelectorAll('.about-img-wrap, .hero-media-wrap, .placement-banner-wrap, .showcase-img');
  images.forEach(img => img.classList.add('scroll-reveal-scale'));
}

/**
 * Initializes IntersectionObserver to watch reveal elements
 */
function initScrollObserver() {
  const revealClasses = ['.scroll-reveal', '.scroll-reveal-left', '.scroll-reveal-right', '.scroll-reveal-scale'];
  const selectors = revealClasses.join(', ');
  const targets = document.querySelectorAll(selectors);

  if (!('IntersectionObserver' in window)) {
    // Fallback: If browser does not support IntersectionObserver, make all elements visible immediately
    targets.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null, // use viewport
    rootMargin: '0px 0px -80px 0px', // trigger slightly before entering
    threshold: 0.1 // 10% of element is visible
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // animate once
      }
    });
  }, observerOptions);

  targets.forEach(target => {
    revealObserver.observe(target);
  });
}
