// Apple-inspired JavaScript with smooth interactions and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
        this.setupThemeToggle();
    }

    // Navigation functionality
    setupNavigation() {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            this.animateHamburger(navToggle);
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                this.resetHamburger(navToggle);
            });
        });

        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentScrollY > 100) {
                if (currentTheme === 'dark') {
                    nav.style.background = 'rgba(26, 26, 26, 0.95)';
                    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.95)';
                    nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            } else {
                if (currentTheme === 'dark') {
                    nav.style.background = 'rgba(26, 26, 26, 0.9)';
                    nav.style.boxShadow = 'none';
                } else {
                    nav.style.background = 'rgba(255, 255, 255, 0.8)';
                    nav.style.boxShadow = 'none';
                }
            }

            // Hide/show navbar on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Theme Toggle functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Get saved theme from localStorage or use system preference
        const currentTheme = localStorage.getItem('theme') || 
                           (prefersDark.matches ? 'dark' : 'light');
        
        // Set initial theme
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Theme toggle click handler
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Add transition class for smooth theme change
            document.documentElement.classList.add('theme-transition');
            
            // Change theme
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Add button animation
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
            
            // Remove transition class after animation
            setTimeout(() => {
                document.documentElement.classList.remove('theme-transition');
            }, 300);
            
            // Update navbar background based on theme
            this.updateNavbarForTheme(newTheme);
        });
        
        // Listen for system theme changes
        prefersDark.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                this.updateNavbarForTheme(newTheme);
            }
        });
        
        // Initial navbar update
        this.updateNavbarForTheme(currentTheme);
    }
    
    updateNavbarForTheme(theme) {
        const nav = document.getElementById('nav');
        const scrollY = window.scrollY;
        
        if (theme === 'dark') {
            if (scrollY > 100) {
                nav.style.background = 'rgba(26, 26, 26, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                nav.style.background = 'rgba(26, 26, 26, 0.9)';
                nav.style.boxShadow = 'none';
            }
        } else {
            if (scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
                nav.style.boxShadow = 'none';
            }
        }
    }

    animateHamburger(toggle) {
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    }

    resetHamburger(toggle) {
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }

    // Scroll effects and parallax
    setupScrollEffects() {
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
            this.parallaxEffect();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Animate hero card on scroll
        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            const cardRate = Math.max(0, scrolled * 0.1);
            heroCard.style.transform = `translateY(${cardRate}px) scale(${Math.max(0.9, 1 - scrolled * 0.0005)})`;
        }
    }

    // Form handling with validation
    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (this.validateForm(data)) {
                await this.submitForm(data);
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateForm(data) {
        let isValid = true;
        const form = document.getElementById('contact-form');

        // Clear previous errors
        form.querySelectorAll('.error').forEach(error => error.remove());

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            this.showFieldError('name', 'Please enter a valid name');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            this.showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Subject validation
        if (!data.subject || data.subject.trim().length < 5) {
            this.showFieldError('subject', 'Please enter a subject (at least 5 characters)');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            this.showFieldError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        switch (field.name) {
            case 'name':
                if (value.length < 2) {
                    this.showFieldError(field.name, 'Name must be at least 2 characters');
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showFieldError(field.name, 'Please enter a valid email address');
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 5) {
                    this.showFieldError(field.name, 'Subject must be at least 5 characters');
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    this.showFieldError(field.name, 'Message must be at least 10 characters');
                    isValid = false;
                }
                break;
        }

        if (isValid) {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(fieldName, message) {
        const field = document.querySelector(`[name="${fieldName}"]`);
        const formGroup = field.closest('.form-group');
        
        // Remove existing error
        const existingError = formGroup.querySelector('.error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.style.cssText = `
            color: #dc3545;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            animation: fadeInUp 0.3s ease-out;
        `;
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
        field.style.borderColor = '#dc3545';
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        const error = formGroup.querySelector('.error');
        if (error) {
            error.remove();
        }
        field.style.borderColor = '';
    }

    async submitForm(data) {
        const submitButton = document.querySelector('#contact-form button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';

        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(data);
            
            // Show success message
            this.showSuccessMessage();
            document.getElementById('contact-form').reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('Failed to send message. Please try again.');
        } finally {
            // Reset button
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            }, 1000);
        }
    }

    async simulateFormSubmission(data) {
        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form submitted:', data);
                resolve();
            }, 1500);
        });
    }

    showSuccessMessage() {
        this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
            max-width: 350px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation for child elements
                    this.staggerChildAnimations(entry.target);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const animateElements = document.querySelectorAll(
            '.section-header, .about-content, .role-card, .project-card, .interest-card, .contact-content, .achievement-item, .skills-category'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            observer.observe(el);
        });
    }

    staggerChildAnimations(parent) {
        const children = parent.querySelectorAll('.project-card, .interest-card, .value-item, .skill-tag, .achievement-item');
        
        children.forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.style.animation = 'fadeInUp 0.6s ease-out forwards';
        });
    }

    // Enhanced animations and micro-interactions
    setupAnimations() {
        this.setupHoverEffects();
        this.setupScrollProgress();
        this.setupTypingEffect();
        this.setupCounterAnimations();
    }

    setupHoverEffects() {
        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', (e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add tilt effect to cards
        const cards = document.querySelectorAll('.project-card, .interest-card, .hero-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #122F57, #1C4E80, #4A78B0);
            z-index: 1001;
            transition: width 0.1s ease-out;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;

        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let i = 0;
        const typeInterval = setInterval(() => {
            heroTitle.textContent = text.slice(0, i + 1);
            i++;
            
            if (i >= text.length) {
                clearInterval(typeInterval);
                heroTitle.classList.add('typing-complete');
            }
        }, 100);
    }

    setupCounterAnimations() {
        const metricValue = document.querySelector('.metric-value');
        if (!metricValue) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(metricValue);
    }

    animateCounter(element) {
        const target = 30; // $30M
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = `~$${Math.ceil(current)}M`;
            
            if (current >= target) {
                element.textContent = '~$30M';
                clearInterval(timer);
            }
        }, 50);
    }

    // Smooth scrolling for anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Utility functions
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
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
    },

    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Additional CSS animations via JavaScript
const additionalStyles = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }

    .typing-complete::after {
        content: '|';
        animation: blink 1s infinite;
        color: #4A78B0;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle window resize
window.addEventListener('resize', utils.debounce(() => {
    // Reset any transforms that might break on resize
    document.querySelectorAll('[style*="transform"]').forEach(el => {
        if (el.classList.contains('nav') || el.classList.contains('hero')) return;
        el.style.transform = '';
    });
}, 250));

// Performance optimizations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Lazy load non-critical resources
        console.log('✨ Portfolio loaded and optimized');
    });
}

// Export for potential use in other scripts
window.PortfolioApp = PortfolioApp;
