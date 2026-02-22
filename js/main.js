/* ========================================
   JAVASCRIPT - Ti Milo Restaurant
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🌴 Ti Milo Website Loaded');
    
    // ========================================
    // 1. SMOOTH SCROLL NAVIGATION
    // ========================================
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========================================
    // 2. HEADER SCROLL EFFECT
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ========================================
    // 3. BUTTON INTERACTIONS
    // ========================================
    const btnCommander = document.querySelector('.btn-commander');
    const btnContact = document.querySelector('.btn-contact');
    const btnPrimary = document.querySelectorAll('.btn-primary');

    function openWhatsApp() {
        const phone = '33981598314';
        const message = 'Bonjour, je souhaite commander chez Ti Milo!';
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    if (btnCommander) {
        btnCommander.addEventListener('click', openWhatsApp);
    }

    if (btnContact) {
        btnContact.addEventListener('click', openWhatsApp);
    }

    btnPrimary.forEach(btn => {
        if (btn !== btnCommander && btn !== btnContact) {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('href') || '#menu';
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // ========================================
    // 4. MENU ITEMS HOVER EFFECT
    // ========================================
    const menuItems = document.querySelectorAll('.menu-item');

    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ========================================
    // 5. CARDS ANIMATION ON SCROLL
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer menu items
    menuItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'all 0.3s ease';
        observer.observe(item);
    });

    // Observer histoire cards
    const histoireCards = document.querySelectorAll('.histoire-card');
    histoireCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';
        observer.observe(card);
    });

    // Observer avis cards
    const avisCards = document.querySelectorAll('.avis-card');
    avisCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.3s ease';
        observer.observe(card);
    });

    // ========================================
    // 6. HERO BUTTON ACTIONS
    // ========================================
    const heroBtns = document.querySelectorAll('.hero-buttons .btn');
    
    heroBtns.forEach((btn, index) => {
        if (index === 0) {
            // "Découvrir le Menu" button
            btn.addEventListener('click', function() {
                document.querySelector('#menu').scrollIntoView({ behavior: 'smooth' });
            });
        } else if (index === 1) {
            // "Nous Trouver" button
            btn.addEventListener('click', function() {
                document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
            });
        }
    });

    // ========================================
    // 7. PHONE LINK HANDLER
    // ========================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Sur mobile, laisser le lien par défaut
            if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                e.preventDefault();
                console.log('📞 Call: ' + this.getAttribute('href'));
            }
        });
    });

    // ========================================
    // 8. ACTIVE NAV LINK ON SCROLL
    // ========================================
    function updateActiveNav() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ========================================
    // 9. SCROLL TO TOP BUTTON
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
            background: #C85A3A;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: bold;
            display: none;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(200, 90, 58, 0.3);
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(200, 90, 58, 0.4)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(200, 90, 58, 0.3)';
        });
    }

    createScrollToTopButton();

    // ========================================
    // 10. CONSOLE STYLING
    // ========================================
    console.log('%c🌴 Ti Milo - Spécialités Antillaises', 'color: #C85A3A; font-size: 18px; font-weight: bold;');
    console.log('%c📍 25 Rue Ambroise Croizat, 78280 Guyancourt', 'color: #2C3E50; font-size: 12px;');
    console.log('%c📞 09 81 59 83 14', 'color: #C85A3A; font-size: 12px;');
    console.log('%c⭐ Noté 4.8/5', 'color: #FFD60A; font-size: 12px;');
});

// ========================================
// 11. PAGE PERFORMANCE LOGGING
// ========================================
window.addEventListener('load', function() {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`✅ Page loaded in ${pageLoadTime}ms`);
});

// ========================================
// 12. LAZY LOAD IMAGE OPTIMIZATION
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
