// ===== CONFIGURAÇÕES GLOBAIS =====
const CONFIG = {
  animationDuration: 800,
  scrollOffset: 100,
  throttleDelay: 16,
  intersectionThreshold: 0.1,
};

// ===== UTILITÁRIOS =====
const Utils = {
  // Throttle para otimizar performance
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();

      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  },

  // Debounce para eventos que disparam muito
  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  },

  // Verificar se elemento está visível
  isElementInViewport(el, threshold = 0.1) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    return (
      rect.top <= windowHeight * (1 - threshold) &&
      rect.bottom >= windowHeight * threshold &&
      rect.left <= windowWidth * (1 - threshold) &&
      rect.right >= windowWidth * threshold
    );
  },

  // Smooth scroll para elemento
  smoothScrollTo(element, offset = 0) {
    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = Math.min(Math.abs(distance) * 0.5, 1000);
    let start = null;

    function animation(currentTime) {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  },
};

// ===== GERENCIADOR DE ANIMAÇÕES =====
class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
  }

  setupIntersectionObserver() {
    if (!("IntersectionObserver" in window)) {
      // Fallback para navegadores antigos
      this.fallbackAnimation();
      return;
    }

    const observerOptions = {
      threshold: CONFIG.intersectionThreshold,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
          this.animateElement(entry.target);
          this.animatedElements.add(entry.target);
        }
      });
    }, observerOptions);

    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(`
            .section-header,
            .hero-text,
            .hero-stats,
            .about-content > *,
            .plan-card,
            .benefit-card,
            .testimonial-card,
            .cta-content
        `);

    elementsToAnimate.forEach((el) => {
      el.classList.add("loading");
      observer.observe(el);
    });

    this.observers.set("intersection", observer);
  }

  animateElement(element) {
    element.classList.remove("loading");
    element.classList.add("loaded");

    // Animações específicas baseadas no tipo de elemento
    if (element.classList.contains("hero-text")) {
      this.animateHeroText(element);
    } else if (element.classList.contains("hero-stats")) {
      this.animateStats(element);
    } else if (element.classList.contains("plan-card")) {
      this.animatePlanCard(element);
    }
  }

  animateHeroText(element) {
    const title = element.querySelector(".hero-title");
    const subtitle = element.querySelector(".hero-subtitle");

    if (title) {
      title.style.animation = "fadeInUp 1s ease forwards";
    }

    if (subtitle) {
      subtitle.style.animation = "fadeInUp 1s ease 0.3s forwards";
      subtitle.style.opacity = "0";
    }
  }

  animateStats(element) {
    const statNumbers = element.querySelectorAll(".stat-number");

    statNumbers.forEach((stat, index) => {
      const finalValue = parseInt(stat.textContent.replace(/\D/g, ""));
      this.animateCounter(stat, 0, finalValue, 2000, index * 200);
    });
  }

  animateCounter(element, start, end, duration, delay = 0) {
    setTimeout(() => {
      const range = end - start;
      const increment = range / (duration / 16);
      let current = start;
      const suffix = element.textContent.replace(/\d/g, "");

      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
      }, 16);
    }, delay);
  }

  animatePlanCard(element) {
    const features = element.querySelectorAll(".plan-features li");

    features.forEach((feature, index) => {
      feature.style.opacity = "0";
      feature.style.transform = "translateX(-20px)";
      feature.style.transition = "all 0.5s ease";

      setTimeout(() => {
        feature.style.opacity = "1";
        feature.style.transform = "translateX(0)";
      }, index * 100);
    });
  }

  setupScrollAnimations() {
    const parallaxElements = document.querySelectorAll(".hero-background img");

    const handleScroll = Utils.throttle(() => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach((el) => {
        el.style.transform = `translateY(${rate}px)`;
      });

      // Atualizar header baseado no scroll
      this.updateHeader(scrolled);
    }, CONFIG.throttleDelay);

    window.addEventListener("scroll", handleScroll);
  }

  updateHeader(scrollPosition) {
    const header = document.querySelector(".header");

    if (scrollPosition > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
      header.style.backdropFilter = "blur(20px)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.boxShadow = "none";
    }

    if (scrollPosition > 1) {
      header.style.top = "-44px";
    } else {
      header.style.top = "0px";
    }
  }

  setupHoverEffects() {
    // Efeito de hover nos cards
    const cards = document.querySelectorAll(
      ".plan-card, .benefit-card, .testimonial-card"
    );

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
      });
    });

    // Efeito nos botões
    const buttons = document.querySelectorAll(
      ".btn-primary, .btn-secondary, .btn-plan"
    );

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px) scale(1.05)";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0) scale(1)";
      });
    });
  }

  fallbackAnimation() {
    // Animação simples para navegadores sem IntersectionObserver
    const elements = document.querySelectorAll(".loading");

    const animateOnScroll = Utils.throttle(() => {
      elements.forEach((el) => {
        if (Utils.isElementInViewport(el) && !this.animatedElements.has(el)) {
          el.classList.remove("loading");
          el.classList.add("loaded");
          this.animatedElements.add(el);
        }
      });
    }, 100);

    window.addEventListener("scroll", animateOnScroll);
    animateOnScroll(); // Executar uma vez no carregamento
  }
}

