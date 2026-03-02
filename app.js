/* ══════════════════════════════════════════
   EARTHGUARD — app.js
   Animations, Interactions & UI Logic
══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Navbar Scroll Behavior ──────────────
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ─── Smooth Active Nav Links ─────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a');

  const highlightNav = () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinksAll.forEach(link => {
      link.style.color = '';
      link.style.background = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--olive)';
        link.style.background = 'rgba(107,142,35,0.1)';
      }
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });

  // ─── Mobile Hamburger Menu ────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  let closeBtn = null;
  let menuOpen = false;

  const openMenu = () => {
    menuOpen = true;
    document.body.classList.add('mobile-menu-open');
    // Create close button
    closeBtn = document.createElement('button');
    closeBtn.id = 'closeMenu';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close menu');
    document.body.appendChild(closeBtn);
    closeBtn.addEventListener('click', closeMenu);
    // Close when clicking a link
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu, { once: true });
    });
  };

  const closeMenu = () => {
    menuOpen = false;
    document.body.classList.remove('mobile-menu-open');
    if (closeBtn) { closeBtn.remove(); closeBtn = null; }
  };

  hamburger.addEventListener('click', () => {
    menuOpen ? closeMenu() : openMenu();
  });

  // ─── Scroll Indicator Hide ────────────────
  const scrollIndicator = document.getElementById('scrollIndicator');
  const heroSection = document.getElementById('hero');
  if (scrollIndicator && heroSection) {
    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / (heroSection.offsetHeight * 0.4), 1);
      scrollIndicator.style.opacity = 1 - progress;
    }, { passive: true });
  }

  // ─── Intersection Observer: Reveal ───────
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve for re-entry, but we only animate once
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Count-Up Animation ───────────────────
  const countEls = document.querySelectorAll('.count');
  let countStarted = false;

  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-val'));
    const isDecimal = el.classList.contains('count-decimal');
    const duration = 1800;
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;
      
      if (isDecimal) {
        el.textContent = current.toFixed(1);
      } else {
        el.textContent = Math.round(current).toLocaleString();
      }
      
      if (progress < 1) requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
  };

  const statsSection = document.getElementById('impact');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countStarted) {
        countStarted = true;
        countEls.forEach(el => animateCount(el));
        statsObserver.disconnect();
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // ─── Timeline Progress Animation ─────────
  const timelineSection = document.getElementById('timeline');
  const timelineProgress = document.getElementById('timelineProgress');
  const timelineItems = document.querySelectorAll('.timeline-item');

  if (timelineSection && timelineProgress) {
    const updateTimeline = () => {
      const rect = timelineSection.getBoundingClientRect();
      const sectionHeight = timelineSection.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Progress from 0 to 1 as timeline scrolls through viewport
      const start = rect.top - windowHeight * 0.7;
      const end = rect.bottom - windowHeight * 0.3;
      const range = end - start;
      const progress = Math.max(0, Math.min(1, -start / range));
      
      timelineProgress.style.height = `${progress * 100}%`;
      
      // Activate dots based on progress
      timelineItems.forEach((item, i) => {
        const itemProgress = (i + 0.5) / timelineItems.length;
        if (progress >= itemProgress) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', updateTimeline, { passive: true });
    updateTimeline();
  }

  // ─── Contact Form Submit ──────────────────
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btn = contactForm.querySelector('.btn-submit');
      const btnSpan = btn.querySelector('span');
      
      // Loading state
      btn.disabled = true;
      btnSpan.textContent = 'Sending...';
      
      // Simulate async submit
      setTimeout(() => {
        btn.style.display = 'none';
        if (formSuccess) {
          formSuccess.classList.add('show');
        }
        // Reset form fields
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
          if (field.tagName === 'SELECT') {
            field.selectedIndex = 0;
          } else {
            field.value = '';
          }
        });
      }, 1200);
    });
  }

  // ─── Smooth Parallax: Hero BG ─────────────
  const heroBg = document.querySelector('.hero-hills');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const heroHeight = document.getElementById('hero').offsetHeight;
      if (scrolled < heroHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ─── Solution Cards: Subtle Icon Sway ────
  const solCards = document.querySelectorAll('.solution-card');
  solCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 4;
      card.style.transform = `translateY(-5px) rotateX(${-y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.4s ease, box-shadow 0.35s ease';
    });
  });

  // ─── Stat Card Hover: Ripple ──────────────
  const statCards = document.querySelectorAll('.stat-card');
  statCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.background = 'rgba(255,255,255,1)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  // ─── Footer Year ──────────────────────────
  const footerYear = document.querySelector('.footer-bottom p');
  if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', new Date().getFullYear());
  }

  // ─── Keyboard Accessibility: Nav skip ────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) {
      closeMenu();
    }
  });

  // ─── Prefers Reduced Motion ───────────────
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition', '0s');
    const allAnimated = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-left');
    allAnimated.forEach(el => {
      el.classList.add('visible');
      el.style.animation = 'none';
    });
  }

  // ─── Lenis-style smooth scroll on anchor clicks ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    });
  });

  // ─── Dynamic Background Texture on Scroll ──
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const now = window.scrollY;
    const direction = now > lastScroll ? 'down' : 'up';
    lastScroll = now;
    
    // Subtle: add organic offset to sections for parallax depth
    const sections = document.querySelectorAll('.section-impact, .section-solutions');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const centerOffset = (rect.top + rect.height / 2 - window.innerHeight / 2);
      const parallax = centerOffset * 0.02;
      if (Math.abs(parallax) < 30) {
        // Very subtle, barely perceptible
        section.style.backgroundPositionY = `${50 + parallax}%`;
      }
    });
  }, { passive: true });

  // ─── Problem Card badge colors ───────────
  // Already handled via CSS classes

  // ─── Console Easter Egg ───────────────────
  console.log(
    '%c🌿 EarthGuard',
    'color: #6B8E23; font-size: 20px; font-weight: bold; font-family: Georgia, serif;'
  );
  console.log(
    '%cThanks for inspecting! Every line of code here was written with the planet in mind. 💚',
    'color: #A3B18A; font-size: 12px; font-family: monospace;'
  );

});
