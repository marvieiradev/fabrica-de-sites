// Configuração inicial
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

function initializeApp() {
  initMobileMenu();
  setupSmoothScrolling();
  setupScrollAnimations();
  setupCountdownTimer();
  setupCTAButtons();
  setupParallaxEffects();
  setupTypingAnimation();
  setupIntersectionObserver();
  // Menu Mobile
  function initMobileMenu() {
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navLinksItems = document.querySelectorAll(".nav-link");

    if (mobileToggle && navLinks) {
      mobileToggle.addEventListener("click", function () {
        navLinks.classList.toggle("mobile-active");
        mobileToggle.classList.toggle("active");
      });

      // Fechar menu ao clicar em um link
      navLinksItems.forEach((link) => {
        link.addEventListener("click", function () {
          navLinks.classList.remove("mobile-active");
          mobileToggle.classList.remove("active");
        });
      });

      // Fechar menu ao clicar fora
      document.addEventListener("click", function (e) {
        if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
          navLinks.classList.remove("mobile-active");
          mobileToggle.classList.remove("active");
        }
      });
    }

    // Fechar menu ao clicar em link
    // const navLinksItems = navLinks.querySelectorAll(".nav-link");
    navLinksItems.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
        mobileToggle.classList.remove("active");
        const spans = mobileToggle.querySelectorAll("span");
        spans.forEach((span) => {
          span.style.transform = "none";
          span.style.opacity = "1";
        });
      });
    });
  }

  /* if (index === 1){} span.style.opacity = '0';
                          if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                      } else {
                          span.style.transform = 'none';
                          span.style.opacity = '1';
                      }
                  });
              });*/
}
//}
// }

// Scroll Suave
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Animações de Scroll
function setupScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".advantage-card, .testimonial-card, .pricing-card, .investment-item"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(element);
  });
}

// Contador Regressivo
function setupCountdownTimer() {
  const countdownElement = document.createElement("div");
  countdownElement.className = "countdown-timer";
  countdownElement.innerHTML = `
              <div class="countdown-content">
                  <span class="countdown-label">Oferta termina em:</span>
                  <div class="countdown-display">
                      <div class="countdown-item">
                          <span class="countdown-number" id="hours">23</span>
                          <span class="countdown-text">Horas</span>
                      </div>
                      <div class="countdown-item">
                          <span class="countdown-number" id="minutes">59</span>
                          <span class="countdown-text">Min</span>
                      </div>
                      <div class="countdown-item">
                          <span class="countdown-number" id="seconds">59</span>
                          <span class="countdown-text">Seg</span>
                      </div>
                  </div>
              </div>
          `;

  // Adicionar estilos do countdown
  const countdownStyles = `
              .countdown-timer {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  background: var(--card-bg);
                  border: 2px solid var(--neon-blue);
                  border-radius: var(--border-radius-large);
                  padding: 16px;
                  box-shadow: var(--shadow-neon);
                  z-index: 1000;
                  backdrop-filter: blur(10px);
              }

              .countdown-content {
                  text-align: center;
              }

              .countdown-label {
                  display: block;
                  font-size: 12px;
                  color: var(--text-secondary);
                  margin-bottom: 8px;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
              }

              .countdown-display {
                  display: flex;
                  gap: 12px;
              }

              .countdown-item {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
              }

              .countdown-number {
                  font-size: 20px;
                  font-weight: 700;
                  color: var(--neon-blue);
                  display: block;
                  min-width: 30px;
              }

              .countdown-text {
                  font-size: 10px;
                  color: var(--text-muted);
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
              }

              @media (max-width: 768px) {
                  .countdown-timer {
                      bottom: 10px;
                      right: 10px;
                      padding: 12px;
                  }

                  .countdown-number {
                      font-size: 16px;
                  }

                  .countdown-display {
                      gap: 8px;
                  }
              }
          `;

  // Adicionar estilos ao head
  const style = document.createElement("style");
  style.textContent = countdownStyles;
  document.head.appendChild(style);

  // Adicionar countdown ao body
  document.body.appendChild(countdownElement);

  // Iniciar countdown
  let timeLeft = 24 * 60 * 60; // 24 horas em segundos

  function updateCountdown() {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      timeLeft = 24 * 60 * 60; // Reiniciar
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Botões CTA
function setupCTAButtons() {
  const ctaButtons = document.querySelectorAll(
    ".cta-button-primary, .cta-button-nav"
  );

  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Efeito de ripple
      const ripple = document.createElement("span");
      ripple.className = "ripple-effect";

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Simular redirecionamento para checkout
      setTimeout(() => {
        showCheckoutModal();
      }, 300);
    });
  });

  // Adicionar estilos do ripple
  const rippleStyles = `
              .cta-button-primary, .cta-button-nav {
                  position: relative;
                  overflow: hidden;
              }

              .ripple-effect {
                  position: absolute;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.3);
                  transform: scale(0);
                  animation: ripple 0.6s linear;
                  pointer-events: none;
              }

              @keyframes ripple {
                  to {
                      transform: scale(4);
                      opacity: 0;
                  }
              }
          `;

  const style = document.createElement("style");
  style.textContent = rippleStyles;
  document.head.appendChild(style);
}

