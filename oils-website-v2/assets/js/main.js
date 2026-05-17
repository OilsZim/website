/**
 * OILS — Oil Industry Link & Services (Pvt) Company
 * main.js — Site interactivity
 *
 * Sections:
 *   1. Navbar scroll behaviour
 *   2. Mobile menu (open / close)
 *   3. Smooth scroll for anchor links
 *   4. Scroll-reveal (Intersection Observer)
 *   5. FAQ accordion
 *   6. Toast notification utility
 *   7. Contact form handling
 */

/* ──────────────────────────────────────────────────────────
   1. NAVBAR — add .scrolled class after 80px scroll
────────────────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const SCROLL_THRESHOLD = 80;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on page load in case page is already scrolled
})();


/* ──────────────────────────────────────────────────────────
   2. MOBILE MENU
────────────────────────────────────────────────────────── */
(function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', openMenu);
  mobileClose.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
})();


/* ──────────────────────────────────────────────────────────
   3. SMOOTH SCROLL — for all on-page anchor links
────────────────────────────────────────────────────────── */
(function initSmoothScroll() {
  const navbar = document.getElementById('navbar');

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetSelector = this.getAttribute('href');
      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
})();


/* ──────────────────────────────────────────────────────────
   4. SCROLL REVEAL — Intersection Observer
────────────────────────────────────────────────────────── */
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately for older browsers
    revealElements.forEach(function(el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function(el) { observer.observe(el); });
})();


/* ──────────────────────────────────────────────────────────
   5. FAQ ACCORDION
────────────────────────────────────────────────────────── */
(function initFaqAccordion() {
  const questions = document.querySelectorAll('.faq-question');

  questions.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer  = this.nextElementSibling;
      const isOpen  = this.classList.contains('active');

      // Close every open item first
      document.querySelectorAll('.faq-question.active').forEach(function(q) {
        q.classList.remove('active');
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('open');
      });

      // If this item was closed, open it
      if (!isOpen) {
        this.classList.add('active');
        this.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });
})();


/* ──────────────────────────────────────────────────────────
   6. TOAST NOTIFICATION UTILITY
────────────────────────────────────────────────────────── */
function showToast(message, duration) {
  duration = duration || 4000;
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(function() {
    toast.classList.remove('show');
  }, duration);
}


/* ──────────────────────────────────────────────────────────
   7. CONTACT FORM
   Strategy: validate → build mailto + WhatsApp links →
   open email client → show success state
────────────────────────────────────────────────────────── */
(function initContactForm() {
  var form        = document.getElementById('contactForm');
  var successEl   = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var fname   = document.getElementById('fname').value.trim();
    var lname   = document.getElementById('lname').value.trim();
    var email   = document.getElementById('email').value.trim();
    var phone   = document.getElementById('phone').value.trim();
    var service = document.getElementById('service').value;
    var message = document.getElementById('message').value.trim();

    /* ── Validation ── */
    if (!fname || !lname || !email || !message) {
      showToast('⚠ Please fill in all required fields.');
      return;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('⚠ Please enter a valid email address.');
      return;
    }

    /* ── Build mailto link ── */
    var subject = encodeURIComponent(
      'Website Enquiry from ' + fname + ' ' + lname +
      (service ? ' — ' + service : '')
    );
    var body = encodeURIComponent(
      'Name: ' + fname + ' ' + lname + '\n' +
      'Email: ' + email + '\n' +
      'Phone: ' + (phone || 'Not provided') + '\n' +
      'Service: ' + (service || 'Not specified') + '\n\n' +
      'Message:\n' + message
    );
    var mailtoLink = 'mailto:info@oils.co.zw?subject=' + subject + '&body=' + body;

    /* ── Open email client ── */
    window.location.href = mailtoLink;

    /* ── Show success state after brief delay ── */
    setTimeout(function() {
      form.style.display = 'none';
      if (successEl) {
        successEl.style.display = 'block';
      }
    }, 600);

    showToast('✓ Opening your email client…');
  });
})();


/* ──────────────────────────────────────────────────────────
   8. GALLERY FILTER
────────────────────────────────────────────────────────── */
(function initGalleryFilter() {
  var filters = document.querySelectorAll('.gallery-filter');
  var items   = document.querySelectorAll('.gallery-item');

  if (!filters.length) return;

  filters.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');

      // Update active state
      filters.forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');

      // Show / hide items
      items.forEach(function(item) {
        var cat = item.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
})();


/* ──────────────────────────────────────────────────────────
   10. PROJECT MODALS
────────────────────────────────────────────────────────── */
(function initProjectModals() {
  var openBtns  = document.querySelectorAll('.project-view-btn');
  var closeBtns = document.querySelectorAll('.project-modal-close');
  var modals    = document.querySelectorAll('.project-modal');

  function openModal(id) {
    var modal = document.getElementById('modal-' + id);
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Focus first close btn for a11y
    var closeBtn = modal.querySelector('.project-modal-close');
    if (closeBtn) setTimeout(function() { closeBtn.focus(); }, 50);
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    // Only restore scroll if no lightbox is open
    if (!document.getElementById('lightbox').classList.contains('open')) {
      document.body.style.overflow = '';
    }
  }

  openBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      openModal(this.getAttribute('data-project'));
    });
  });

  closeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      closeModal(this.closest('.project-modal'));
    });
  });

  // Click backdrop to close
  modals.forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Escape key closes topmost open modal
  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('.project-modal.open');
    if (open) closeModal(open);
  });
})();


/* ──────────────────────────────────────────────────────────
   11. LIGHTBOX (updated — works from .pm-item inside modals)
────────────────────────────────────────────────────────── */
(function initLightbox() {
  var lightbox    = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxCap = document.getElementById('lightboxCaption');
  var btnClose    = document.getElementById('lightboxClose');
  var btnPrev     = document.getElementById('lightboxPrev');
  var btnNext     = document.getElementById('lightboxNext');
  var currentItems = [];
  var currentIndex = 0;

  if (!lightbox) return;

  function getItems() {
    // Return pm-items from the currently open modal, or all pm-items
    var openModal = document.querySelector('.project-modal.open');
    if (openModal) return Array.from(openModal.querySelectorAll('.pm-item'));
    return Array.from(document.querySelectorAll('.pm-item'));
  }

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    showImage();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function showImage() {
    var item = currentItems[currentIndex];
    if (!item) return;
    lightboxImg.classList.add('loading');
    lightboxImg.src = item.getAttribute('data-src') || item.querySelector('img').src;
    lightboxImg.alt = item.querySelector('img').getAttribute('alt') || '';
    lightboxCap.textContent = item.getAttribute('data-cap') || '';
    lightboxImg.onload = function() { lightboxImg.classList.remove('loading'); };
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
    // Restore scroll only if no modal open
    var openModal = document.querySelector('.project-modal.open');
    if (!openModal) document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    showImage();
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % currentItems.length;
    showImage();
  }

  // Delegate clicks on all .pm-item (present or future)
  document.addEventListener('click', function(e) {
    var item = e.target.closest('.pm-item');
    if (!item) return;
    var items = getItems();
    var idx = items.indexOf(item);
    openLightbox(items, idx >= 0 ? idx : 0);
  });

  btnClose.addEventListener('click', closeLightbox);
  btnPrev.addEventListener('click', showPrev);
  btnNext.addEventListener('click', showNext);

  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', function(e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  });

  // Touch swipe
  var touchStartX = 0;
  lightbox.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox.addEventListener('touchend', function(e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? showNext() : showPrev(); }
  }, { passive: true });
})();
