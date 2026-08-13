/**
 * Trident School of Business Administration — Modern Animations Layer (animations.js)
 * Enables scroll-reveal viewport entries and interactive micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Setup custom logo layout matching user screenshot
  setupCustomLogoStyle();

  // Initialize global mobile navigation drawer & toggles
  initMobileNav();

  // Initialize sticky navbar scroll elevation effect
  initStickyNavEffect();

  // Initialize animated stat metric counters
  initMetricCounters();

  // Initialize campus life sticky showcase media observer
  initStickyShowcase();

  // 1. Programmatically apply reveal animations to existing containers and lists
  setupDynamicAnimations();

  // 2. Initialize IntersectionObserver for scroll reveals
  initScrollObserver();

  // 3. Initialize global Apply Now modal form popup
  initGlobalApplyModal();

  // 4. Initialize global Brochure modal popup
  initGlobalBrochureModal();

  // 5. Replace ampersands with styled span elements globally
  replaceAmpersands();
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

/**
 * Injects a global modal popup for "Apply Now" forms programmatically
 */
function initGlobalApplyModal() {
  // Check if style already exists, if not inject it
  if (!document.getElementById('apply-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'apply-modal-styles';
    style.textContent = `
      .apply-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(11, 31, 58, 0.65);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
      }
      .apply-modal-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .apply-modal-card {
        background: #FFFFFF;
        border: 1px solid rgba(11, 31, 58, 0.08);
        border-top: 4px solid var(--gold, #C8962A) !important;
        border-radius: 24px 24px 80px 24px / 24px 24px 40px 24px !important;
        width: 100%;
        max-width: 500px;
        padding: 40px 32px;
        box-shadow: 0 24px 60px rgba(11, 31, 58, 0.25);
        position: relative;
        transform: translateY(24px);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .apply-modal-overlay.active .apply-modal-card {
        transform: translateY(0);
      }
      .apply-modal-close {
        position: absolute;
        top: 24px;
        right: 24px;
        background: none;
        border: none;
        font-size: 28px;
        color: #5A6378;
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s;
      }
      .apply-modal-close:hover {
        color: var(--navy, #0B1F3A);
      }
      .apply-modal-header {
        margin-bottom: 24px;
        text-align: left;
      }
      .apply-modal-title {
        font-family: 'Playfair Display', serif;
        font-size: 24px;
        color: var(--navy, #0B1F3A);
        font-weight: 700;
        margin-bottom: 6px;
      }
      .apply-modal-subtitle {
        font-size: 11px;
        color: var(--gold, #C8962A);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.08em;
      }
      .apply-modal-form {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }
      .apply-modal-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        text-align: left;
      }
      .apply-modal-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--navy, #0B1F3A);
        letter-spacing: 0.02em;
      }
      .apply-modal-input, .apply-modal-textarea {
        width: 100%;
        padding: 12px 16px;
        border-radius: 8px;
        border: 1px solid var(--line, #E5DED0);
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        color: var(--text, #1A1A2E);
        background: #fafaf9;
        transition: border-color 0.25s, box-shadow 0.25s;
        box-sizing: border-box;
      }
      .apply-modal-input:focus, .apply-modal-textarea:focus {
        outline: none;
        border-color: var(--gold, #C8962A);
        box-shadow: 0 0 0 3px rgba(200, 150, 42, 0.15);
        background: #FFFFFF;
      }
      .apply-modal-textarea {
        resize: vertical;
        min-height: 100px;
      }
      .apply-modal-submit {
        background: var(--gold, #C8962A);
        color: var(--navy, #0B1F3A);
        font-weight: 700;
        font-size: 13.5px;
        padding: 14px;
        border: none;
        border-radius: 9999px !important; /* Premium pill shape */
        cursor: pointer;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        box-shadow: 0 4px 12px rgba(200, 150, 42, 0.15);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        font-family: 'DM Sans', sans-serif;
      }
      .apply-modal-submit:hover {
        background: var(--navy, #0B1F3A);
        color: var(--gold-soft, #E8B84B);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(11, 31, 58, 0.25);
      }
      .apply-success-box {
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        padding: 24px 0;
        text-align: center;
      }
      .apply-success-icon {
        font-size: 48px;
      }
      .apply-success-title {
        font-family: 'Playfair Display', serif;
        font-size: 22px;
        color: var(--navy, #0B1F3A);
        font-weight: 700;
      }
      .apply-success-text {
        font-size: 14px;
        color: #5A6378;
        line-height: 1.6;
      }
      @media (max-width: 480px) {
        .apply-modal-card {
          padding: 32px 20px;
          margin: 0 16px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create Modal Element
  const modalHtml = `
    <div class="apply-modal-overlay" id="applyModalOverlay">
      <div class="apply-modal-card">
        <button class="apply-modal-close" id="applyModalClose" aria-label="Close popup">&times;</button>
        
        <div id="applyFormContainer">
          <div class="apply-modal-header">
            <h3 class="apply-modal-title">Admission Enquiry</h3>
            <span class="apply-modal-subtitle">Trident School of Business Administration</span>
          </div>
          
          <form class="apply-modal-form" id="applyModalForm">
            <div class="apply-modal-group">
              <label class="apply-modal-label" for="apply-name">Full Name</label>
              <input class="apply-modal-input" type="text" id="apply-name" placeholder="Enter your full name" required>
            </div>
            
            <div class="apply-modal-group">
              <label class="apply-modal-label" for="apply-email">Email Address</label>
              <input class="apply-modal-input" type="email" id="apply-email" placeholder="Enter your email address" required>
            </div>
            
            <div class="apply-modal-group">
              <label class="apply-modal-label" for="apply-phone">Phone Number</label>
              <input class="apply-modal-input" type="tel" id="apply-phone" placeholder="Enter your phone number" required>
            </div>
            
            <div class="apply-modal-group">
              <label class="apply-modal-label" for="apply-enquiry">Enquiry</label>
              <textarea class="apply-modal-textarea" id="apply-enquiry" placeholder="Describe your enquiry details here" required></textarea>
            </div>
            
            <button class="apply-modal-submit" type="submit">Submit Enquiry</button>
          </form>
        </div>

        <div class="apply-success-box" id="applySuccessBox">
          <span class="apply-success-icon">✨</span>
          <h3 class="apply-success-title">Enquiry Submitted</h3>
          <p class="apply-success-text">Thank you! Your admission enquiry has been successfully received. Our academic coordinator will contact you shortly.</p>
          <button class="apply-modal-submit" id="applySuccessClose" style="width:100%; max-width:200px; margin-top: 10px;">Close</button>
        </div>
      </div>
    </div>
  `;

  // Inject to Body
  const container = document.createElement('div');
  container.innerHTML = modalHtml;
  document.body.appendChild(container.firstElementChild);

  const overlay = document.getElementById('applyModalOverlay');
  const closeBtn = document.getElementById('applyModalClose');
  const successCloseBtn = document.getElementById('applySuccessClose');
  const form = document.getElementById('applyModalForm');
  const formContainer = document.getElementById('applyFormContainer');
  const successBox = document.getElementById('applySuccessBox');

  // Show Modal Function
  function openModal(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    formContainer.style.display = 'block';
    successBox.style.display = 'none';
    form.reset();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
  }

  // Close Modal Function
  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = ''; // Unlock scrolling
  }

  // Event Listeners
  closeBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate to Success Message
    formContainer.style.display = 'none';
    successBox.style.display = 'flex';
  });

  // Target all "Apply Now" buttons and redirect their click events
  function hookApplyButtons() {
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach(btn => {
      const text = btn.textContent.trim().toLowerCase();
      const href = btn.getAttribute('href');
      
      // If button text contains "apply now" or class matches
      if (
        text === 'apply now' || 
        btn.classList.contains('mobile-apply') || 
        btn.classList.contains('nav-apply') ||
        (href && (href.includes('index.html#admissions') || href.includes('#admissions')) && text.includes('apply'))
      ) {
        // Remove default redirect click listener and link logic
        btn.addEventListener('click', openModal);
      }
    });
  }

  // Run hooks initially
  hookApplyButtons();

  // Run hooks again after brief intervals in case dynamic elements load
  setTimeout(hookApplyButtons, 1000);
}

/**
 * Injects a global modal popup for "Brochure" image programmatically
 */
function initGlobalBrochureModal() {
  // Check if style already exists, if not inject it
  if (!document.getElementById('brochure-modal-styles')) {
    const style = document.createElement('style');
    style.id = 'brochure-modal-styles';
    style.textContent = `
      .brochure-modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(11, 31, 58, 0.85);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        z-index: 2100;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.4s ease, visibility 0.4s ease;
      }
      .brochure-modal-overlay.active {
        opacity: 1;
        visibility: visible;
      }
      .brochure-modal-card {
        background: transparent;
        position: relative;
        max-width: 90vw;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: scale(0.9);
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .brochure-modal-overlay.active .brochure-modal-card {
        transform: scale(1);
      }
      .brochure-modal-close {
        position: absolute;
        top: -45px;
        right: 0;
        background: none;
        border: none;
        font-size: 36px;
        color: #FFFFFF;
        cursor: pointer;
        line-height: 1;
        transition: color 0.2s;
      }
      .brochure-modal-close:hover {
        color: var(--gold, #C8962A);
      }
      .brochure-modal-img-container {
        overflow: auto;
        max-height: 75vh;
        max-width: 100%;
        border-radius: 12px;
        border: 3px solid var(--gold, #C8962A);
        box-shadow: 0 16px 40px rgba(11, 31, 58, 0.35);
        background: #FFFFFF;
        display: flex;
        align-items: flex-start;
        justify-content: center;
      }
      .brochure-modal-img {
        display: block;
        max-width: 100%;
        height: auto;
        object-fit: contain;
        cursor: zoom-in;
        transition: transform 0.25s ease;
      }
      .brochure-modal-img.zoomed {
        max-width: none;
        cursor: zoom-out;
        transform: scale(1.5);
      }
      .brochure-modal-actions {
        margin-top: 20px;
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .brochure-modal-btn {
        background: var(--gold, #C8962A);
        color: var(--navy, #0B1F3A);
        font-weight: 700;
        font-size: 13px;
        padding: 12px 24px;
        border: none;
        border-radius: 9999px !important;
        cursor: pointer;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        text-decoration: none;
        box-shadow: 0 4px 12px rgba(200, 150, 42, 0.2);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
        font-family: 'DM Sans', sans-serif;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .brochure-modal-btn:hover {
        background: var(--navy, #0B1F3A);
        color: var(--gold-soft, #E8B84B);
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(11, 31, 58, 0.3);
      }
      .brochure-modal-btn-outline {
        background: transparent;
        border: 2px solid #FFFFFF;
        color: #FFFFFF;
        font-weight: 600;
        font-size: 13px;
        padding: 10px 22px;
        border-radius: 9999px !important;
        text-decoration: none;
        transition: all 0.2s;
        font-family: 'DM Sans', sans-serif;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .brochure-modal-btn-outline:hover {
        border-color: var(--gold, #C8962A);
        color: var(--gold, #C8962A);
        background: rgba(255, 255, 255, 0.08);
      }
      @media (max-width: 768px) {
        .brochure-modal-close {
          top: -36px;
          font-size: 30px;
        }
        .brochure-modal-actions {
          margin-top: 14px;
          gap: 10px;
        }
        .brochure-modal-btn, .brochure-modal-btn-outline {
          font-size: 12px;
          padding: 10px 18px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Create Modal Element
  const modalHtml = `
    <div class="brochure-modal-overlay" id="brochureModalOverlay">
      <div class="brochure-modal-card">
        <button class="brochure-modal-close" id="brochureModalClose" aria-label="Close brochure">&times;</button>
        
        <div class="brochure-modal-img-container">
          <img class="brochure-modal-img" id="brochureModalImg" src="/admission_flyer.jpg" alt="MBA Program Admission Flyer">
        </div>

        <div class="brochure-modal-actions">
          <a class="brochure-modal-btn" href="/admission_flyer.jpg" download="Trident-MBA-Admission-Flyer.jpg">Download Flyer / Brochure</a>
          <button class="brochure-modal-btn-outline" id="brochureModalApplyBtn">Apply Now</button>
        </div>
      </div>
    </div>
  `;

  // Inject to Body
  const container = document.createElement('div');
  container.innerHTML = modalHtml;
  document.body.appendChild(container.firstElementChild);

  const overlay = document.getElementById('brochureModalOverlay');
  const closeBtn = document.getElementById('brochureModalClose');
  const modalImg = document.getElementById('brochureModalImg');
  const applyBtn = document.getElementById('brochureModalApplyBtn');

  // Show Modal Function
  function openBrochure(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock scrolling
  }

  // Close Modal Function
  function closeBrochure() {
    overlay.classList.remove('active');
    modalImg.classList.remove('zoomed');
    document.body.style.overflow = ''; // Unlock scrolling
  }

  // Click-to-Zoom functionality for image readability
  modalImg.addEventListener('click', (e) => {
    e.stopPropagation();
    modalImg.classList.toggle('zoomed');
  });

  // Event Listeners
  closeBtn.addEventListener('click', closeBrochure);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBrochure();
  });

  // Hook apply now button in brochure to open apply now modal
  applyBtn.addEventListener('click', (e) => {
    closeBrochure();
    const applyModal = document.getElementById('applyModalOverlay');
    if (applyModal) {
      const navApply = document.querySelector('.nav-apply') || document.querySelector('.mobile-apply');
      if (navApply) {
        navApply.click();
      }
    }
  });

  // Target all "Brochure" and "Admission Flyer" buttons and redirect their click events
  function hookBrochureButtons() {
    const buttons = document.querySelectorAll('a, button');
    buttons.forEach(btn => {
      const text = btn.textContent.trim().toLowerCase();
      
      // If button text contains "brochure" or "flyer" (excluding modal action buttons)
      if ((text.includes('brochure') || text.includes('admission flyer')) && !btn.classList.contains('brochure-modal-btn')) {
        btn.onclick = openBrochure;
      }
    });
  }

  // Run hooks initially
  hookBrochureButtons();

  // Run hooks again after brief intervals in case dynamic elements load
  setTimeout(hookBrochureButtons, 1000);
}

/**
 * Traverses text nodes in layout elements and wraps ampersand (&) characters
 * in a styled span to enforce a standard sans-serif ampersand representation.
 */
function replaceAmpersands() {
  const elements = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6, p, li, a, span, .section-title, .slide-title, .banner-title, .logo-label, .school-name, .logo-emblem, .section-tag'
  );
  elements.forEach(el => {
    if (el.classList.contains('normal-amp')) return;
    const childNodes = Array.from(el.childNodes);
    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text.includes('&')) {
          const span = document.createElement('span');
          span.innerHTML = text.replace(/&/g, '<span class="normal-amp">&amp;</span>');
          node.replaceWith(...span.childNodes);
        }
      }
    });
  });
}

/**
 * Programmatically transforms the navigation header logo layout
 * to match the horizontal serif TRIDENT | School of Business layout.
 */
function setupCustomLogoStyle() {
  const logoTexts = document.querySelectorAll('.nav-logo .logo-text');
  logoTexts.forEach(el => {
    el.className = 'logo-text logo-layout-new';
    el.innerHTML = `
      <span class="logo-trident">TRIDENT</span>
      <span class="logo-divider">|</span>
      <span class="logo-school">School of Business</span>
    `;
  });
}

/**
 * Initializes global mobile navigation drawer toggle, links auto-closing,
 * and mobile sub-accordion menus for small device viewports.
 */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const mobileNav = document.getElementById('mobileNav') || document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    if (hamburger.dataset.navBound) return;
    hamburger.dataset.navBound = 'true';

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close mobile nav when clicking normal navigation links inside
    const mobileLinks = mobileNav.querySelectorAll('a:not(.mobile-toggle-link)');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Handle mobile submenu accordion toggle (+ / −) buttons
    const toggles = mobileNav.querySelectorAll('.mobile-toggle');
    toggles.forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const parentLi = toggle.closest('li');
        const sub = parentLi ? parentLi.querySelector('.mobile-sub') : null;
        if (sub) {
          const isOpen = sub.classList.toggle('open');
          toggle.textContent = isOpen ? '−' : '+';
          toggle.style.background = isOpen ? 'var(--gold)' : '';
          toggle.style.color = isOpen ? 'var(--navy)' : '';
        }
      });
    });
  }
}

/**
 * Initializes a scroll listener on the top navigation bar to add a glassmorphic
 * elevation shadow (`nav.scrolled`) when the user scrolls down the page.
 */
function initStickyNavEffect() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  function updateNav() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
}

/**
 * Automatically detects numerical statistic badges and metric numbers across pages
 * and animates them counting up smoothly when scrolled into view.
 */
function initMetricCounters() {
  const statElements = document.querySelectorAll(
    '.stat-num, .b-num, .metric-number, .stat-item strong, .hero-stat-card strong, .placement-stats-row strong, .b-num'
  );

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        obs.unobserve(el);
        animateCounter(el);
      }
    });
  }, { threshold: 0.2 });

  statElements.forEach(el => {
    const text = el.textContent.trim();
    if (/\d+/.test(text)) {
      el.dataset.origText = text;
      observer.observe(el);
    }
  });
}

