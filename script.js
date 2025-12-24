(function() {
    'use strict';
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        const revealElements = document.querySelectorAll('.section-reveal');
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        const revealElements = document.querySelectorAll('.section-reveal');
        revealElements.forEach(el => el.classList.add('revealed'));
    }
    
    const nav = document.getElementById('nav');
    let lastScrollY = window.scrollY;
    
    function updateNavState() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavState();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                contactForm.reset();
            }, 300);
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        });
    }
    
    if (!prefersReducedMotion) {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');

                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const navHeight = nav.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    updateNavState();
    
    console.log('Vegapunk landing page initialized');
    
})();
