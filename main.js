// ===========================
// PARALLAX SCROLL EFFECTS
// ===========================

let scrollPosition = 0;
let ticking = false;

window.addEventListener('scroll', () => {
scrollPosition = window.pageYOffset;

if (!ticking) {
window.requestAnimationFrame(() => {
updateParallax();
ticking = false;
});
ticking = true;
}
});

function updateParallax() {
// Pizza cards parallax
const pizzaCards = document.querySelectorAll('.pizza-card');

pizzaCards.forEach(card => {
const speed = parseFloat(card.dataset.speed) || 0.5;
const rect = card.getBoundingClientRect();
const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;

if (scrollPercent > 0 && scrollPercent < 2) {
const yPos = -(scrollPosition * speed * 0.3);
card.style.transform = `translateY(${yPos}px)`;
}
});

// Background parallax
const parallaxBg = document.querySelector('.parallax-bg');
if (parallaxBg) {
parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
}
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
const currentScroll = window.pageYOffset;

if (currentScroll > 100) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}

lastScroll = currentScroll;
});

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));

if (target) {
const offsetTop = target.offsetTop - 80;
window.scrollTo({
top: offsetTop,
behavior: 'smooth'
});
}
});
});

// ===========================
// STATS COUNTER ANIMATION
// ===========================

const animateCounter = (element) => {
const target = parseFloat(element.dataset.target);
const duration = 2000;
const start = 0;
const startTime = performance.now();

const animate = (currentTime) => {
const elapsed = currentTime - startTime;
const progress = Math.min(elapsed / duration, 1);

// Easing function
const easeOutQuart = 1 - Math.pow(1 - progress, 4);
const current = start + (target - start) * easeOutQuart;

// Format number based on target
if (target % 1 !== 0) {
element.textContent = current.toFixed(1);
} else {
element.textContent = Math.floor(current);
}

if (progress < 1) {
requestAnimationFrame(animate);
} else {
element.textContent = target % 1 !== 0 ? target.toFixed(1) : target;
}
};

requestAnimationFrame(animate);
};

// Intersection Observer for stats
const statsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const statNumber = entry.target;
animateCounter(statNumber);
statsObserver.unobserve(statNumber);
}
});
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
statsObserver.observe(stat);
});

// ===========================
// MENU CATEGORY FILTER
// ===========================

const categoryButtons = document.querySelectorAll('.category-btn');
const menuItems = document.querySelectorAll('.menu-item');

categoryButtons.forEach(button => {
button.addEventListener('click', () => {
const category = button.dataset.category;

// Update active button
categoryButtons.forEach(btn => btn.classList.remove('active'));
button.classList.add('active');

// Filter menu items
menuItems.forEach(item => {
const itemCategory = item.dataset.category;

if (category === 'all' || itemCategory === category) {
item.classList.remove('hidden');
item.style.animation = 'none';
setTimeout(() => {
item.style.animation = 'fadeInUp 0.6s ease-out forwards';
}, 10);
} else {
item.classList.add('hidden');
}
});
});
});

// ===========================
// GALLERY INFINITE SCROLL
// ===========================

const galleryTrack = document.getElementById('gallery-track');

if (galleryTrack) {
// Clone gallery items for seamless loop
const galleryCards = Array.from(galleryTrack.children);
galleryCards.forEach(card => {
const clone = card.cloneNode(true);
galleryTrack.appendChild(clone);
});
}

// ===========================
// PIZZA CARDS MOUSE INTERACTION
// ===========================

