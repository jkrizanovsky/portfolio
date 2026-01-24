// Gallery/Slideshow Functionality
let currentSlideIndex = 1;

// Media descriptions for each slide
const mediaDescriptions = {
    1: {
        headline: "Portrait Photography",
        description: "Professional portrait photography capturing authentic moments and emotions. High-quality images for personal and commercial use."
    },
    2: {
        headline: "Landscape Photography",
        description: "Breathtaking landscape photography showcasing natural beauty and scenic vistas from around the world."
    },
    3: {
        headline: "Commercial Photography",
        description: "Professional commercial photography for businesses, products, and corporate events with studio-quality results."
    },
    4: {
        headline: "Event Photography",
        description: "Dynamic event photography capturing memorable moments from weddings, parties, and corporate gatherings."
    },
    5: {
        headline: "Product Photography",
        description: "High-quality product photography for e-commerce, catalogs, and marketing materials with attention to detail."
    },
    6: {
        headline: "Street Photography",
        description: "Authentic street photography documenting urban life, culture, and candid moments in public spaces."
    }
};

// Update media description
function updateMediaDescription(slideNumber) {
    const headlineElement = document.getElementById('mediaHeadline');
    const descriptionElement = document.getElementById('mediaDescription');
    
    if (headlineElement && descriptionElement && mediaDescriptions[slideNumber]) {
        headlineElement.textContent = mediaDescriptions[slideNumber].headline;
        descriptionElement.textContent = mediaDescriptions[slideNumber].description;
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Show the first slide
    if (document.querySelector('.slideshow-gallery')) {
        showSlide(currentSlideIndex);
        updateSlideCounter();
    }
    
    // Add keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (document.querySelector('.slideshow-gallery')) {
            if (e.key === 'ArrowLeft') {
                changeSlide(-1);
            } else if (e.key === 'ArrowRight') {
                changeSlide(1);
            }
        }
    });

    // Add touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    const slideshowGallery = document.querySelector('.slideshow-gallery');
    if (slideshowGallery) {
        slideshowGallery.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slideshowGallery.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left
            changeSlide(1);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right
            changeSlide(-1);
        }
    }
});

// Change slide by n (next/previous)
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
    updateSlideCounter();
    updateMediaDescription(currentSlideIndex);
}

// Show specific slide
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
    updateSlideCounter();
    updateMediaDescription(currentSlideIndex);
}

// Update slide counter display
function updateSlideCounter() {
    const slides = document.querySelectorAll('.gallery-item');
    const counter = document.querySelector('.slide-counter');
    
    if (counter && slides.length > 0) {
        counter.textContent = `${currentSlideIndex} • ${slides.length}`;
    }
}

// Main slideshow function
function showSlide(n) {
    const slides = document.querySelectorAll('.gallery-item');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Wrap around
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    // Remove all classes from slides
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev', 'next');
    });
    
    // Remove active class from dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    // Calculate prev and next indices (1-based to 0-based conversion)
    let prevIndex = currentSlideIndex - 2; // Previous slide (current - 1, then - 1 for 0-based)
    let nextIndex = currentSlideIndex; // Next slide (current + 1, then - 1 for 0-based = current)
    
    // Wrap around for circular carousel
    if (prevIndex < 0) {
        prevIndex = slides.length + prevIndex;
    }
    if (nextIndex >= slides.length) {
        nextIndex = 0;
    }
    
    // Show current slide
    if (slides[currentSlideIndex - 1]) {
        slides[currentSlideIndex - 1].classList.add('active');
    }
    
    // Show prev slide
    if (slides[prevIndex]) {
        slides[prevIndex].classList.add('prev');
    }
    
    // Show next slide
    if (slides[nextIndex]) {
        slides[nextIndex].classList.add('next');
    }
    
    // Activate current dot
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

// Auto-advance slideshow (optional - commented out by default)
/*
function autoSlide() {
    changeSlide(1);
}

// Uncomment to enable auto-advance every 5 seconds
// setInterval(autoSlide, 5000);
*/
