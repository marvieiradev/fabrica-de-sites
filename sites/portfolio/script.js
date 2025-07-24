// ===== MODERN JAVASCRIPT FOR PORTFOLIO ===== //

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializePortfolio();
});

// Main initialization function
function initializePortfolio() {
  // Initialize all components
  initNavigation();
  initScrollAnimations();
  initSkillBars();
  initCounters();
  initProjectFilter();
  initContactForm();
  initBackToTop();
  initTypingEffect();
  initParallaxEffect();
  initThemeToggle();
}

// ===== NAVIGATION ===== //
function initNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile menu toggle
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = header.offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Header background on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
    }
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]");
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute("id");
      const correspondingNavLink = document.querySelector(
        `.nav-link[href="#${sectionId}"]`
      );

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (correspondingNavLink) {
          correspondingNavLink.classList.add("active");
        }
      }
    });
  });
}

// ===== SCROLL ANIMATIONS ===== //
function initScrollAnimations() {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeInUp 0.8s ease-out forwards";
        entry.target.style.opacity = "1";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".section-header, .about-content, .skill-category, .project-card, .contact-content"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });
}

// ===== SKILL BARS ANIMATION ===== //
function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const targetWidth = skillBar.getAttribute("data-width");

          setTimeout(() => {
            skillBar.style.width = targetWidth + "%";
          }, 200);

          skillObserver.unobserve(skillBar);
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => {
    skillObserver.observe(bar);
  });
}

// ===== ANIMATED COUNTERS ===== //
function initCounters() {
  const counters = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute("data-target"));
          const duration = 2000; // 2 seconds
          const increment = target / (duration / 16); // 60fps
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });
}

// ===== PROJECT FILTER ===== //
function initProjectFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "block";
          card.style.animation = "fadeInUp 0.5s ease-out";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// ===== CONTACT FORM ===== //
