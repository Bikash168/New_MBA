/**
 * Trident School of Business Administration — Modern Animations Layer (animations.js)
 * Enables scroll-reveal viewport entries and interactive micro-animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Programmatically apply reveal animations to existing containers and lists
  setupDynamicAnimations();

  // 2. Initialize IntersectionObserver for scroll reveals
  initScrollObserver();

  // 3. Initialize global Apply Now modal form popup
  initGlobalApplyModal();
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