document.querySelectorAll('.pizza-card').forEach(card => {
card.addEventListener('mousemove', (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 10;
const rotateY = (centerX - x) / 10;

card.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
scale(1.05)
`;
});

card.addEventListener('mouseleave', () => {
card.style.transform = '';
});
});

// ===========================
// MENU CARDS TILT EFFECT
// ===========================

document.querySelectorAll('.menu-item').forEach(card => {
card.addEventListener('mousemove', (e) => {
const rect = card.getBoundingClientRect();
const x = e.clientX - rect.left;
const y = e.clientY - rect.top;

const centerX = rect.width / 2;
const centerY = rect.height / 2;

const rotateX = (y - centerY) / 20;
const rotateY = (centerX - x) / 20;

card.style.transform = `
perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)
`;
});

card.addEventListener('mouseleave', () => {
card.style.transform = '';
});
});

// ===========================
// INTERSECTION OBSERVER ANIMATIONS
// ===========================

const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0)';
}
});
}, observerOptions);

// Observe elements
const observeElements = [
'.section-header',
'.contact-item',
'.stat-item'
];

observeElements.forEach(selector => {
document.querySelectorAll(selector).forEach(el => {
el.style.opacity = '0';
el.style.transform = 'translateY(30px)';
el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
fadeInObserver.observe(el);
});
});

// ===========================
// MOBILE MENU TOGGLE
// ===========================

const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

if (burger) {
burger.addEventListener('click', () => {
burger.classList.toggle('active');
if (navLinks) {
navLinks.classList.toggle('mobile-active');
}
});
}

// ===========================
// PARALLAX MOUSE MOVE
// ===========================

document.addEventListener('mousemove', (e) => {
const mouseX = e.clientX / window.innerWidth;
const mouseY = e.clientY / window.innerHeight;

// Move floating elements
const floatItems = document.querySelectorAll('.float-item');
floatItems.forEach((item, index) => {
const speed = (index + 1) * 0.5;
const x = (mouseX - 0.5) * speed * 50;
const y = (mouseY - 0.5) * speed * 50;

item.style.transform = `translate(${x}px, ${y}px)`;
});
});

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================

function createScrollProgress() {
const progressBar = document.createElement('div');
progressBar.style.cssText = `
position: fixed;
top: 0;
left: 0;
width: 0%;
height: 3px;
background: linear-gradient(90deg, var(--primary), var(--secondary));
z-index: 9999;
transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrolled = (window.pageYOffset / scrollHeight) * 100;
progressBar.style.width = `${scrolled}%`;
});
}

createScrollProgress();

// ===========================
// LAZY LOADING IMAGES
// ===========================

const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
img.src = img.dataset.src || img.src;
img.classList.add('loaded');
observer.unobserve(img);
}
});
});

document.querySelectorAll('img').forEach(img => {
imageObserver.observe(img);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
let inThrottle;
return function() {
const args = arguments;
const context = this;
if (!inThrottle) {
func.apply(context, args);
inThrottle = true;
setTimeout(() => inThrottle = false, limit);
}
};
}

// ===========================
// PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
document.body.style.opacity = '0';
setTimeout(() => {
document.body.style.transition = 'opacity 0.5s ease';
document.body.style.opacity = '1';
}, 100);
});

// ===========================
// SCROLL TO TOP BUTTON
// ===========================

function createScrollToTop() {
const button = document.createElement('button');
button.innerHTML = 'â†‘';
button.style.cssText = `
position: fixed;
bottom: 2rem;
right: 2rem;
width: 50px;
height: 50px;
border-radius: 50%;
background: var(--primary);
color: white;
border: none;
font-size: 1.5rem;
cursor: pointer;
opacity: 0;
transition: all 0.3s ease;
z-index: 999;
box-shadow: 0 4px 20px rgba(230, 57, 70, 0.3);
`;

button.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});

window.addEventListener('scroll', () => {
if (window.pageYOffset > 500) {
button.style.opacity = '1';
button.style.pointerEvents = 'auto';
} else {
button.style.opacity = '0';
button.style.pointerEvents = 'none';
}
});

document.body.appendChild(button);
}

createScrollToTop();

// ===========================
// CONSOLE BRANDING
// ===========================

console.log('%cðŸ • O\'212 Pizzeria',
'font-size: 24px; font-weight: bold; color: #E63946; text-shadow: 0 0 10px rgba(230,57,70,0.5);'
);
console.log('%cLanding Page v2.0',
'font-size: 14px; color: #2A9D8F;'
);
console.log('%cDÃ©veloppÃ© avec â ¤ï¸ par Claude AI',
'font-size: 12px; color: #888;'
);

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
console.log('âœ… Site chargÃ© avec succÃ¨s');

// Add loaded class to body
setTimeout(() => {
document.body.classList.add('loaded');
}, 100);

// Initialize all animations
updateParallax();
});

// ===========================
// ERROR HANDLING
// ===========================

window.addEventListener('error', (e) => {
console.error('Erreur dÃ©tectÃ©e:', e.message);
});

// ===========================
// RESIZE HANDLER
// ===========================

const handleResize = debounce(() => {
// Update parallax on resize
updateParallax();
}, 250);

window.addEventListener('resize', handleResize);
