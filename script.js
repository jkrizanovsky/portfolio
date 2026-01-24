// View Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('viewToggle');
    const toggleText = document.getElementById('toggleText');
    const galleryView = document.getElementById('galleryView');
    const cvView = document.getElementById('cvView');
    const galleryGrid = document.getElementById('galleryGrid');
    const heroSection = document.getElementById('heroSection');
    
    let isGalleryView = true;
    let hasScrolledToTiles = false;
    
    // Function to show/hide gallery tiles on scroll
    function handleScroll() {
        if (!isGalleryView) return;
        
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const scrollPosition = window.scrollY;
        
        // Show tiles when user scrolls past 40% of hero section
        if (scrollPosition > heroHeight * 0.4) {
            if (galleryGrid && !hasScrolledToTiles) {
                galleryGrid.classList.add('visible');
                hasScrolledToTiles = true;
            }
        } 
        // Hide tiles when user scrolls back up above 40% of hero section
        else if (scrollPosition <= heroHeight * 0.4) {
            if (galleryGrid && hasScrolledToTiles) {
                galleryGrid.classList.remove('visible');
                hasScrolledToTiles = false;
            }
        }
    }
    
    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Toggle button functionality - works from any page
    toggleBtn.addEventListener('click', function() {
        const currentPath = window.location.pathname;
        const isOnMainPage = currentPath.endsWith('index.html') || currentPath.endsWith('/');
        
        if (isOnMainPage) {
            // On main page, toggle between views
            isGalleryView = !isGalleryView;
            
            if (isGalleryView) {
                // Switch to Gallery View
                galleryView.classList.add('active');
                cvView.classList.remove('active');
                toggleText.textContent = 'CV';
                hasScrolledToTiles = false;
                if (galleryGrid) {
                    galleryGrid.classList.remove('visible');
                }
            } else {
                // Switch to CV View
                galleryView.classList.remove('active');
                cvView.classList.add('active');
                toggleText.textContent = 'Portfolio';
            }
            
            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // On other pages
            const currentToggleText = toggleText.textContent;
            
            if (currentToggleText === 'CV') {
                // Navigate to CV view on main page
                window.location.href = 'index.html?view=cv';
            } else {
                // Navigate back to Portfolio (main page)
                window.location.href = 'index.html';
            }
        }
    });
    
    // Check if URL has view parameter
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    
    if (viewParam === 'cv' && galleryView && cvView) {
        // Switch to CV view if URL parameter is set
        isGalleryView = false;
        galleryView.classList.remove('active');
        cvView.classList.add('active');
        toggleText.textContent = 'Portfolio';
    }
    
    // Dropdown now uses direct page navigation (no custom JS needed)
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
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
    
    // Observe gallery sections (but don't apply initial transform since we're using grid visibility)
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
    
    // Add parallax effect to hero section (only when in gallery view)
    if (heroSection) {
        window.addEventListener('scroll', function() {
            if (!isGalleryView) return;
            const scrolled = window.pageYOffset;
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroSection.style.opacity = 1 - (scrolled / 500);
        });
    }
    
});

// Add some console branding
console.log('%c🎨 Digital Creator Portfolio', 'font-size: 20px; font-weight: bold; color: #8b4d9e;');
console.log('%cBuilt with ❤️ in Plum Noir style', 'font-size: 12px; color: #a65dbf;');
