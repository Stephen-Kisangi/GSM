 // Scroll animation for image
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-animate');
                }
            });
        }, observerOptions);

        // Observe the image when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const aboutImage = document.querySelector('.about-image');
            if (aboutImage) {
                observer.observe(aboutImage);
            }
        });