function animateCounter(el) {
  const rawText = el.dataset.origText || el.textContent;
  const match = rawText.match(/(\D*)(\d+)(\D*)/);
  if (!match) return;

  const prefix = match[1] || '';
  const targetNum = parseInt(match[2], 10);
  const suffix = match[3] || '';
  const duration = 1400;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    const currentNum = Math.floor(easeProgress * targetNum);
    el.textContent = `${prefix}${currentNum}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = rawText;
    }
  }

  requestAnimationFrame(update);
}

/**
 * Ensures sticky media columns on Campus Life (and other showcase sections)
 * remain sticky with smooth top offset aligned to the sticky header bar.
 */
function initStickyShowcase() {
  const stickyColumns = document.querySelectorAll('.seminar-media-column, .sip-media-column');
  if (stickyColumns.length === 0) return;

  function updateStickyTop() {
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 72;
    stickyColumns.forEach(col => {
      if (window.innerWidth >= 993) {
        col.style.position = 'sticky';
        col.style.top = `${navHeight + 24}px`;
        col.style.alignSelf = 'flex-start';
      } else {
        col.style.position = '';
        col.style.top = '';
        col.style.alignSelf = '';
      }
    });
  }

  window.addEventListener('resize', updateStickyTop, { passive: true });
  updateStickyTop();
}




