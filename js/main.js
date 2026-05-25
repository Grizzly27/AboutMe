// Apple-inspired JavaScript with smooth interactions and animations

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        // Enforce light theme permanently
        try { localStorage.setItem('theme', 'light'); } catch {}
        document.documentElement.setAttribute('data-theme', 'light');

        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
        this.setupAnimations();
        this.setupIntersectionObserver();
        this.setupSmoothScrolling();
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

        // Navbar scroll effect (always light theme)
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.8)';
                nav.style.boxShadow = 'none';
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

    // Theme toggling removed: app is permanently in light mode

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
        // Typing effect removed for a cleaner, stable hero title
        // this.setupTypingEffect();
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
            background: var(--color-accent);
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
        // Setup layer cycling for the forecast card
        this.setupLayerCycling();
        
        // Animate system architecture progress bars
        const progressBars = document.querySelectorAll('.indicator-bar');
        
        if (progressBars.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBars();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const heroCard = document.querySelector('.hero-card');
        if (heroCard) {
            observer.observe(heroCard);
        }
    }

    setupLayerCycling() {
        // Get all architecture sections
        const architectureSections = document.querySelectorAll('.system-architecture');
        if (architectureSections.length === 0) return;

        // Setup cycling for each section independently
        architectureSections.forEach((section, sectionIndex) => {
            const layers = section.querySelectorAll('.arch-layer');
            if (layers.length === 0) return;

            let currentIndex = 0;
            
            // Start cycling after initial load with staggered timing
            setTimeout(() => {
                setInterval(() => {
                    // Hide current layer
                    layers[currentIndex].classList.remove('active');
                    layers[currentIndex].classList.add('prev');
                    
                    // Move to next layer
                    currentIndex = (currentIndex + 1) % layers.length;
                    
                    // Show next layer
                    setTimeout(() => {
                        layers.forEach(layer => {
                            layer.classList.remove('prev', 'active');
                        });
                        layers[currentIndex].classList.add('active');
                    }, 250);
                    
                }, 4500); // Change every 4.5 seconds (increased from 3 seconds)
            }, 1000 + (sectionIndex * 500)); // Stagger each section by 500ms
        });
    }

    animateProgressBars() {
        const progressBars = document.querySelectorAll('.indicator-bar');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.animation = 'progress-fill 1.5s ease-out forwards';
            }, index * 200); // Stagger the animations
        });
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

// Removed JS-injected keyframes/typing styles for a cleaner, stable UI

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

const financeCompanies = {
    apex: {
        name: 'Apex Retirement Services',
        years: [
            { year: 2020, revenue: 860, expense: 682 },
            { year: 2021, revenue: 924, expense: 718 },
            { year: 2022, revenue: 998, expense: 761 },
            { year: 2023, revenue: 1088, expense: 817 },
            { year: 2024, revenue: 1172, expense: 872 },
            { year: 2025, revenue: 1265, expense: 931 }
        ],
        mix: [
            { label: 'Operations', value: 34 },
            { label: 'Technology', value: 24 },
            { label: 'Distribution', value: 18 },
            { label: 'Corporate', value: 14 },
            { label: 'Risk and Compliance', value: 10 }
        ]
    },
    harbor: {
        name: 'Harbor Insurance Group',
        years: [
            { year: 2020, revenue: 1320, expense: 1088 },
            { year: 2021, revenue: 1384, expense: 1126 },
            { year: 2022, revenue: 1448, expense: 1168 },
            { year: 2023, revenue: 1536, expense: 1219 },
            { year: 2024, revenue: 1618, expense: 1278 },
            { year: 2025, revenue: 1712, expense: 1344 }
        ],
        mix: [
            { label: 'Claims Operations', value: 31 },
            { label: 'Technology', value: 22 },
            { label: 'Customer Service', value: 19 },
            { label: 'Corporate', value: 16 },
            { label: 'Compliance', value: 12 }
        ]
    },
    summit: {
        name: 'Summit Wealth Platform',
        years: [
            { year: 2020, revenue: 540, expense: 432 },
            { year: 2021, revenue: 601, expense: 464 },
            { year: 2022, revenue: 653, expense: 492 },
            { year: 2023, revenue: 725, expense: 528 },
            { year: 2024, revenue: 812, expense: 577 },
            { year: 2025, revenue: 894, expense: 631 }
        ],
        mix: [
            { label: 'Product', value: 28 },
            { label: 'Technology', value: 27 },
            { label: 'Sales', value: 19 },
            { label: 'Client Success', value: 15 },
            { label: 'Corporate', value: 11 }
        ]
    }
};

const financeNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const financePercent = new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 });

document.addEventListener('DOMContentLoaded', () => {
    setupFinancialDashboard();
});

function setupFinancialDashboard() {
    const select = document.getElementById('company-select');
    const grid = document.getElementById('dashboard-widget-grid');
    if (!select || !grid) return;

    setupDashboardDragAndDrop(grid);
    select.addEventListener('change', () => renderFinancialDashboard(select.value));
    renderFinancialDashboard(select.value);
}

