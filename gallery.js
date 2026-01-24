// Gallery/Slideshow Functionality
let currentSlideIndex = 1;

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
}

// Show specific slide
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
    updateSlideCounter();
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
    const thumbnails = document.querySelectorAll('.thumbnail');
    
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
    
    // Remove active class from thumbnails
    thumbnails.forEach(thumb => {
        thumb.classList.remove('active');
    });
    
    // Calculate prev and next indices
    let prevIndex = currentSlideIndex - 2;
    let nextIndex = currentSlideIndex;
    
    if (prevIndex < 0) {
        prevIndex = slides.length + prevIndex;
    }
    if (nextIndex >= slides.length) {
        nextIndex = nextIndex - slides.length;
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
    
    // Activate current thumbnail
    if (thumbnails[currentSlideIndex - 1]) {
        thumbnails[currentSlideIndex - 1].classList.add('active');
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