// ===== NAVEGAÇÃO =====
class Navigation {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.isMenuOpen = false;

    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupSmoothScroll();
    this.setupActiveLink();
  }

  setupMobileMenu() {
    if (!this.hamburger || !this.navMenu) return;

    this.hamburger.addEventListener("click", () => {
      this.toggleMenu();
    });

    // Fechar menu ao clicar em link
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (this.isMenuOpen) {
          this.toggleMenu();
        }
      });
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", (e) => {
      if (
        this.isMenuOpen &&
        !this.navMenu.contains(e.target) &&
        !this.hamburger.contains(e.target)
      ) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;

    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");

    // Animação do hamburger
    const spans = this.hamburger.querySelectorAll("span");
    if (this.isMenuOpen) {
      spans[0].style.transform = "rotate(45deg) translate(7px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }

    // Prevenir scroll do body quando menu estiver aberto
    document.body.style.overflow = this.isMenuOpen ? "hidden" : "";
  }

  setupSmoothScroll() {
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          Utils.smoothScrollTo(targetElement, CONFIG.scrollOffset);
        }
      });
    });

    // Scroll suave para outros links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach((link) => {
      if (!link.classList.contains("nav-link")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();

          const targetId = link.getAttribute("href");
          const targetElement = document.querySelector(targetId);

          if (targetElement) {
            Utils.smoothScrollTo(targetElement, CONFIG.scrollOffset);
          }
        });
      }
    });
  }

  setupActiveLink() {
    const sections = document.querySelectorAll("section[id]");

    const updateActiveLink = Utils.throttle(() => {
      const scrollPosition = window.pageYOffset + CONFIG.scrollOffset + 50;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          this.navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    }, 100);

    window.addEventListener("scroll", updateActiveLink);
  }
}

