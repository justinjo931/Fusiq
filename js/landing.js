/**
 * landing.js - Interactions and animations for FUSIQ AI landing page
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll-triggered animations using IntersectionObserver
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const animationClass = element.getAttribute('data-animate');
                const staggerDelay = element.getAttribute('data-stagger');
                
                if (animationClass) {
                    // Add animation class
                    element.classList.add(animationClass);
                    
                    // Add stagger class if present
                    if (staggerDelay) {
                        element.classList.add(`stagger-${staggerDelay}`);
                    }
                    
                    // Make element visible (assuming it starts with opacity 0)
                    element.style.opacity = '1';
                    
                    // Unobserve after animating once
                    observer.unobserve(element);
                }
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Slightly earlier trigger on mobile
    });
    // Setup elements for animation
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => {
        // Prepare element for animation
        el.style.opacity = '0';
        animationObserver.observe(el);
    });
    // 2. Sticky nav scroll effect
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 4. Subtle parallax on hero mockup
        const mockup = document.getElementById('hero-mockup');
        if (mockup && window.scrollY < window.innerHeight) {
            const translateY = window.scrollY * 0.1;
            mockup.style.transform = `translateY(${translateY}px)`;
        }
    };
    // Initial check
    handleScroll();
    
    // Listen for scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    // 3. Smooth scroll for nav links
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    // 5. Mobile menu toggle (basic implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            // Placeholder for actual mobile menu implementation
            console.log('Toggle mobile menu');
            // A more complete implementation would toggle a class on the nav
            // to show/hide the links menu
        });
    }
});
