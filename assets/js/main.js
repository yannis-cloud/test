/* ============================= */
/* SMOOTH SCROLL INERTIA (Framer Motion style) */
/* ============================= */

let scrollTarget = window.scrollY;
let scrollCurrent = window.scrollY;
const scrollEase = 0.08;

function smoothScroll() {
  scrollCurrent += (scrollTarget - scrollCurrent) * scrollEase;
  
  if (Math.abs(scrollTarget - scrollCurrent) < 0.5) {
    scrollCurrent = scrollTarget;
  }
  
  document.documentElement.style.setProperty('--scroll', scrollCurrent);
  
  requestAnimationFrame(smoothScroll);
}

window.addEventListener('scroll', () => {
  scrollTarget = window.scrollY;
});

smoothScroll();

/* ============================= */
/* CURSOR GLOW WITH TRAIL */
/* ============================= */

const cursor = document.querySelector(".cursor");
const cursorTrail = document.querySelector(".cursor-trail");

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursorTrail.style.left = e.clientX + "px";
  cursorTrail.style.top = e.clientY + "px";
  cursorTrail.style.opacity = "1";
});

function animateCursor() {
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  
  cursorX += dx * 0.1;
  cursorY += dy * 0.1;
  
  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

// Enlarge cursor on hover
document.querySelectorAll('a, button, .card, .tool').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '350px';
    cursor.style.height = '350px';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '280px';
    cursor.style.height = '280px';
  });
});

/* ============================= */
/* PROGRESSIVE TEXT TYPING EFFECT */
/* ============================= */

// Text appears progressively with CSS animation
// The typewriter effect is handled by CSS @keyframes
// No JavaScript needed for the main typing effect

// But we can add sound effect or additional interactions here if needed
const typewriterLine = document.querySelector('.typewriter-line');

if (typewriterLine) {
  // Add completion event
  setTimeout(() => {
    typewriterLine.style.borderRight = 'none';
  }, 3000);
}

/* ============================= */
/* REVEAL ON SCROLL */
/* ============================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("show");
      }, index * 100);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => {
  observer.observe(el);
});

/* ============================= */
/* NAVBAR ACTIVE HIGHLIGHT */
/* ============================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu a");

window.addEventListener("scroll", () => {
  let current = "";
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(a => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

/* ============================= */
/* PROGRESS BAR */
/* ============================= */

const progress = document.querySelector(".progress");

window.addEventListener("scroll", () => {
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const progressHeight = (window.pageYOffset / totalHeight) * 100;
  progress.style.width = progressHeight + "%";
});

/* ============================= */
/* 3D TILT EFFECT ON CARDS */
/* ============================= */

const tiltElements = document.querySelectorAll("[data-tilt]");

tiltElements.forEach(el => {
  el.addEventListener("mousemove", handleTilt);
  el.addEventListener("mouseleave", resetTilt);
});

function handleTilt(e) {
  const rect = this.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;
  
  this.style.transform = `
    perspective(1000px) 
    rotateX(${rotateX}deg) 
    rotateY(${rotateY}deg) 
    translateY(-8px)
    scale3d(1.02, 1.02, 1.02)
  `;
  
  // Update spotlight position
  if (this.querySelector('.card-glow')) {
    this.style.setProperty("--x", x + "px");
    this.style.setProperty("--y", y + "px");
  }
}

function resetTilt() {
  this.style.transform = `
    perspective(1000px) 
    rotateX(0deg) 
    rotateY(0deg) 
    translateY(0px)
    scale3d(1, 1, 1)
  `;
}

/* ============================= */
/* SPOTLIGHT EFFECT ON CARDS */
/* ============================= */

document.querySelectorAll(".spotlight, .card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--x", x + "px");
    card.style.setProperty("--y", y + "px");
  });
});

/* ============================= */
/* PARALLAX MESH BACKGROUND */
/* ============================= */

const mesh = document.querySelector(".mesh");

window.addEventListener("scroll", () => {
  const offset = window.scrollY * 0.3;
  mesh.style.transform = `translateY(${offset}px)`;
});

/* ============================= */
/* ENHANCED LOGO ANIMATION */
/* ============================= */

const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

/* ============================= */
/* SMOOTH ANCHOR LINKS */
/* ============================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    
    if (target) {
      const offsetTop = target.offsetTop - 100;
      
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  });
});

/* ============================= */
/* ENHANCED STATS COUNTER ANIMATION */
/* ============================= */

const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      
      numbers.forEach(num => {
        const target = parseInt(num.getAttribute('data-target'));
        let current = 0;
        const increment = target / 60;
        const duration = 2000;
        const stepTime = duration / 60;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            if (target === 100) {
              num.textContent = target + "%";
            } else {
              num.textContent = target + "+";
            }
            clearInterval(counter);
          } else {
            if (target === 100) {
              num.textContent = Math.floor(current) + "%";
            } else {
              num.textContent = Math.floor(current) + "+";
            }
          }
        }, stepTime);
      });
      
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  statsObserver.observe(heroStats);
}

/* ============================= */
/* DYNAMIC GRADIENT MESH ANIMATION */
/* ============================= */

let meshTime = 0;

function animateMesh() {
  meshTime += 0.001;
  
  const mesh = document.querySelector('.mesh');
  if (mesh) {
    const rotation = Math.sin(meshTime) * 10;
    mesh.style.filter = `blur(${120 + Math.sin(meshTime * 2) * 20}px) hue-rotate(${rotation}deg)`;
  }
  
  requestAnimationFrame(animateMesh);
}

animateMesh();

/* ============================= */
/* PERFORMANCE OPTIMIZATION */
/* ============================= */

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

// Lazy load images
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

/* ============================= */
/* KEYBOARD NAVIGATION */
/* ============================= */

document.addEventListener('keydown', (e) => {
  // ESC to scroll to top
  if (e.key === 'Escape') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
});

/* ============================= */
/* CONSOLE EASTER EGG */
/* ============================= */

console.log(`
%c
  ╔═══════════════════════════════════════╗
  ║                                       ║
  ║   👋 Hi! I'm Yannis Albert           ║
  ║   📊 Data, Analytics & AI Engineer   ║
  ║   🚀 Building data-driven solutions  ║
  ║                                       ║
  ║   📧 yannis.albert78@gmail.com       ║
  ║   💼 Open to opportunities           ║
  ║                                       ║
  ╚═══════════════════════════════════════╝
`,
'color: #2A7BFF; font-family: monospace; font-size: 12px; font-weight: bold;'
);

console.log('%cLiked what you see? Let\'s connect! 🤝', 'color: #00D4FF; font-size: 16px; font-weight: bold;');
