/* ============================================
   TEKTORA AI — Main JavaScript
   Premium Animations & Interactions
   ============================================ */

(function () {
  'use strict';

  // ---- Smooth scroll for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      closeMobileNav();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- Sticky Navigation with transparent-to-solid transition ----
  var nav = document.getElementById('nav');

  function handleNavScroll() {
    var scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('nav--solid');
    } else {
      nav.classList.remove('nav--solid');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- Mobile Navigation ----
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMobileNav() {
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  }

  navToggle.addEventListener('click', function () {
    var isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMobileNav();
    } else {
      navToggle.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      navLinks.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
      closeMobileNav();
    }
  });

  // ---- Scroll Reveal (Enhanced Staggered) ----
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
            setTimeout(function () {
              el.classList.add('revealed');
            }, delay);
            revealObserver.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add('revealed');
    });
  }

  // ---- SVG Scroll-Draw Animation (Section Dividers & Blueprint Lines) ----
  var scrollDrawElements = document.querySelectorAll('.scroll-draw');

  if (scrollDrawElements.length > 0 && 'IntersectionObserver' in window) {
    var drawObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('drawn');
            drawObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    scrollDrawElements.forEach(function (el) {
      drawObserver.observe(el);
    });
  }

  // ---- Section Divider Line Draw ----
  var dividerLines = document.querySelectorAll('.section-divider__line');

  if (dividerLines.length > 0 && 'IntersectionObserver' in window) {
    var dividerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('drawn');
            dividerObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    dividerLines.forEach(function (el) {
      dividerObserver.observe(el);
    });
  }

  // ---- Blueprint Line Draw Animation ----
  var blueprintSection = document.getElementById('solution');
  var blueprintLines = document.querySelectorAll('.blueprint__line');
  var blueprintDots = document.querySelectorAll('.blueprint__dot');
  var blueprintPulses = document.querySelectorAll('.blueprint__pulse');
  var blueprintTexts = document.querySelectorAll('.blueprint__text');

  if (blueprintSection && 'IntersectionObserver' in window) {
    var blueprintObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Stagger the line draws
            blueprintLines.forEach(function (line, index) {
              setTimeout(function () {
                line.classList.add('drawn');
              }, index * 300);
            });
            // Dots appear after lines
            setTimeout(function () {
              blueprintDots.forEach(function (dot) {
                dot.classList.add('drawn');
              });
            }, 800);
            // Pulse rings after dots
            setTimeout(function () {
              blueprintPulses.forEach(function (pulse) {
                pulse.classList.add('drawn');
              });
            }, 1200);
            // Text labels last
            setTimeout(function () {
              blueprintTexts.forEach(function (text) {
                text.classList.add('drawn');
              });
            }, 1000);
            blueprintObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    blueprintObserver.observe(blueprintSection);
  }

  // ---- Number Counter Animation (Enhanced) ----
  function formatNumber(num, format) {
    if (format === 'currency') {
      if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
      }
      if (num >= 1000) {
        return Math.round(num / 1000) + 'K';
      }
      return num.toString();
    }
    return num.toLocaleString();
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var format = el.getAttribute('data-format') || '';
    var duration = 2500;
    var startTime = null;

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutExpo(progress);
      var current = Math.round(target * easedProgress);

      el.textContent = formatNumber(current, format);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = formatNumber(target, format);
      }
    }

    requestAnimationFrame(step);
  }

  // Counter elements
  var statNumbers = document.querySelectorAll('.stat-card__number[data-count]');
  var counterNumbers = document.querySelectorAll('.counter__number[data-count]');
  var allCounters = [];

  statNumbers.forEach(function (el) { allCounters.push(el); });
  counterNumbers.forEach(function (el) { allCounters.push(el); });

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Small stagger for counters in same group
            var parent = entry.target.closest('.problem__stats, .counters');
            if (parent) {
              var siblings = parent.querySelectorAll('[data-count]');
              var idx = Array.prototype.indexOf.call(siblings, entry.target);
              setTimeout(function () {
                animateCounter(entry.target);
              }, idx * 200);
            } else {
              animateCounter(entry.target);
            }
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    allCounters.forEach(function (el) {
      counterObserver.observe(el);
    });
  } else {
    allCounters.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var format = el.getAttribute('data-format') || '';
      el.textContent = formatNumber(target, format);
    });
  }

  // ---- FAQ Accordion ----
  var faqItems = document.querySelectorAll('.faq__item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq__question');

    question.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close all items
      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- Contact Form ----
  var contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      if (contactForm.action.includes('placeholder')) {
        e.preventDefault();
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalHTML = btn.innerHTML;
        btn.innerHTML = '<span>Message Sent!</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;
        setTimeout(function () {
          btn.innerHTML = originalHTML;
          btn.style.opacity = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    });
  }

  // ---- Active nav link highlighting ----
  var sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute('id');
            var navLink = document.querySelector('.nav__links a[href="#' + id + '"]');
            if (navLink) {
              document.querySelectorAll('.nav__links a').forEach(function (a) {
                a.style.color = '';
              });
              navLink.style.color = '#FFFFFF';
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px',
      }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  // ---- Parallax-style subtle movement on hero orbs ----
  var heroOrbs = document.querySelectorAll('.hero__orb');
  var heroSection = document.querySelector('.hero');

  if (heroOrbs.length > 0 && heroSection && window.matchMedia('(min-width: 769px)').matches) {
    var ticking = false;

    window.addEventListener('mousemove', function (e) {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(function () {
        var rect = heroSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          ticking = false;
          return;
        }

        var x = (e.clientX / window.innerWidth - 0.5) * 2;
        var y = (e.clientY / window.innerHeight - 0.5) * 2;

        heroOrbs.forEach(function (orb, i) {
          var factor = (i + 1) * 8;
          orb.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
        });

        ticking = false;
      });
    }, { passive: true });
  }

  // ============================================
  // SCROLL-DRIVEN FRAME ANIMATION
  // Apple-style scroll-to-video technique
  // ============================================

  function ScrollFramePlayer(config) {
    this.canvas = document.getElementById(config.canvasId);
    this.section = document.getElementById(config.sectionId);
    if (!this.canvas || !this.section) return;

    this.ctx = this.canvas.getContext('2d');
    this.frameDir = config.frameDir;
    this.totalFrames = config.totalFrames;
    this.currentFrame = -1;
    this.frames = [];
    this.loadedCount = 0;
    this.allLoaded = false;
    this.rafId = null;

    this.init();
  }

  ScrollFramePlayer.prototype.getFramePath = function (index) {
    var num = index + 1;
    var padded = ('0000' + num).slice(-4);
    return this.frameDir + 'frame_' + padded + '.jpg';
  };

  ScrollFramePlayer.prototype.init = function () {
    var self = this;

    // Preload first frame immediately for instant display
    var firstImg = new Image();
    firstImg.src = this.getFramePath(0);
    firstImg.onload = function () {
      self.frames[0] = firstImg;
      self.loadedCount++;
      self.resizeCanvas();
      self.drawFrame(0);
      self.currentFrame = 0;
      // Then preload rest of frames
      self.preloadFrames();
    };

    window.addEventListener('resize', function () {
      self.resizeCanvas();
      if (self.currentFrame >= 0 && self.frames[self.currentFrame]) {
        self.drawFrame(self.currentFrame);
      }
    });

    // Bind scroll handler
    window.addEventListener('scroll', function () {
      if (!self.rafId) {
        self.rafId = requestAnimationFrame(function () {
          self.onScroll();
          self.rafId = null;
        });
      }
    }, { passive: true });
  };

  ScrollFramePlayer.prototype.preloadFrames = function () {
    var self = this;
    var batchSize = 10;
    var currentBatch = 1; // frame 0 already loaded

    function loadBatch() {
      var start = currentBatch;
      var end = Math.min(start + batchSize, self.totalFrames);

      for (var i = start; i < end; i++) {
        (function (idx) {
          var img = new Image();
          img.onload = function () {
            self.frames[idx] = img;
            self.loadedCount++;
            if (self.loadedCount === self.totalFrames) {
              self.allLoaded = true;
            }
          };
          img.onerror = function () {
            self.loadedCount++;
            if (self.loadedCount === self.totalFrames) {
              self.allLoaded = true;
            }
          };
          img.src = self.getFramePath(idx);
        })(i);
      }

      currentBatch = end;
      if (currentBatch < self.totalFrames) {
        // Use requestIdleCallback if available, otherwise setTimeout
        if ('requestIdleCallback' in window) {
          requestIdleCallback(loadBatch);
        } else {
          setTimeout(loadBatch, 50);
        }
      }
    }

    loadBatch();
  };

  ScrollFramePlayer.prototype.resizeCanvas = function () {
    var rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.canvas.style.width = rect.width + 'px';
    this.canvas.style.height = rect.height + 'px';
  };

  ScrollFramePlayer.prototype.drawFrame = function (index) {
    var img = this.frames[index];
    if (!img || !this.ctx) return;

    var canvas = this.canvas;
    var ctx = this.ctx;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Cover-fit the image into the canvas
    var imgRatio = img.naturalWidth / img.naturalHeight;
    var canvasRatio = canvas.width / canvas.height;

    var drawW, drawH, drawX, drawY;
    if (canvasRatio > imgRatio) {
      drawW = canvas.width;
      drawH = canvas.width / imgRatio;
      drawX = 0;
      drawY = (canvas.height - drawH) / 2;
    } else {
      drawH = canvas.height;
      drawW = canvas.height * imgRatio;
      drawX = (canvas.width - drawW) / 2;
      drawY = 0;
    }

    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  };

  ScrollFramePlayer.prototype.onScroll = function () {
    var rect = this.section.getBoundingClientRect();
    var sectionTop = rect.top;
    var sectionHeight = rect.height;
    var viewportHeight = window.innerHeight;

    // Calculate scroll progress through the section
    // Progress goes from 0 (section top at viewport bottom) to 1 (section bottom at viewport top)
    var scrollProgress = (viewportHeight - sectionTop) / (sectionHeight + viewportHeight);
    scrollProgress = Math.max(0, Math.min(1, scrollProgress));

    var frameIndex = Math.min(
      Math.floor(scrollProgress * this.totalFrames),
      this.totalFrames - 1
    );

    if (frameIndex !== this.currentFrame && this.frames[frameIndex]) {
      this.currentFrame = frameIndex;
      this.drawFrame(frameIndex);
    }
  };

  // Initialize hero scroll video
  new ScrollFramePlayer({
    canvasId: 'heroCanvas',
    sectionId: 'hero',
    frameDir: 'assets/frames/',
    totalFrames: 129
  });

  // Initialize solution scroll video
  new ScrollFramePlayer({
    canvasId: 'solutionCanvas',
    sectionId: 'solution',
    frameDir: 'assets/frames2/',
    totalFrames: 129
  });
})();