function buildForecast(company) {
    const actuals = company.years.map(row => ({ ...row, type: 'Actual' }));
    const revenueGrowth = trailingAverageGrowth(actuals, 'revenue');
    const expenseGrowth = trailingAverageGrowth(actuals, 'expense');
    const last = actuals[actuals.length - 1];
    const forecast = [];
    let revenue = last.revenue;
    let expense = last.expense;

    for (let i = 1; i <= 3; i += 1) {
        revenue = Math.round(revenue * (1 + revenueGrowth));
        expense = Math.round(expense * (1 + expenseGrowth));
        forecast.push({
            year: last.year + i,
            revenue,
            expense,
            type: 'Forecast'
        });
    }

    return { rows: [...actuals, ...forecast], revenueGrowth, expenseGrowth };
}

function trailingAverageGrowth(rows, key) {
    const rates = [];
    for (let i = rows.length - 3; i < rows.length; i += 1) {
        rates.push((rows[i][key] - rows[i - 1][key]) / rows[i - 1][key]);
    }
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
}

function renderFinancialDashboard(companyKey) {
    const company = financeCompanies[companyKey];
    const model = buildForecast(company);
    const actuals = model.rows.filter(row => row.type === 'Actual');
    const latest = actuals[actuals.length - 1];
    const prior = actuals[actuals.length - 2];
    const forecastEnd = model.rows[model.rows.length - 1];
    const margin = (latest.revenue - latest.expense) / latest.revenue;
    const priorMargin = (prior.revenue - prior.expense) / prior.revenue;

    renderDashboardKpis([
        { label: 'Revenue', value: `$${financeNumber.format(latest.revenue)}M`, note: `${formatGrowth(latest.revenue, prior.revenue)} YoY` },
        { label: 'Operating Expense', value: `$${financeNumber.format(latest.expense)}M`, note: `${formatGrowth(latest.expense, prior.expense)} YoY` },
        { label: 'Operating Margin', value: `${financePercent.format(margin * 100)}%`, note: `${formatSigned((margin - priorMargin) * 100)} pts YoY` },
        { label: '3Y Forecast Revenue', value: `$${financeNumber.format(forecastEnd.revenue)}M`, note: `${financePercent.format(model.revenueGrowth * 100)}% moving avg` },
        { label: 'Forecast Expense', value: `$${financeNumber.format(forecastEnd.expense)}M`, note: `${financePercent.format(model.expenseGrowth * 100)}% moving avg` }
    ]);

    renderDashboardChart(model.rows);
    renderExpenseMix(company.mix);
    renderDashboardInsights(company, model, margin);
    renderFinancialTable(model.rows);
}

function renderDashboardKpis(items) {
    const target = document.getElementById('dashboard-kpis');
    target.innerHTML = items.map(item => `
        <div class="dashboard-kpi">
            <span>${item.label}</span>
            <strong>${item.value}</strong>
            <small>${item.note}</small>
        </div>
    `).join('');
}

function renderDashboardChart(rows) {
    const svg = document.getElementById('trend-chart');
    const width = 760;
    const height = 320;
    const pad = { left: 58, right: 24, top: 26, bottom: 44 };
    const values = rows.flatMap(row => [row.revenue, row.expense]);
    const max = Math.max(...values) * 1.08;
    const min = Math.min(...values) * 0.92;
    const x = index => pad.left + (index * (width - pad.left - pad.right)) / (rows.length - 1);
    const y = value => height - pad.bottom - ((value - min) / (max - min)) * (height - pad.top - pad.bottom);
    const actualCount = rows.filter(row => row.type === 'Actual').length;
    const revenueActual = rows.slice(0, actualCount).map((row, index) => [x(index), y(row.revenue)]);
    const expenseActual = rows.slice(0, actualCount).map((row, index) => [x(index), y(row.expense)]);
    const revenueForecast = rows.slice(actualCount - 1).map((row, index) => [x(index + actualCount - 1), y(row.revenue)]);
    const expenseForecast = rows.slice(actualCount - 1).map((row, index) => [x(index + actualCount - 1), y(row.expense)]);
    const grid = [0, 0.25, 0.5, 0.75, 1].map(tick => {
        const yy = pad.top + tick * (height - pad.top - pad.bottom);
        const value = max - tick * (max - min);
        return `<line class="dashboard-axis" x1="${pad.left}" y1="${yy}" x2="${width - pad.right}" y2="${yy}"></line><text class="dashboard-chart-label" x="8" y="${yy + 4}">$${financeNumber.format(value)}M</text>`;
    }).join('');
    const labels = rows.map((row, index) => `<text class="dashboard-chart-label" x="${x(index) - 16}" y="${height - 12}">${row.year}</text>`).join('');

    svg.innerHTML = `
        ${grid}
        <line class="dashboard-axis" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line>
        <line x1="${x(actualCount - 1)}" y1="${pad.top}" x2="${x(actualCount - 1)}" y2="${height - pad.bottom}" stroke="#9aa7b8" stroke-dasharray="5 6"></line>
        <text class="dashboard-chart-label" x="${x(actualCount - 1) + 10}" y="${pad.top + 12}">Forecast</text>
        <path class="dashboard-line-revenue" d="${pointsToPath(revenueActual)}"></path>
        <path class="dashboard-line-revenue dashboard-forecast" d="${pointsToPath(revenueForecast)}"></path>
        <path class="dashboard-line-expense" d="${pointsToPath(expenseActual)}"></path>
        <path class="dashboard-line-expense dashboard-forecast" d="${pointsToPath(expenseForecast)}"></path>
        ${labels}
        <text x="${width - 190}" y="28" fill="#0A1628" font-size="14" font-weight="800">Revenue</text>
        <text x="${width - 95}" y="28" fill="#2f9f8f" font-size="14" font-weight="800">Expense</text>
    `;
}

