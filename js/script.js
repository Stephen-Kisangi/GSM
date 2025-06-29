// Enhanced JavaScript for Grammer Spire Academy
// Advanced interactive features and smooth animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll) with enhanced settings
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true,
        offset: 120,
        delay: 100,
        disable: function() {
            return window.innerWidth < 768; // Disable on mobile for performance
        }
    });

    // Enhanced Navbar functionality
    const navbar = document.getElementById('mainNav');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarBrand = document.querySelector('.navbar-brand');
    let lastScrollTop = 0;
    let isScrolling = false;

    // Throttled scroll handler for better performance
    function throttledScrollHandler() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar background and shadow effects
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'none';
        }

        // Hide/show navbar on scroll direction (mobile enhancement)
        if (window.innerWidth <= 768) {
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
        
        // Update active nav link
        updateActiveNavLink();
        
        // Back to top button
        toggleBackToTopButton();
        
        // Parallax effect for hero section
        parallaxEffect();
    }

    window.addEventListener('scroll', throttledScrollHandler);

    // Enhanced smooth scrolling with easing
    function smoothScrollTo(target, duration = 1000) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuart(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function easeInOutQuart(t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t*t*t + b;
            t -= 2;
            return -c/2 * (t*t*t*t - 2) + b;
        }

        requestAnimationFrame(animation);
    }

    // Enhanced navigation link handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add loading state
                this.style.opacity = '0.7';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 300);

                smoothScrollTo(targetSection);
            }
            
            // Enhanced mobile menu handling
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
                
                // Add smooth close animation
                navbarCollapse.style.transition = 'all 0.3s ease';
            }
        });

        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'all 0.3s ease';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced active navigation link detection
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.navbar-nav .nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.style.color = '';
                });
                if (navLink) {
                    navLink.classList.add('active');
                    navLink.style.color = '#2563eb';
                }
            }
        });
    }

    // Enhanced back to top button with smooth animation
    const backToTopButton = document.getElementById('backToTop');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 400) {
            backToTopButton.style.display = 'block';
            backToTopButton.style.opacity = '1';
            backToTopButton.style.transform = 'scale(1)';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (window.scrollY <= 400) {
                    backToTopButton.style.display = 'none';
                }
            }, 300);
        }
    }

    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        smoothScrollTo(document.body, 800);
    });

    // Parallax effect for hero section
    function parallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection && window.innerWidth > 768) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }

    // Enhanced gallery lightbox with keyboard navigation
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let lightboxImages = [];

    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        lightboxImages.push({
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt')
        });

        item.addEventListener('click', function() {
            currentImageIndex = index;
            openLightbox();
        });

        // Enhanced hover effect
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.gallery-overlay');
            const img = this.querySelector('img');
            
            overlay.style.opacity = '1';
            img.style.transform = 'scale(1.1)';
            
            // Add subtle rotation effect
            img.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.gallery-overlay');
            const img = this.querySelector('img');
            
            overlay.style.opacity = '0';
            img.style.transform = 'scale(1)';
        });
    });

    function openLightbox() {
        const lightboxModal = document.createElement('div');
        lightboxModal.className = 'lightbox-modal';
        lightboxModal.innerHTML = `
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <button class="lightbox-prev" onclick="previousImage()">&#10094;</button>
                <button class="lightbox-next" onclick="nextImage()">&#10095;</button>
                <img src="${lightboxImages[currentImageIndex].src}" 
                     alt="${lightboxImages[currentImageIndex].alt}" 
                     class="lightbox-image">
                <div class="lightbox-caption">${lightboxImages[currentImageIndex].alt}</div>
                <div class="lightbox-counter">${currentImageIndex + 1} / ${lightboxImages.length}</div>
            </div>
        `;
        
        document.body.appendChild(lightboxModal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        setTimeout(() => {
            lightboxModal.style.opacity = '1';
        }, 10);

        // Close handlers
        const closeBtn = lightboxModal.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', closeLightbox);
        
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', handleLightboxKeyboard);
    }

    function closeLightbox() {
        const lightboxModal = document.querySelector('.lightbox-modal');
        if (lightboxModal) {
            lightboxModal.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightboxModal);
                document.body.style.overflow = 'auto';
            }, 300);
        }
        document.removeEventListener('keydown', handleLightboxKeyboard);
    }

    function handleLightboxKeyboard(e) {
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
        }
    }

    // Global functions for lightbox navigation
    window.previousImage = function() {
        currentImageIndex = (currentImageIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxImage();
    };

    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % lightboxImages.length;
        updateLightboxImage();
    };

    function updateLightboxImage() {
        const img = document.querySelector('.lightbox-image');
        const caption = document.querySelector('.lightbox-caption');
        const counter = document.querySelector('.lightbox-counter');
        
        if (img && caption && counter) {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = lightboxImages[currentImageIndex].src;
                img.alt = lightboxImages[currentImageIndex].alt;
                caption.textContent = lightboxImages[currentImageIndex].alt;
                counter.textContent = `${currentImageIndex + 1} / ${lightboxImages.length}`;
                img.style.opacity = '1';
            }, 150);
        }
    }

    // Enhanced card animations with stagger effect
    const cards = document.querySelectorAll('.program-card, .highlight-card, .testimonial-card');
    
    cards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.15)';
            this.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Enhanced testimonial carousel with auto-play and pause on hover
    const testimonialCarousel = document.getElementById('testimonialCarousel');
    if (testimonialCarousel) {
        const carousel = new bootstrap.Carousel(testimonialCarousel, {
            interval: 4000,
            wrap: true,
            pause: 'hover'
        });

        // Add custom indicators
        const indicators = testimonialCarousel.querySelectorAll('.carousel-item');
        if (indicators.length > 1) {
            const indicatorContainer = document.createElement('div');
            indicatorContainer.className = 'carousel-indicators-custom';
            
            indicators.forEach((item, index) => {
                const indicator = document.createElement('button');
                indicator.className = index === 0 ? 'active' : '';
                indicator.addEventListener('click', () => {
                    carousel.to(index);
                });
                indicatorContainer.appendChild(indicator);
            });
            
            testimonialCarousel.appendChild(indicatorContainer);
        }

        // Enhanced slide transition effects
        testimonialCarousel.addEventListener('slide.bs.carousel', function(e) {
            const activeItem = e.relatedTarget;
            activeItem.style.opacity = '0';
            activeItem.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                activeItem.style.transition = 'all 0.6s ease';
                activeItem.style.opacity = '1';
                activeItem.style.transform = 'translateX(0)';
            }, 100);
        });
    }

    // Enhanced button interactions
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    });

    // Scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    window.addEventListener('scroll', updateScrollProgress);

    // Enhanced mobile menu interactions
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add hamburger animation
            this.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);

            setTimeout(() => {
                if (navbarCollapse.classList.contains('show')) {
                    document.body.style.overflow = 'hidden';
                    navbarCollapse.style.background = 'rgba(255,255,255,0.98)';
                    navbarCollapse.style.backdropFilter = 'blur(10px)';
                } else {
                    document.body.style.overflow = 'auto';
                }
            }, 300);
        });
    }

    // Intersection Observer for advanced animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animations for different elements
                if (entry.target.classList.contains('section-title')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('highlight-icon')) {
                    entry.target.style.animation = 'bounceIn 1s ease forwards';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .highlight-icon, .program-card, .gallery-item');
    animatedElements.forEach(el => observer.observe(el));

    // Performance optimization: Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Enhanced form validation (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                validateField(this);
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                // Simulate form submission with loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Message Sent!';
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                        contactForm.reset();
                    }, 2000);
                }, 1500);
            }
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldContainer = field.parentElement;
        
        // Remove existing error states
        fieldContainer.classList.remove('error');
        
        if (field.hasAttribute('required') && !value) {
            fieldContainer.classList.add('error');
            return false;
        }
        
        if (field.type === 'email' && value && !isValidEmail(value)) {
            fieldContainer.classList.add('error');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Initialize all animations and effects
    initializeAnimations();
    
    function initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes bounceIn {
                0% {
                    opacity: 0;
                    transform: scale(0.3);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
                70% {
                    transform: scale(0.9);
                }
                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
            
            .animate-in {
                animation-fill-mode: forwards;
            }
        `;
        document.head.appendChild(style);
    }

    console.log('Grammer Spire Academy - Enhanced JavaScript loaded successfully!');
});

// Enhanced lightbox styles
const enhancedLightboxStyles = `
    .lightbox-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .lightbox-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .lightbox-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        transition: opacity 0.3s ease;
    }
    
    .lightbox-close {
        position: absolute;
        top: -50px;
        right: 0;
        color: white;
        font-size: 40px;
        cursor: pointer;
        z-index: 10000;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: rgba(255,255,255,0.1);
    }
    
    .lightbox-close:hover {
        background: rgba(255,255,255,0.2);
        transform: scale(1.1);
    }
    
    .lightbox-prev, .lightbox-next {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        background: rgba(255,255,255,0.1);
        color: white;
        border: none;
        font-size: 24px;
        padding: 15px 20px;
        cursor: pointer;
        border-radius: 50%;
        transition: all 0.3s ease;
        z-index: 10000;
    }
    
    .lightbox-prev {
        left: -60px;
    }
    
    .lightbox-next {
        right: -60px;
    }
    
    .lightbox-prev:hover, .lightbox-next:hover {
        background: rgba(255,255,255,0.2);
        transform: translateY(-50%) scale(1.1);
    }
    
    .lightbox-caption {
        position: absolute;
        bottom: -50px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        text-align: center;
        font-size: 16px;
        background: rgba(0,0,0,0.7);
        padding: 10px 20px;
        border-radius: 20px;
        backdrop-filter: blur(10px);
    }
    
    .lightbox-counter {
        position: absolute;
        top: -50px;
        left: 0;
        color: white;
        font-size: 14px;
        background: rgba(0,0,0,0.7);
        padding: 5px 15px;
        border-radius: 15px;
        backdrop-filter: blur(10px);
    }
    
    @media (max-width: 768px) {
        .lightbox-prev, .lightbox-next {
            font-size: 18px;
            padding: 10px 15px;
        }
        
        .lightbox-prev {
            left: 10px;
        }
        
        .lightbox-next {
            right: 10px;
        }
        
        .lightbox-close {
            top: 10px;
            right: 10px;
            font-size: 30px;
        }
        
        .lightbox-caption {
            bottom: 10px;
            font-size: 14px;
        }
        
        .lightbox-counter {
            top: 10px;
            left: 10px;
        }
    }
`;

// Inject enhanced lightbox styles
const enhancedStyleSheet = document.createElement('style');
enhancedStyleSheet.textContent = enhancedLightboxStyles;
document.head.appendChild(enhancedStyleSheet);



// Additional Advanced Features and Optimizations

// Enhanced scroll-triggered animations with performance optimization
let ticking = false;

function updateScrollAnimations() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    // Update scroll progress
    updateScrollProgress();
    
    // Parallax effects for multiple elements
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrollTop * speed);
        element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
    
    // Reveal animations for elements coming into view
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
    
    ticking = false;
}

function requestScrollUpdate() {
    if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
    }
}

// Replace the existing scroll handler with the optimized version
window.removeEventListener('scroll', throttledScrollHandler);
window.addEventListener('scroll', requestScrollUpdate);

// Advanced button ripple effect
function createRippleEffect(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', createRippleEffect);
});

// Advanced typing animation for hero text
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation for hero motto (optional)
const heroMotto = document.querySelector('.hero-motto');
if (heroMotto) {
    const originalText = heroMotto.textContent;
    // Uncomment the line below to enable typing animation
    // typeWriter(heroMotto, originalText, 80);
}

// Advanced image lazy loading with fade-in effect
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.src = img.dataset.src;
                img.onload = () => {
                    img.style.opacity = '1';
                    img.classList.remove('lazy');
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Enhanced contact form with real-time validation
function enhanceContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function() {
            validateFieldRealTime(this);
        });
        
        // Enhanced focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
            this.style.borderColor = '#2563eb';
            this.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

function validateFieldRealTime(field) {
    const value = field.value.trim();
    const fieldContainer = field.parentElement;
    
    // Remove existing validation classes
    fieldContainer.classList.remove('error', 'success');
    
    if (field.hasAttribute('required') && !value) {
        fieldContainer.classList.add('error');
        return false;
    }
    
    if (field.type === 'email' && value) {
        if (isValidEmail(value)) {
            fieldContainer.classList.add('success');
        } else {
            fieldContainer.classList.add('error');
            return false;
        }
    }
    
    if (value) {
        fieldContainer.classList.add('success');
    }
    
    return true;
}

// Advanced testimonial carousel with touch support
function enhanceTestimonialCarousel() {
    const carousel = document.getElementById('testimonialCarousel');
    if (!carousel) return;
    
    let startX = 0;
    let currentX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        e.preventDefault();
    });
    
    carousel.addEventListener('touchend', () => {
        if (!isDragging) return;
        
        const diffX = startX - currentX;
        const threshold = 50;
        
        if (Math.abs(diffX) > threshold) {
            const bsCarousel = bootstrap.Carousel.getInstance(carousel);
            if (diffX > 0) {
                bsCarousel.next();
            } else {
                bsCarousel.prev();
            }
        }
        
        isDragging = false;
    });
}

// Advanced scroll-to-section with offset calculation
function enhanceScrollToSection() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navbar = document.getElementById('mainNav');
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const offset = navbarHeight + 20;
                
                const targetPosition = targetElement.offsetTop - offset;
                
                // Smooth scroll with easing
                smoothScrollToPosition(targetPosition, 1000);
                
                // Update URL without triggering scroll
                history.pushState(null, null, `#${targetId}`);
            }
        });
    });
}

