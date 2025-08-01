/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

// Menu show
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

// Menu hidden
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*===== CHANGE BACKGROUND HEADER =====*/
function scrollHeader() {
  const nav = document.getElementById("header");
  if (this.scrollY >= 80) nav.classList.add("scroll-header");
  else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*===== SHOW SCROLL TOP =====*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/*===== SCROLL TO TOP =====*/
const scrollTopBtn = document.getElementById("scroll-top");
if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*===== GALLERY FILTER =====*/
const galleryFilters = document.querySelectorAll(".gallery__filter");
const galleryItems = document.querySelectorAll(".gallery__item");

function filterGallery() {
  // Remove active class from all filters
  galleryFilters.forEach((filter) => filter.classList.remove("active"));
  // Add active class to clicked filter
  this.classList.add("active");

  const filterValue = this.getAttribute("data-filter");

  galleryItems.forEach((item) => {
    if (filterValue === "all") {
      item.style.display = "block";
      item.style.animation = "fadeInUp 0.6s ease-out";
    } else {
      if (item.getAttribute("data-category") === filterValue) {
        item.style.display = "block";
        item.style.animation = "fadeInUp 0.6s ease-out";
      } else {
        item.style.display = "none";
      }
    }
  });
}

galleryFilters.forEach((filter) => {
  filter.addEventListener("click", filterGallery);
});

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2000,
  delay: 200,
  reset: false,
});

// Hero animations
sr.reveal(".hero__data", { origin: "left" });
sr.reveal(".hero__visual", { origin: "right", delay: 400 });

// About animations
sr.reveal(".about__text", { origin: "left" });
sr.reveal(".about__services", { origin: "top", delay: 200 });
sr.reveal(".about__stat", { interval: 100 });

// Gallery animations
sr.reveal(".gallery__filters", { origin: "top" });
sr.reveal(".gallery__item", { interval: 100 });

// Technologies animations
sr.reveal(".tech__category", { interval: 200 });
sr.reveal(".tech__feature", { interval: 100 });

// Contact animations
sr.reveal(".contact__item", { origin: "left", interval: 100 });
sr.reveal(".contact__cta", { origin: "bottom" });

/*===== TYPING EFFECT =====*/
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Initialize typing effect on hero subtitle
document.addEventListener("DOMContentLoaded", function () {
  const txtElement = document.querySelector(".hero__title-line--accent");
  if (txtElement) {
    const words = [
      "Potencializado por IA",
      "Criativo & Inovador",
      "Moderno & Futurista",
    ];
    new TypeWriter(txtElement, words, 2000);
  }
});

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

/*===== PARALLAX EFFECT =====*/
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".hero__shape");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

/*===== INTERSECTION OBSERVER FOR ANIMATIONS =====*/
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = "running";
      entry.target.classList.add("animate");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".about__stat, .tech__feature, .gallery__item")
  .forEach((el) => {
    observer.observe(el);
  });

/*===== COUNTER ANIMATION =====*/
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    element.textContent = Math.floor(start) + "+";

    if (start >= target) {
      element.textContent = target + "+";
      clearInterval(timer);
    }
  }, 16);
}

// Initialize counters when they come into view
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const target = parseInt(entry.target.getAttribute("data-target"));
        animateCounter(entry.target, target);
        entry.target.classList.add("counted");
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".about__stat-number").forEach((counter, index) => {
  const targets = [150, 50, 5];
  counter.setAttribute("data-target", targets[index]);
  counterObserver.observe(counter);
});

/*===== MAGNETIC BUTTONS =====*/
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0px, 0px)";
  });
});

/*===== CURSOR EFFECT =====*/
const cursor = document.createElement("div");
cursor.className = "custom-cursor";
document.body.appendChild(cursor);

const cursorFollower = document.createElement("div");
cursorFollower.className = "cursor-follower";
document.body.appendChild(cursorFollower);

let mouseX = 0,
  mouseY = 0;
let followerX = 0,
  followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";

  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor interactions
document.querySelectorAll("a, button, .gallery__item").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
    cursorFollower.classList.add("cursor-hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
    cursorFollower.classList.remove("cursor-hover");
  });
});

/*===== LOADING ANIMATION =====*/
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.className = "page-loader";
  loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-logo">
                <span>Mário Lopes</span>
                <span>Design & IA</span>
            </div>
            <div class="loader-progress">
                <div class="loader-bar"></div>
            </div>
        </div>
    `;

  document.body.appendChild(loader);

  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.remove();
    }, 500);
  }, 2000);
});

/*===== PERFORMANCE OPTIMIZATION =====*/
// Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
window.addEventListener(
  "scroll",
  throttle(() => {
    scrollActive();
    scrollHeader();
    scrollTop();
  }, 16)
);

/*===== ACCESSIBILITY IMPROVEMENTS =====*/
// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    navMenu.classList.remove("show-menu");
  }
});

// Focus management
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("focus", () => {
    link.classList.add("focused");
  });

  link.addEventListener("blur", () => {
    link.classList.remove("focused");
  });
});

/*===== WHATSAPP INTEGRATION =====*/
function openWhatsApp(message = "") {
  const phoneNumber = "5511999999999";
  const defaultMessage =
    "Olá! Gostaria de fazer um orçamento para design gráfico.";
  const finalMessage = message || defaultMessage;
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    finalMessage
  )}`;
  window.open(url, "_blank");
}

// Add click events to WhatsApp buttons
document.querySelectorAll('a[href*="wa.me"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const href = btn.getAttribute("href");
    const message = href.split("text=")[1]
      ? decodeURIComponent(href.split("text=")[1])
      : "";
    openWhatsApp(message);
  });
});

/*===== FORM VALIDATION (if needed) =====*/
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/*===== LAZY LOADING IMAGES =====*/
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove("lazy");
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll("img[data-src]").forEach((img) => {
  imageObserver.observe(img);
});