function pointsToPath(points) {
    return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point[0].toFixed(1)},${point[1].toFixed(1)}`).join(' ');
}

function renderExpenseMix(mix) {
    const target = document.getElementById('expense-mix');
    target.innerHTML = mix.map(item => `
        <div class="mix-row">
            <div class="mix-label"><span>${item.label}</span><span>${item.value}%</span></div>
            <div class="mix-track"><div class="mix-fill" style="width:${item.value}%"></div></div>
        </div>
    `).join('');
}

function renderDashboardInsights(company, model, margin) {
    const actuals = model.rows.filter(row => row.type === 'Actual');
    const latest = actuals[actuals.length - 1];
    const finalForecast = model.rows[model.rows.length - 1];
    const incomeLift = (finalForecast.revenue - finalForecast.expense) - (latest.revenue - latest.expense);
    const leverageMessage = model.revenueGrowth > model.expenseGrowth
        ? 'Revenue trend is outpacing expenses, creating operating leverage in the forecast.'
        : 'Expense trend is running ahead of revenue, making productivity actions the priority.';

    document.getElementById('insights-list').innerHTML = [
        `${company.name} exits the latest actual year at ${financePercent.format(margin * 100)}% operating margin.`,
        `Projected operating income improves by $${financeNumber.format(incomeLift)}M by year three under the moving-average trend.`,
        leverageMessage,
        'Drag cards to reorder the view; the layout is saved locally for a product-grade dashboard feel.'
    ].map(item => `<li>${item}</li>`).join('');
}

function renderFinancialTable(rows) {
    document.getElementById('financial-table').innerHTML = rows.map(row => {
        const income = row.revenue - row.expense;
        const margin = income / row.revenue;
        return `
            <tr class="${row.type === 'Forecast' ? 'forecast-row' : ''}">
                <td>${row.year}</td>
                <td>${row.type}</td>
                <td>$${financeNumber.format(row.revenue)}</td>
                <td>$${financeNumber.format(row.expense)}</td>
                <td>$${financeNumber.format(income)}</td>
                <td>${financePercent.format(margin * 100)}%</td>
            </tr>
        `;
    }).join('');
}

function formatGrowth(current, prior) {
    return `${formatSigned(((current - prior) / prior) * 100)}%`;
}

function formatSigned(value) {
    return `${value >= 0 ? '+' : ''}${financePercent.format(value)}`;
}

function setupDashboardDragAndDrop(grid) {
    try {
        const saved = JSON.parse(localStorage.getItem('dashboardWidgetOrder') || '[]');
        saved.forEach(id => {
            const widget = grid.querySelector(`[data-widget-id="${id}"]`);
            if (widget) grid.appendChild(widget);
        });
    } catch {
        localStorage.removeItem('dashboardWidgetOrder');
    }

    let dragged = null;
    grid.querySelectorAll('.dashboard-widget').forEach(widget => {
        widget.addEventListener('dragstart', () => {
            dragged = widget;
            widget.classList.add('dragging');
        });

        widget.addEventListener('dragend', () => {
            widget.classList.remove('dragging');
            dragged = null;
            saveDashboardWidgetOrder(grid);
        });
    });

    grid.addEventListener('dragover', event => {
        event.preventDefault();
        if (!dragged) return;
        const after = getDashboardDragTarget(grid, event.clientY);
        if (!after) {
            grid.appendChild(dragged);
        } else {
            grid.insertBefore(dragged, after);
        }
    });
}

function getDashboardDragTarget(container, y) {
    const widgets = [...container.querySelectorAll('.dashboard-widget:not(.dragging)')];
    return widgets.reduce((closest, widget) => {
        const box = widget.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset, element: widget };
        }
        return closest;
    }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

function saveDashboardWidgetOrder(grid) {
    const order = [...grid.querySelectorAll('.dashboard-widget')].map(widget => widget.dataset.widgetId);
    try {
        localStorage.setItem('dashboardWidgetOrder', JSON.stringify(order));
    } catch {
        // Local storage can be unavailable in privacy modes; drag still works for the session.
    }
}