function smoothScrollToPosition(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
    
    requestAnimationFrame(animation);
}

// Performance monitoring and optimization
function initializePerformanceOptimizations() {
    // Preload critical images
    const criticalImages = [
        'images/hero-bg.jpg',
        'images/about-us.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    // Optimize animations for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.01ms');
        AOS.init({ disable: true });
    }
    
    // Memory cleanup for removed elements
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.removedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    // Clean up event listeners if needed
                    const elements = node.querySelectorAll ? node.querySelectorAll('*') : [];
                    elements.forEach(el => {
                        if (el._eventListeners) {
                            delete el._eventListeners;
                        }
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Advanced error handling and fallbacks
function initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', function(e) {
        console.warn('JavaScript error caught:', e.error);
        // Graceful degradation - ensure basic functionality still works
    });
    
    // Handle failed image loads
    document.addEventListener('error', function(e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.display = 'none';
            console.warn('Image failed to load:', e.target.src);
        }
    }, true);
    
    // Fallback for browsers without Intersection Observer
    if (!window.IntersectionObserver) {
        // Simple fallback - show all elements
        document.querySelectorAll('.fade-in, .reveal-on-scroll').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for the main script to initialize
    setTimeout(() => {
        lazyLoadImages();
        enhanceContactForm();
        enhanceTestimonialCarousel();
        enhanceScrollToSection();
        initializePerformanceOptimizations();
        initializeErrorHandling();
        
        console.log('Advanced JavaScript features initialized successfully!');
    }, 100);
});

// Add advanced CSS animations
const advancedStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .form-field.focused label {
        color: #2563eb;
        transform: translateY(-20px) scale(0.8);
    }
    
    .form-field.error input,
    .form-field.error textarea {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .form-field.success input,
    .form-field.success textarea {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #10b981);
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Enhanced mobile optimizations */
    @media (max-width: 768px) {
        .lightbox-modal {
            padding: 20px;
        }
        
        .hero-section {
            background-attachment: scroll; /* Better performance on mobile */
        }
        
        .parallax-element {
            transform: none !important; /* Disable parallax on mobile */
        }
    }
`;

// Inject advanced styles
const advancedStyleSheet = document.createElement('style');
advancedStyleSheet.textContent = advancedStyles;
document.head.appendChild(advancedStyleSheet);

// Final initialization message
console.log('🎉 Grammer Spire Academy - Complete Enhanced JavaScript Suite Loaded!');
console.log('✅ Features: Advanced Lightbox, Smooth Animations, Performance Optimizations');
console.log('✅ Accessibility: Reduced Motion Support, Keyboard Navigation');
console.log('✅ Mobile: Touch Support, Responsive Optimizations');
console.log('✅ Performance: Lazy Loading, Memory Management, Error Handling');

