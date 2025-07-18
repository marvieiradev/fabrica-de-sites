// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  initGalleryAnimations();
  initPricingAnimations();
  initTechAnimations();
  initCounterAnimation();

  // ===== TOGGLE DE TEMA =====
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle.querySelector(".theme-icon");

  // Verifica se há tema salvo no localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.className = savedTheme;
    updateThemeIcon(savedTheme);
  }

  // Função para atualizar o ícone do tema
  function updateThemeIcon(theme) {
    if (theme === "light-theme") {
      themeIcon.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
      themeIcon.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
  }

  // Event listener para o toggle de tema
  themeToggle.addEventListener("click", function () {
    if (body.classList.contains("dark-theme")) {
      body.className = "light-theme";
      localStorage.setItem("theme", "light-theme");
      updateThemeIcon("light-theme");
    } else {
      body.className = "dark-theme";
      localStorage.setItem("theme", "dark-theme");
      updateThemeIcon("dark-theme");
    }

    // Adiciona efeito de transição suave
    body.style.transition = "all 0.3s ease";
    setTimeout(() => {
      body.style.transition = "";
    }, 300);
  });

  // ===== MENU MOBILE =====
  const mobileMenuToggle = document.getElementById("mobileMenuToggle");
  const navMenu = document.querySelector(".nav-menu");

  // Cria overlay para menu mobile
  const overlay = document.createElement("div");
  overlay.className = "mobile-overlay";
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    `;
  document.body.appendChild(overlay);

  // Estilo para menu mobile ativo
  const mobileMenuStyles = `
        .nav-menu.mobile-active {
            display: flex !important;
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--bg-secondary);
            backdrop-filter: blur(10px);
            border: 1px solid var(--border-color);
            border-radius: var(--border-radius-lg);
            padding: 2rem;
            padding-right: 2.5rem;
            padding-left: 2.5rem;
            flex-direction: column;
            font-size: 1.25rem;
            gap: 1rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `;

  // Adiciona estilos do menu mobile
  const styleSheet = document.createElement("style");
  styleSheet.textContent = mobileMenuStyles;
  document.head.appendChild(styleSheet);

  // Toggle do menu mobile
  mobileMenuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("mobile-active");
    mobileMenuToggle.classList.toggle("active");

    if (navMenu.classList.contains("mobile-active")) {
      overlay.style.opacity = "1";
      overlay.style.visibility = "visible";
    } else {
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
    }
  });

  // Fecha menu ao clicar no overlay
  overlay.addEventListener("click", function () {
    navMenu.classList.remove("mobile-active");
    mobileMenuToggle.classList.remove("active");
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
  });

  // Fecha menu ao clicar em um link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("mobile-active");
      mobileMenuToggle.classList.remove("active");
      overlay.style.opacity = "0";
      overlay.style.visibility = "hidden";
    });
  });

  // ===== SCROLL SUAVE =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== ANIMAÇÕES NO SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        //observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observa elementos para animação
  const animateElements = document.querySelectorAll(`
    .hero-content, .hero-visual, .section-header, .about-content, .gallery-card, .tech-item, .pricing-card, .feature, .benefit, .contact-info, .contact-method`);
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Adiciona/remove classe baseada no scroll
    if (scrollTop > 100) {
      header.style.background = "var(--header-bg)";
      header.style.boxShadow = "0 2px 20px var(--shadow-color)";
    } else {
      header.style.background = "var(--header-bg)";
      header.style.boxShadow = "none";
    }

    // Esconde/mostra header baseado na direção do scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = scrollTop;
  });

  // ===== EFEITOS DE HOVER NOS CARDS =====
  document.querySelectorAll(".gallery-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // ===== TYPING ANIMATION =====
  function initTypingAnimation() {
    const heroTitle = document.querySelector(".hero-title-accent");
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
      }
    };

    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
  }

  // ===== GALLERY CARD ANIMATIONS =====
  function initGalleryAnimations() {
    const galleryCards = document.querySelectorAll(".gallery-card");

    galleryCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // ===== TECH CARDS ANIMATIONS =====
  function initTechAnimations() {
    const techCards = document.querySelectorAll(".tech-card");
    techCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  // ===== PRICING CARDS ANIMATIONS =====
  function initPricingAnimations() {
    const pricingCards = document.querySelectorAll(".pricing_card");

    pricingCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`;
    });
  }

  initTypingAnimation();
  // ===== PARALLAX EFFECT =====
  function initParallaxEffect() {
    const heroVisual = document.querySelector(".hero__visual");

    if (heroVisual) {
      window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        heroVisual.style.transform = `translateY(${rate}px)`;
      });
    }
  }

  // ===== COUNTER ANIMATION =====
  function initCounterAnimation() {
    const counters = document.querySelectorAll(".amount");

    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ""));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.floor(current).toLocaleString("pt-BR");
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString("pt-BR");
        }
      };

      updateCounter();
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  // ===== LAZY LOADING PARA IMAGENS =====
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          img.classList.remove("loading");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      img.classList.add("loading");
      imageObserver.observe(img);
    });
  }

  // ===== EFEITO PARALLAX SUAVE =====
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".hero-background");

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== VALIDAÇÃO DE FORMULÁRIO (se houver) =====
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Aqui você pode adicionar validação personalizada
      const inputs = form.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = "#ef4444";
        } else {
          input.style.borderColor = "";
        }
      });

      if (isValid) {
        // Processar formulário
        console.log("Formulário válido");
      }
    });
  });

  // ===== TOOLTIP SIMPLES =====
  function createTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            font-size: 0.8rem;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
            border: 1px solid var(--border-color);
        `;

    element.addEventListener("mouseenter", function (e) {
      document.body.appendChild(tooltip);
      tooltip.style.left = e.pageX + "px";
      tooltip.style.top = e.pageY - 40 + "px";
      tooltip.style.opacity = "1";
    });

    element.addEventListener("mouseleave", function () {
      if (tooltip.parentNode) {
        tooltip.parentNode.removeChild(tooltip);
      }
    });

    element.addEventListener("mousemove", function (e) {
      tooltip.style.left = e.pageX + "px";
      tooltip.style.top = e.pageY - 40 + "px";
    });
  }

  // ===== PERFORMANCE OPTIMIZATION =====
  // Debounce function para otimizar eventos de scroll
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

  // ===== INICIALIZAÇÃO FINAL =====
  console.log("🚀 Fábrica de Sites - JavaScript carregado com sucesso!");

  // Adiciona classe para indicar que JS está ativo
  document.documentElement.classList.add("js-loaded");

  // Remove loading screen se existir
  const loadingScreen = document.querySelector(".loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.remove();
      }, 300);
    }, 500);
  }
});

// ===== FUNÇÕES UTILITÁRIAS =====

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Função para detectar se está em modo escuro
function isDarkMode() {
  return document.body.classList.contains("dark-theme");
}

// Função para scroll suave para elemento
function scrollToElement(elementId, offset = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}

// Função para animar entrada de elementos
function animateIn(element, animation = "fadeInUp", delay = 0) {
  setTimeout(() => {
    element.style.animation = `${animation} 0.6s ease forwards`;
  }, delay);
}

// ===== EVENT LISTENERS GLOBAIS =====

// Redimensionamento da janela
window.addEventListener(
  "resize",
  debounce(function () {
    // Fecha menu mobile se a tela ficar grande
    if (window.innerWidth > 768) {
      const navMenu = document.querySelector(".nav-menu");
      const mobileMenuToggle = document.getElementById("mobileMenuToggle");
      const overlay = document.querySelector(".mobile-overlay");

      if (navMenu && navMenu.classList.contains("mobile-active")) {
        navMenu.classList.remove("mobile-active");
        mobileMenuToggle.classList.remove("active");
        if (overlay) {
          overlay.style.opacity = "0";
          overlay.style.visibility = "hidden";
        }
      }
    }
  }, 250)
);

// Previne zoom em inputs no iOS
if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  document.addEventListener("touchstart", function () {}, true);
}

// ===== ANALYTICS E TRACKING (opcional) =====
function trackEvent(eventName, properties = {}) {
  // Aqui você pode integrar com Google Analytics, Facebook Pixel, etc.
  console.log("Event tracked:", eventName, properties);
}

// Rastreia cliques nos botões de CTA
document.querySelectorAll(".btn-primary").forEach((button) => {
  button.addEventListener("click", function () {
    trackEvent("CTA_Click", {
      button_text: this.textContent.trim(),
      section: this.closest("section")?.id || "unknown",
    });
  });
});

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

//