// ===== EFEITOS ESPECIAIS =====
class SpecialEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupParticles();
    this.setupTypingEffect();
    this.setupScrollIndicator();
    this.setupLoadingScreen();
  }

  setupParticles() {
    // Criar partículas flutuantes no hero
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const particlesContainer = document.createElement("div");
    particlesContainer.className = "particles-container";
    particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;

    for (let i = 0; i < 20; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(255, 107, 53, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
            `;

      particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);

    // CSS para animação das partículas
    const style = document.createElement("style");
    style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  setupTypingEffect() {
    const typingElements = document.querySelectorAll("[data-typing]");

    typingElements.forEach((element) => {
      const text = element.textContent;
      const speed = parseInt(element.dataset.typing) || 50;

      element.textContent = "";
      element.style.borderRight = "2px solid var(--primary-orange)";

      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, speed);
        } else {
          // Remover cursor após terminar
          setTimeout(() => {
            element.style.borderRight = "none";
          }, 1000);
        }
      };

      // Iniciar quando elemento estiver visível
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(typeWriter, 500);
            observer.unobserve(element);
          }
        });
      });

      observer.observe(element);
    });
  }

  setupScrollIndicator() {
    const scrollIndicator = document.createElement("div");
    scrollIndicator.className = "scroll-indicator";
    scrollIndicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: var(--gradient-orange);
            z-index: 9999;
            transition: width 0.1s ease;
        `;

    document.body.appendChild(scrollIndicator);

    const updateScrollIndicator = Utils.throttle(() => {
      const scrollTop = window.pageYOffset;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      scrollIndicator.style.width = scrollPercent + "%";
    }, CONFIG.throttleDelay);

    window.addEventListener("scroll", updateScrollIndicator);
  }

  setupLoadingScreen() {
    // Criar tela de loading
    const loadingScreen = document.createElement("div");
    loadingScreen.className = "loading-screen";
    loadingScreen.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-dark);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        `;

    const loader = document.createElement("div");
    loader.innerHTML = `
            <div style="text-align: center;">
                <i class="fas fa-dumbbell" style="font-size: 3rem; color: var(--primary-orange); animation: pulse 1.5s ease-in-out infinite;"></i>
                <p style="margin-top: 20px; color: var(--text-secondary); font-weight: 600;">Carregando...</p>
            </div>
        `;

    loadingScreen.appendChild(loader);
    document.body.appendChild(loadingScreen);

    // Remover loading screen quando página carregar
    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }, 1000);
    });
  }
}

// ===== FORMULÁRIOS E INTERAÇÕES =====
class InteractionManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupFormValidation();
    this.setupWhatsAppIntegration();
    this.setupTooltips();
    this.setupModalSystem();
  }

  setupFormValidation() {
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.validateForm(form);
      });
    });
  }

  validateForm(form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.hasAttribute("required") && !input.value.trim()) {
        this.showFieldError(input, "Este campo é obrigatório");
        isValid = false;
      } else if (input.type === "email" && !this.isValidEmail(input.value)) {
        this.showFieldError(input, "Email inválido");
        isValid = false;
      } else {
        this.clearFieldError(input);
      }
    });

    if (isValid) {
      this.submitForm(form);
    }
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    this.clearFieldError(field);

    const errorDiv = document.createElement("div");
    errorDiv.className = "field-error";
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
            color: #ff4444;
            font-size: 14px;
            margin-top: 5px;
            animation: fadeInUp 0.3s ease;
        `;

    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = "#ff4444";
  }

  clearFieldError(field) {
    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
    field.style.borderColor = "";
  }

  submitForm(form) {
    // Simular envio do formulário
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.textContent = "Enviado!";
      submitBtn.style.background = "var(--accent-green)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = "";
        form.reset();
      }, 2000);
    }, 1500);
  }

  setupWhatsAppIntegration() {
    const whatsappButtons = document.querySelectorAll(
      '[href*="wa.me"], .footer-whatsapp'
    );

    whatsappButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        // Adicionar mensagem personalizada
        const message = encodeURIComponent(
          "Olá João! Vim através do seu site e gostaria de saber mais sobre os planos de personal trainer."
        );

        const href = button.getAttribute("href");
        if (href && !href.includes("text=")) {
          button.setAttribute("href", `${href}?text=${message}`);
        }
      });
    });
  }

  setupTooltips() {
    const tooltipElements = document.querySelectorAll("[data-tooltip]");

    tooltipElements.forEach((element) => {
      element.addEventListener("mouseenter", (e) => {
        this.showTooltip(e.target, e.target.dataset.tooltip);
      });

      element.addEventListener("mouseleave", () => {
        this.hideTooltip();
      });
    });
  }

  showTooltip(element, text) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = text;
    tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 1000;
            box-shadow: var(--shadow-medium);
            animation: fadeInUp 0.2s ease;
        `;

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left =
      rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + "px";
    tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + "px";

    this.currentTooltip = tooltip;
  }

  hideTooltip() {
    if (this.currentTooltip) {
      this.currentTooltip.remove();
      this.currentTooltip = null;
    }
  }

  setupModalSystem() {
    // Sistema básico de modal para futuras expansões
    const modalTriggers = document.querySelectorAll("[data-modal]");

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        this.openModal(modalId);
      });
    });
  }

  openModal(modalId) {
    // Implementação básica de modal
    console.log(`Abrindo modal: ${modalId}`);
  }
}

// ===== PERFORMANCE E OTIMIZAÇÃO =====
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.preloadCriticalResources();
    this.optimizeAnimations();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
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
    } else {
      // Fallback para navegadores antigos
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  }

  preloadCriticalResources() {
    // Precarregar recursos críticos
    const criticalImages = [
      "assets/images/hero-trainer.png",
      "assets/images/personal-training.jpg",
    ];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    });
  }

  optimizeAnimations() {
    // Reduzir animações em dispositivos com pouca bateria
    if ("getBattery" in navigator) {
      navigator.getBattery().then((battery) => {
        if (battery.level < 0.2) {
          document.body.classList.add("reduce-motion");
        }
      });
    }

    // Respeitar preferência do usuário por movimento reduzido
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.body.classList.add("reduce-motion");
    }
  }
}

// ===== INICIALIZAÇÃO =====
class App {
  constructor() {
    this.animationManager = null;
    this.navigation = null;
    this.specialEffects = null;
    this.interactionManager = null;
    this.performanceOptimizer = null;

    this.init();
  }

  init() {
    // Aguardar DOM estar pronto
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () =>
        this.initializeComponents()
      );
    } else {
      this.initializeComponents();
    }
  }

  initializeComponents() {
    try {
      // Inicializar componentes em ordem de prioridade
      this.performanceOptimizer = new PerformanceOptimizer();
      this.navigation = new Navigation();
      this.animationManager = new AnimationManager();
      this.specialEffects = new SpecialEffects();
      this.interactionManager = new InteractionManager();

      // Configurar eventos globais
      this.setupGlobalEvents();

      console.log("🚀 Landing page João Sobreira inicializada com sucesso!");
    } catch (error) {
      console.error("Erro ao inicializar aplicação:", error);
    }
  }

  setupGlobalEvents() {
    // Otimizar redimensionamento da janela
    const handleResize = Utils.debounce(() => {
      // Recalcular animações se necessário
      if (this.animationManager) {
        this.animationManager.setupScrollAnimations();
      }
    }, 250);

    window.addEventListener("resize", handleResize);

    // Melhorar performance em dispositivos móveis
    if ("ontouchstart" in window) {
      document.body.classList.add("touch-device");
    }

    // Detectar modo escuro do sistema
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("system-dark-mode");
    }
  }
}

// ===== CSS ADICIONAL PARA ANIMAÇÕES =====
const additionalStyles = `
    .reduce-motion * {
        /*animation-duration: 0.01ms !important;*/
        /*animation-iteration-count: 1 !important;*/
        transition-duration: 0.01ms !important;
    }

    .touch-device .plan-card:hover,
    .touch-device .benefit-card:hover,
    .touch-device .testimonial-card:hover {
        transform: none;
    }

    .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 65px;
        left: 0;
        width: 100%;
        height: calc(100vh - 100px);
        background: rgba(10, 10, 10, 0.98);
        backdrop-filter: blur(20px);
        padding: 40px 20px;
        gap: 30px;
        animation: slideInDown 0.3s ease;
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }

    .lazy.loaded {
        opacity: 1;
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// ===== INICIALIZAR APLICAÇÃO =====
const app = new App();