function initContactForm() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const subject = formData.get("subject");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !subject || !message) {
        showNotification("Por favor, preencha todos os campos.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor, insira um email válido.", "error");
        return;
      }

      // Simulate form submission
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      submitButton.disabled = true;

      setTimeout(() => {
        showNotification(
          "Mensagem enviada com sucesso! Entrarei em contato em breve.",
          "success"
        );
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
}

// Email validation helper
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-${
                      type === "success"
                        ? "check-circle"
                        : type === "error"
                        ? "exclamation-circle"
                        : "info-circle"
                    }"></i>
                    <span>${message}</span>
                    <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

  // Add notification styles
  notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${
                  type === "success"
                    ? "#4ecdc4"
                    : type === "error"
                    ? "#ff6b6b"
                    : "#00d4ff"
                };
                color: #0a0a0a;
                padding: 1rem;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
                max-width: 400px;
            `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

// ===== BACK TO TOP BUTTON ===== //
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
}

// ===== TYPING EFFECT ===== //
function initTypingEffect() {
  const heroSubtitle = document.querySelector(".hero-subtitle");
  if (!heroSubtitle) return;

  const originalText = heroSubtitle.textContent;
  const texts = [
    "Criando experiências digitais incríveis",
    "Desenvolvendo interfaces modernas",
    "Transformando ideias em realidade",
    "Especialista em React & JavaScript",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      heroSubtitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      heroSubtitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      typingSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500; // Pause before next text
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start typing effect after a delay
  setTimeout(typeWriter, 1000);
}

// ===== PARALLAX EFFECT ===== //
function initParallaxEffect() {
  const heroSection = document.querySelector(".hero");
  const heroImage = document.querySelector(".hero-img");

  if (heroSection && heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;

      if (scrolled < heroSection.offsetHeight) {
        heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    });
  }
}

// ===== THEME TOGGLE (BONUS FEATURE) ===== //
function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.className = "theme-toggle";
  themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  themeToggle.setAttribute("aria-label", "Alternar tema");

  // Add theme toggle styles
  themeToggle.style.cssText = `
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: var(--gradient-primary);
                color: var(--bg-color);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                font-size: 1.2rem;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: var(--shadow-medium);
            `;

  document.body.appendChild(themeToggle);

  // Theme toggle functionality
  let isDarkTheme = true;

  themeToggle.addEventListener("click", () => {
    const root = document.documentElement;

    if (isDarkTheme) {
      // Switch to light theme with better contrast
      root.style.setProperty("--bg-color", "#f8f9fa");
      root.style.setProperty("--bg-secondary", "#ffffff");
      root.style.setProperty("--bg-tertiary", "#e9ecef");
      root.style.setProperty("--text-color", "#1a1a1a");
      root.style.setProperty("--text-secondary", "#495057");
      root.style.setProperty("--border-color", "#ced4da");
      root.style.setProperty("--primary-color", "#2563eb");
      root.style.setProperty("--secondary-color", "#dc3545");
      root.style.setProperty("--tertiary-color", "#4338ca");
      root.style.setProperty("--accent-color", "#20c997");
      root.style.setProperty(
        "--gradient-primary",
        " linear-gradient(135deg, #3b82f6 0%, #4338ca 100%)"
      );

      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      isDarkTheme = false;
    } else {
      // Switch back to dark theme
      root.style.setProperty("--bg-color", "#0a0a0a");
      root.style.setProperty("--bg-secondary", "#1a1a1a");
      root.style.setProperty("--bg-tertiary", "#2a2a2a");
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--text-secondary", "#b0b0b0");
      root.style.setProperty("--border-color", "#333333");
      root.style.setProperty("--primary-color", "#22d3ee");
      root.style.setProperty("--secondary-color", "#ef4444");
      root.style.setProperty("--tertiary-color", "#0ea5e9");
      root.style.setProperty("--accent-color", "#14b8a6");
      root.style.setProperty(
        "--gradient-primary",
        " linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)"
      );
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      isDarkTheme = true;
    }

    /* if (isDarkTheme) {
      // Switch to light theme with better contrast
      root.style.setProperty("--bg-color", "#f8f9fa");
      root.style.setProperty("--bg-secondary", "#ffffff");
      root.style.setProperty("--bg-tertiary", "#e9ecef");
      root.style.setProperty("--text-color", "#1a1a1a");
      root.style.setProperty("--text-secondary", "#495057");
      root.style.setProperty("--border-color", "#ced4da");
      root.style.setProperty("--primary-color", "#0056b3");
      root.style.setProperty("--secondary-color", "#dc3545");
      root.style.setProperty("--accent-color", "#20c997");
      root.style.setProperty(
        "--gradient-primary",
        " linear-gradient(135deg, #00d4ff 0%, #4ecdc4 100%)"
      );

      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      isDarkTheme = false;
    } else {
      // Switch back to dark theme
      root.style.setProperty("--bg-color", "#0a0a0a");
      root.style.setProperty("--bg-secondary", "#1a1a1a");
      root.style.setProperty("--bg-tertiary", "#2a2a2a");
      root.style.setProperty("--text-color", "#ffffff");
      root.style.setProperty("--text-secondary", "#b0b0b0");
      root.style.setProperty("--border-color", "#333333");
      root.style.setProperty("--primary-color", "#00d4ff");
      root.style.setProperty("--secondary-color", "#ff6b6b");
      root.style.setProperty("--accent-color", "#4ecdc4");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      isDarkTheme = true;
    }*/
  });
}

// ===== PERFORMANCE OPTIMIZATIONS ===== //

// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== ACCESSIBILITY ENHANCEMENTS ===== //

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Skip to main content with Tab key
  if (
    e.key === "Tab" &&
    !e.shiftKey &&
    document.activeElement === document.body
  ) {
    const mainContent = document.querySelector("main");
    if (mainContent) {
      mainContent.focus();
      e.preventDefault();
    }
  }

  // Close mobile menu with Escape key
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    }
  }
});

// Focus management for mobile menu
function manageFocus() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = navMenu.querySelectorAll(".nav-link");

  navToggle.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      // Focus first nav link when menu opens
      setTimeout(() => navLinks[0].focus(), 100);
    }
  });
}

// ===== ADDITIONAL ANIMATIONS ===== //

// Add CSS for additional animations
const additionalStyles = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                margin-left: auto;
                padding: 0.25rem;
            }
            
            .theme-toggle:hover {
                transform: translateY(-50%) scale(1.1);
            }
            
            /* Smooth transitions for theme switching */
            * {
                transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
            }
        `;

// Inject additional styles
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== CONSOLE EASTER EGG ===== //
console.log(`
        🚀 Portfólio Desenvolvedor Front-end
        ====================================
        
        Olá, desenvolvedor curioso! 👋
        
        Este portfólio foi criado com:
        • HTML5 semântico
        • CSS3 moderno com custom properties
        • JavaScript ES6+ com funcionalidades avançadas
        • Design responsivo e acessível
        • Animações fluidas e interativas
        
        Tecnologias utilizadas:
        ✅ Intersection Observer API
        ✅ CSS Grid & Flexbox
        ✅ Custom Properties (CSS Variables)
        ✅ Modern JavaScript (ES6+)
        ✅ Responsive Design
        ✅ Accessibility Features
        ✅ Performance Optimizations
        
        Desenvolvido com ❤️ e muito ☕
        `);

// ===== SERVICE WORKER (OPTIONAL) ===== //
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    // Service worker would be registered here for PWA functionality
    console.log("Service Worker support detected");
  });
}
