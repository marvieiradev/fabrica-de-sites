// Navegação suave
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling para links de navegação
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const bannerHeight = document.querySelector(
          ".announcement-banner"
        ).offsetHeight;
        const targetPosition =
          targetSection.offsetTop - headerHeight - bannerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Menu mobile toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const mobileButton = document.querySelector(".button-mobile");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Animação do hamburger
    const spans = this.querySelectorAll("span");
    if (this.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translate(7px, 5px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    }
  });

  // Fechar menu mobile ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "none";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "none";
    });
  });

  mobileButton.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");

    const spans = hamburger.querySelectorAll("span");
    spans[0].style.transform = "none";
    spans[1].style.opacity = "1";
    spans[2].style.transform = "none";
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.style.background = "rgba(10, 10, 10, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)";
    } else {
      header.style.background = "rgba(10, 10, 10, 0.95)";
      header.style.boxShadow = "none";
    }

    if (scrollTop > 1) {
      header.style.top = "0px";
    } else {
      header.style.top = "44px";
    }

    lastScrollTop = scrollTop;
  });

  // Animações de scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observar elementos para animação
  const animateElements = document.querySelectorAll(
    ".benefit-card, .pricing-card, .testimonial-card"
  );
  animateElements.forEach((el) => {
    el.classList.add("scroll-animate");
    observer.observe(el);
  });

  // Contador animado para números de confiança
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    updateCounter();
  }

  // Observar seção hero para iniciar contadores
  const heroSection = document.querySelector(".hero");
  const heroObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counters = document.querySelectorAll(".trust-number");
          counters.forEach((counter) => {
            const text = counter.textContent;
            if (text.includes("5000+")) {
              counter.textContent = "0+";
              animateCounter(counter, 5000);
              setTimeout(() => {
                counter.textContent = "5000+";
              }, 2000);
            } else if (text.includes("98%")) {
              counter.textContent = "0%";
              animateCounter(counter, 98);
              setTimeout(() => {
                counter.textContent = "98%";
              }, 2000);
            }
          });
          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  heroObserver.observe(heroSection);

  // Funcionalidade dos botões CTA
  const ctaButtons = document.querySelectorAll(
    ".cta-button, .plan-button, .cta-button-nav"
  );
  ctaButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Efeito de ripple
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);

      // Simular ação de compra/contato
      setTimeout(() => {
        showModal();
      }, 300);
    });
  });

  // Modal de contato/compra
  function showModal() {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
    modal.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>🎉 Parabéns pela sua decisão!</h3>
                            <button class="modal-close">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>Você está a um passo de transformar sua vida!</p>
                            <p>Entre em contato conosco para finalizar sua inscrição:</p>
                            <div class="contact-options">
                                <a href="https://wa.me/5511999999999" target="_blank" class="contact-btn whatsapp">
                                    📱 WhatsApp
                                </a>
                                <a href="mailto:contato@vivamaisfit.com" class="contact-btn email">
                                    📧 E-mail
                                </a>
                                <a href="tel:+5511999999999" class="contact-btn phone">
                                    📞 Telefone
                                </a>
                            </div>
                        </div>
                    </div>
                `;

    document.body.appendChild(modal);

    // Fechar modal
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
  }

  // Parallax effect para hero
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-img");
    if (heroImage) {
      heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  });

  // Typing effect para o título
  function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Aplicar efeito de digitação ao título principal
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    setTimeout(() => {
      //typeWriter(heroTitle, originalText.replace(/<[^>]*>/g, ""), 50);
    }, 1000);
  }

  // Lazy loading para imagens
  const images = document.querySelectorAll("img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = "0";
        img.style.transition = "opacity 0.5s ease-in-out";

        img.onload = () => {
          img.style.opacity = "1";
        };

        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    imageObserver.observe(img);
  });

  // Adicionar estilos para modal e efeitos
  const modalStyles = `
                <style>
                    .modal-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.8);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 10000;
                        animation: fadeIn 0.3s ease-out;
                    }
                    
                    .modal-content {
                        background: var(--dark-secondary);
                        border-radius: var(--border-radius);
                        padding: 30px;
                        max-width: 500px;
                        width: 90%;
                        border: 2px solid var(--primary-pink);
                        animation: slideIn 0.3s ease-out;
                    }
                    
                    .modal-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    
                    .modal-header h3 {
                        color: var(--text-primary);
                        margin: 0;
                    }
                    
                    .modal-close {
                        background: none;
                        border: none;
                        color: var(--text-primary);
                        font-size: 24px;
                        cursor: pointer;
                        padding: 0;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    
                    .modal-body p {
                        color: var(--text-secondary);
                        margin-bottom: 15px;
                    }
                    
                    .contact-options {
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                        margin-top: 20px;
                    }
                    
                    .contact-btn {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 10px;
                        padding: 15px;
                        background: var(--gradient-primary);
                        color: white;
                        text-decoration: none;
                        border-radius: 50px;
                        font-weight: 600;
                        transition: var(--transition);
                    }
                    
                    .contact-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: var(--shadow-primary);
                    }
                    
                    .ripple {
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.3);
                        transform: scale(0);
                        animation: ripple-animation 0.6s linear;
                        pointer-events: none;
                    }
                    
                    @keyframes ripple-animation {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                    
                    @keyframes fadeIn {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                    
                    @keyframes slideIn {
                        from {
                            opacity: 0;
                            transform: translateY(-50px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    /* Menu mobile styles */
                    @media (max-width: 768px) {
                        .nav-menu {
                            position: fixed;
                            top: 100%;
                            left: 0;
                            width: 100%;
                            background: var(--dark-secondary);
                            flex-direction: column;
                            padding: 20px;
                            transform: translateY(-100%);
                            transition: var(--transition);
                            opacity: 0;
                            visibility: hidden;
                            align-items: center;
                            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
                        }
                        
                        .nav-menu.active {
                            transform: translateY(0);
                            opacity: 1;
                            visibility: visible;
                            gap: 10px;
                        }
                        
                        .nav-menu li {
                            margin: 5px 0;
                        }
                        
                        .nav-link {
                            font-size: 1.1rem;
                            padding: 5px 0;
                            display: block;
                        }
                        
                        .cta-button-nav {
                            margin-top: 0px;
                            width: 100%;
                        }
                    }
                    
                    /* Botões com posição relativa para ripple */
                    .cta-button, .plan-button, .cta-button-nav {
                        position: relative;
                        overflow: hidden;
                    }
                </style>
            `;

  document.head.insertAdjacentHTML("beforeend", modalStyles);

  console.log(modalStyles);
  // Adicionar indicador de loading
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");
  });

  // Scroll to top button
  const scrollTopBtn = document.createElement("button");
  scrollTopBtn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
  scrollTopBtn.className = "scroll-top-btn";
  scrollTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--gradient-primary);
                color: white;
                border: none;
                border-radius: 50%;
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
                z-index: 1000;
                box-shadow: var(--shadow-primary);
            `;

  document.body.appendChild(scrollTopBtn);

  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      scrollTopBtn.style.opacity = "1";
      scrollTopBtn.style.visibility = "visible";
    } else {
      scrollTopBtn.style.opacity = "0";
      scrollTopBtn.style.visibility = "hidden";
    }
  });

  // Adicionar efeito de hover nos cards
  const cards = document.querySelectorAll(
    ".benefit-card, .pricing-card, .testimonial-card"
  );
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  console.log("🎉 Viva Mais Fit - Landing Page carregada com sucesso!");
});
