document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Add active state to current nav link
    setActiveNavLink();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
    
    // Initialize language switcher
    initializeLanguageSwitcher();
});

function initializeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeLanguageSwitcher() {
    const currentLang = localStorage.getItem('language') || 'fr';
    updateContent(currentLang);
    
    document.getElementById('langSwitch')?.addEventListener('click', function() {
        const newLang = currentLang === 'fr' ? 'en' : 'fr';
        localStorage.setItem('language', newLang);
        updateContent(newLang);
    });
}

function updateContent(lang) {
    const translations = {
        fr: {
            home: 'Accueil',
            privacy: 'Politique de Confidentialité',
            download: 'Télécharger l\'application',
            // Add more translations as needed
        },
        en: {
            home: 'Home',
            privacy: 'Privacy Policy',
            download: 'Download App',
            // Add more translations as needed
        }
    };
    
    // Update text content based on selected language
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// Add dynamic header effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'white';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});
