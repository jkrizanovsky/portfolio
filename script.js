// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('viewToggle');
    const toggleText = document.getElementById('toggleText');
    const galleryView = document.getElementById('galleryView');
    const cvView = document.getElementById('cvView');
    
    let isGalleryView = true;
    
    toggleBtn.addEventListener('click', function() {
        isGalleryView = !isGalleryView;
        
        if (isGalleryView) {
            // Switch to Gallery View
            galleryView.classList.add('active');
            cvView.classList.remove('active');
            toggleText.textContent = 'CV';
        } else {
            // Switch to CV View
            galleryView.classList.remove('active');
            cvView.classList.add('active');
            toggleText.textContent = 'Portfolio';
        }
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    
    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery sections
    document.querySelectorAll('.gallery-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'G' for Gallery view
        if (e.key === 'g' || e.key === 'G') {
            if (!isGalleryView) {
                toggleBtn.click();
            }
        }
        // Press 'C' for CV view
        if (e.key === 'c' || e.key === 'C') {
            if (isGalleryView) {
                toggleBtn.click();
            }
        }
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        });
    }
    
});

// Add some console branding
console.log('%c🎨 Digital Creator Portfolio', 'font-size: 20px; font-weight: bold; color: #8b4d9e;');
console.log('%cBuilt with ❤️ in Plum Noir style', 'font-size: 12px; color: #a65dbf;');
