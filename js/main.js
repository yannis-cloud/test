/* ========================================
   SCRIPT PRINCIPAL - Ti Milo Restaurant
   ======================================== */

// ========================================
// 1. SMOOTH SCROLL & NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌴 Ti Milo Website Loaded');
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ========================================
// 2. BUTTON INTERACTIONS
// ========================================

// CTA Buttons - Menu
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.cta-buttons .btn-primary');
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // CTA Buttons - Contact
    const contactBtn = document.querySelector('.cta-buttons .btn-secondary');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

// ========================================
// 3. ACTIVE NAV INDICATOR
// ========================================

window.addEventListener('scroll', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = '';

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// ========================================
// 4. MENU CARD INTERACTIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuCards = document.querySelectorAll('.menu-card');
    
    menuCards.forEach((card, index) => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            const emoji = this.querySelector('.menu-emoji');
            if (emoji) {
                emoji.style.animation = 'floatRotate 0.6s ease-in-out';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Click to select
        card.addEventListener('click', function() {
            const title = this.querySelector('h3').textContent;
            console.log(`📍 Selected: ${title}`);
            this.style.borderColor = 'var(--accent-lime)';
            
            setTimeout(() => {
                this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }, 1000);
        });
    });
});

// ========================================
// 5. ABOUT CARD ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const aboutCards = document.querySelectorAll('.about-card');
    
    aboutCards.forEach((card, index) => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.about-icon');
            if (icon) {
                icon.style.animation = 'rotateIcon 0.8s ease-in-out';
            }
        });

        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.about-icon');
            if (icon) {
                icon.style.animation = 'floatRotate 4s ease-in-out infinite';
            }
        });
    });
});

// ========================================
// 6. LAZY LOADING ANIMATIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Ajouter des animations à la première visite
            if (!entry.target.hasAttribute('data-animated')) {
                entry.target.setAttribute('data-animated', 'true');
            }
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    fadeElements.forEach(el => observer.observe(el));
});

// ========================================
// 7. SCROLL TO TOP BUTTON
// ========================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--accent-orange), var(--accent-pink));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 5px 20px rgba(255, 87, 34, 0.4);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            button.style.display = 'flex';
            button.style.alignItems = 'center';
            button.style.justifyContent = 'center';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.boxShadow = '0 10px 40px rgba(255, 87, 34, 0.7)';
    });

    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 5px 20px rgba(255, 87, 34, 0.4)';
    });
}

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ========================================
// 8. PHONE NUMBER CLICK
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('📞 Calling: ' + this.getAttribute('href'));
        });

        link.addEventListener('mouseenter', function() {
            this.style.fontSize = '1.2rem';
            this.style.color = 'var(--accent-lime)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.fontSize = '1.1rem';
            this.style.color = 'var(--accent-cyan)';
        });
    });
});

// ========================================
// 9. FORM INTERACTIONS (si ajout futur)
// ========================================

function setupFormInteractions() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('📧 Form submitted');
            
            // Ajouter ici la logique d'envoi du formulaire
            alert('Merci pour votre message! Nous vous recontacterons bientôt.');
            form.reset();
        });
    });
}

document.addEventListener('DOMContentLoaded', setupFormInteractions);

// ========================================
// 10. RESPONSIVE MENU TOGGLE
// ========================================

function setupMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    
    // Créer un bouton hamburger pour mobile
    const header = document.querySelector('header');
    const hamburger = document.createElement('button');
    hamburger.innerHTML = '☰';
    hamburger.className = 'hamburger-menu';
    hamburger.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;

    // Insérer avant les nav-links
    if (navLinks) {
        navLinks.parentElement.insertBefore(hamburger, navLinks);
    }

    // Afficher le hamburger sur mobile
    function updateMenuVisibility() {
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
        }
    }

    updateMenuVisibility();
    window.addEventListener('resize', updateMenuVisibility);

    hamburger.addEventListener('click', function() {
        if (navLinks.style.display === 'none' || navLinks.style.display === '') {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '1rem';
            navLinks.style.zIndex = '999';
        } else {
            navLinks.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', setupMobileMenu);

// ========================================
// 11. CONTACT BUTTON ACTION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const commandBtn = document.querySelector('.contact-section .btn-primary');
    if (commandBtn) {
        commandBtn.addEventListener('click', function() {
            const phone = '33981598314';
            const message = 'Bonjour, je suis intéressé par votre menu!';
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }
});

// ========================================
// 12. ANIMATIONS AU SCROLL
// ========================================

function addScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInMassive 0.8s ease-out';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        scrollObserver.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', addScrollAnimations);

// ========================================
// 13. EFFECT PARTICULES AU HOVER (OPTIONNEL)
// ========================================

function addParticleEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Créer un effet de ripple
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                pointer-events: none;
                animation: rippleEffect 0.6s ease-out;
            `;
            
            this.style.position = 'relative';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', addParticleEffects);

// ========================================
// 14. LOG DE INTERACTIONS
// ========================================

window.addEventListener('load', function() {
    console.log('%c🌴 Ti Milo - Spécialités Antillaises', 'color: #FF5722; font-size: 20px; font-weight: bold;');
    console.log('%cBienvenue sur le site web de Ti Milo!', 'color: #00D9FF; font-size: 14px;');
    console.log('%cAdresse: 25 Rue Ambroise Croizat, 78280 Guyancourt', 'color: #00FF41;');
    console.log('%cTéléphone: 09 81 59 83 14', 'color: #FFD60A;');
});

// ========================================
// 15. SUPPORT ÉVÉNEMENTS CLAVIER
// ========================================

document.addEventListener('keydown', function(e) {
    // Raccourci clavier pour revenir à l'accueil (Home key)
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Raccourci pour aller au contact (C key)
    if (e.key === 'c' || e.key === 'C') {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Raccourci pour aller au menu (M key)
    if (e.key === 'm' || e.key === 'M') {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// ========================================
// 16. PERFORMANCE & OPTIMISATION
// ========================================

// Throttle function pour optimiser les événements
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
    }
}

// Appliquer throttle au scroll
window.addEventListener('scroll', throttle(function() {
    // Vos événements scroll optimisés ici
}, 100));

console.log('✅ Tous les scripts sont chargés avec succès!');
