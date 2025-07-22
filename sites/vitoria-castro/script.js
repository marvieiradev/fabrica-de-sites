// Variáveis globais
let currentSlide = 0;
const testimonials = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  initializeNavigation();
  initializeTestimonialSlider();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeContactForm();
  initializeHeaderScroll();
});

// Navegação móvel
function initializeNavigation() {
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle do menu móvel
  navToggle.addEventListener("click", function () {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Scroll suave para âncoras
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Slider de depoimentos
function initializeTestimonialSlider() {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  // Mostrar primeiro slide
  showSlide(0);

  // Navegação com botões
  prevBtn.addEventListener("click", () => {
    currentSlide =
      currentSlide > 0 ? currentSlide - 1 : testimonials.length - 1;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    currentSlide =
      currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  });

  // Navegação com dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Auto-play do slider
  setInterval(() => {
    currentSlide =
      currentSlide < testimonials.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }, 5000);
}

function showSlide(index) {
  // Esconder todos os slides
  testimonials.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remover active de todos os dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Mostrar slide atual
  if (testimonials[index]) {
    testimonials[index].classList.add("active");
  }

  // Ativar dot atual
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

// Animações de scroll
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .advantage-card, .about-content, .section-header"
  );

  // Adicionar classe de animação aos elementos
  animatedElements.forEach((element) => {
    element.classList.add("scroll-animate");
  });

  // Observer para animações de scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}

// Botão voltar ao topo
function initializeBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Header com scroll
function initializeHeaderScroll() {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Formulário de contato
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validação básica
    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const service = formData.get("service");
    const message = formData.get("message");

    // Verificar se todos os campos estão preenchidos
    if (!name || !email || !phone || !service || !message) {
      showNotification("Por favor, preencha todos os campos.", "error");
      return;
    }

    // Validar email
    if (!isValidEmail(email)) {
      showNotification("Por favor, insira um e-mail válido.", "error");
      return;
    }

    // Simular envio do formulário
    showNotification(
      "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      "success"
    );
    contactForm.reset();
  });
}

// Validação de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = "info") {
  // Remover notificação existente
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Criar nova notificação
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${
                      type === "success"
                        ? "fa-check-circle"
                        : type === "error"
                        ? "fa-exclamation-circle"
                        : "fa-info-circle"
                    }"></i>
                    <span>${message}</span>
                    <button class="notification-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;

  // Adicionar estilos da notificação
  const notificationStyles = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    padding: 15px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    animation: slideInRight 0.3s ease-out;
                }
                
                .notification-success {
                    background: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                
                .notification-error {
                    background: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                
                .notification-info {
                    background: #d1ecf1;
                    color: #0c5460;
                    border: 1px solid #bee5eb;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    cursor: pointer;
                    margin-left: auto;
                    opacity: 0.7;
                    transition: opacity 0.2s;
                }
                
                .notification-close:hover {
                    opacity: 1;
                }
                
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;

  // Adicionar estilos se não existirem
  if (!document.querySelector("#notification-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "notification-styles";
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }

  // Adicionar ao DOM
  document.body.appendChild(notification);

  // Evento de fechar
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.remove();
  });

  // Auto-remover após 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Animações de entrada para elementos
function animateOnScroll() {
  const elements = document.querySelectorAll(".scroll-animate");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate");
    }
  });
}

// Smooth scroll para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Efeitos de hover para cards
function initializeCardEffects() {
  const cards = document.querySelectorAll(".service-card, .advantage-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

// Contador animado para estatísticas
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ""));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      if (counter.textContent.includes("%")) {
        counter.textContent = Math.floor(current) + "%";
      } else if (counter.textContent.includes("+")) {
        counter.textContent = Math.floor(current) + "+";
      } else {
        counter.textContent = Math.floor(current);
      }
    }, 16);
  });
}

// Observer para contadores
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

// Observar seção de estatísticas
window.addEventListener("load", () => {
  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  initializeCardEffects();
});

// Lazy loading para imagens
function initializeLazyLoading() {
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

// Parallax suave para hero
function initializeParallax() {
  const hero = document.querySelector(".hero");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Inicializar funcionalidades adicionais
window.addEventListener("load", () => {
  initializeLazyLoading();
  // initializeParallax(); // Descomentado se quiser efeito parallax
});

// Preloader (opcional)
function hidePreloader() {
  const preloader = document.querySelector(".preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 300);
  }
}

// Esconder preloader quando tudo carregar
window.addEventListener("load", hidePreloader);

// Função para detectar dispositivo móvel
function isMobile() {
  return window.innerWidth <= 768;
}

// Ajustar comportamentos para mobile
function adjustForMobile() {
  if (isMobile()) {
    // Desabilitar algumas animações em mobile para melhor performance
    document.body.classList.add("mobile-device");
  }
}

// Verificar mobile no resize
window.addEventListener("resize", adjustForMobile);
window.addEventListener("load", adjustForMobile);

// Performance: debounce para scroll
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

// Aplicar debounce ao scroll
window.addEventListener("scroll", debounce(animateOnScroll, 10));