// Modal de Checkout
function showCheckoutModal() {
  const modal = document.createElement("div");
  modal.className = "checkout-modal";
  modal.innerHTML = `
              <div class="modal-overlay">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h3>🚀 Redirecionando para o Checkout</h3>
                          <button class="modal-close">&times;</button>
                      </div>
                      <div class="modal-body">
                          <p>Você será redirecionado para nossa plataforma de pagamento segura.</p>
                          <div class="loading-spinner"></div>
                      </div>
                  </div>
              </div>
          `;

  // Estilos do modal
  const modalStyles = `
              .checkout-modal {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  z-index: 10000;
                  animation: fadeIn 0.3s ease;
              }

              .modal-overlay {
                  width: 100%;
                  height: 100%;
                  background: rgba(0, 0, 0, 0.8);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  backdrop-filter: blur(5px);
              }

              .modal-content {
                  background: var(--card-bg);
                  border: 1px solid var(--border-color);
                  border-radius: var(--border-radius-large);
                  padding: 32px;
                  max-width: 400px;
                  width: 90%;
                  text-align: center;
                  box-shadow: var(--shadow-card);
              }

              .modal-header {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  margin-bottom: 20px;
              }

              .modal-header h3 {
                  color: var(--text-primary);
                  font-size: 20px;
                  margin: 0;
              }

              .modal-close {
                  background: none;
                  border: none;
                  color: var(--text-secondary);
                  font-size: 24px;
                  cursor: pointer;
                  padding: 0;
                  width: 30px;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  border-radius: 50%;
                  transition: var(--transition);
              }

              .modal-close:hover {
                  background: var(--accent-bg);
                  color: var(--text-primary);
              }

              .modal-body p {
                  color: var(--text-secondary);
                  margin-bottom: 20px;
              }

              .loading-spinner {
                  width: 40px;
                  height: 40px;
                  border: 3px solid var(--border-color);
                  border-top: 3px solid var(--neon-blue);
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                  margin: 0 auto;
              }

              @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }

              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          `;

  const style = document.createElement("style");
  style.textContent = modalStyles;
  document.head.appendChild(style);

  document.body.appendChild(modal);

  // Fechar modal
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      modal.remove();
    }
  });

  // Auto fechar após 3 segundos
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 3000);
}

// Efeitos Parallax
function setupParallaxEffects() {
  const hero = document.querySelector(".hero");
  const floatingCards = document.querySelectorAll(".floating-card");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    if (hero) {
      hero.style.transform = `translateY(${rate}px)`;
    }

    floatingCards.forEach((card, index) => {
      const cardRate = scrolled * (0.1 + index * 0.05);
      card.style.transform = `translateY(${cardRate}px)`;
    });
  });
}

// Animação de Digitação
function setupTypingAnimation() {
  const heroTitle = document.querySelector(".hero-title");
  if (!heroTitle) return;

  const originalText = heroTitle.innerHTML;
  const gradientText = heroTitle.querySelector(".gradient-text");

  if (gradientText) {
    const gradientOriginal = gradientText.textContent;
    let index = 0;

    // Limpar texto inicial
    gradientText.textContent = "";

    function typeWriter() {
      if (index < gradientOriginal.length) {
        gradientText.textContent += gradientOriginal.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    }

    // Iniciar animação após um delay
    setTimeout(typeWriter, 1000);
  }
}

// Intersection Observer para animações
function setupIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observar seções
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Adicionar estilos de animação
  const animationStyles = `
              section {
                  opacity: 0;
                  transform: translateY(30px);
                  transition: opacity 0.8s ease, transform 0.8s ease;
              }

              section.animate-in {
                  opacity: 1;
                  transform: translateY(0);
              }

              .hero {
                  opacity: 1 !important;
                  transform: translateY(0) !important;
              }
          `;

  const style = document.createElement("style");
  style.textContent = animationStyles;
  document.head.appendChild(style);
}

// Adicionar estilos para menu mobile responsivo
const mobileMenuStyles = `
          @media (max-width: 768px) {
              .nav-links {
                  position: fixed;
                  top: 70px;
                  right: -100%;
                  width: 100%;
                  height: calc(100vh - 70px);
                  background: rgba(10, 10, 10, 0.98);
                  backdrop-filter: blur(10px);
                  flex-direction: column;
                  justify-content: flex-start;
                  align-items: center;
                  padding-top: 60px;
                  transition: right 0.3s ease;
                  border-left: 1px solid var(--border-color);
                  z-index: 999;
              }

              .nav-links.mobile-active {
                  right: 0;
              }

              .nav-link {
                  font-size: 18px;
                  padding: 20px 0;
                  border-bottom: 1px solid var(--border-color);
                  width: 80%;
                  text-align: center;
                  display: block;
              }

              .cta-button-nav {
                  margin-top: 20px;
              }

              .mobile-menu-toggle {
                  display: flex !important;
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
          }
      `;

const mobileStyle = document.createElement("style");
mobileStyle.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyle);

// Adicionar funcionalidade de scroll para header
window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(10, 10, 10, 0.98)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(10, 10, 10, 0.95)";
    header.style.boxShadow = "none";
  }
});

// Preloader
function showPreloader() {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.innerHTML = `
              <div class="preloader-content">
                  <div class="preloader-logo">AI<span>Master</span></div>
                  <div class="preloader-spinner"></div>
              </div>
          `;

  const preloaderStyles = `
              .preloader {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: var(--primary-bg);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  z-index: 10000;
                  animation: fadeOut 0.5s ease 2s forwards;
              }

              .preloader-content {
                  text-align: center;
              }

              .preloader-logo {
                  font-size: 48px;
                  font-weight: 800;
                  color: var(--text-primary);
                  margin-bottom: 20px;
              }

              .preloader-logo span {
                  color: var(--neon-blue);
              }

              .preloader-spinner {
                  width: 50px;
                  height: 50px;
                  border: 3px solid var(--border-color);
                  border-top: 3px solid var(--neon-blue);
                  border-radius: 50%;
                  animation: spin 1s linear infinite;
                  margin: 0 auto;
              }

              @keyframes fadeOut {
                  to {
                      opacity: 0;
                      visibility: hidden;
                  }
              }
          `;

  const style = document.createElement("style");
  style.textContent = preloaderStyles;
  document.head.appendChild(style);

  document.body.appendChild(preloader);

  setTimeout(() => {
    preloader.remove();
  }, 2500);
}

// Mostrar preloader no carregamento
showPreloader();
