// Gallery/Slideshow Functionality
let currentSlideIndex = 1;

// Media descriptions - can be overridden per page
const defaultMediaDescriptions = {
    1: {
        headline: "Portfolio Item 1",
        description: "Professional creative work showcasing expertise and attention to detail."
    },
    2: {
        headline: "Portfolio Item 2",
        description: "High-quality creative solutions for various projects and clients."
    },
    3: {
        headline: "Portfolio Item 3",
        description: "Innovative approach to design and content creation."
    },
    4: {
        headline: "Portfolio Item 4",
        description: "Comprehensive creative services tailored to client needs."
    },
    5: {
        headline: "Portfolio Item 5",
        description: "Professional results delivered with creativity and precision."
    },
    6: {
        headline: "Portfolio Item 6",
        description: "Exceptional quality and creative excellence in every project."
    }
};

// Try to get page-specific descriptions, fall back to defaults
let mediaDescriptions = window.pageMediaDescriptions || defaultMediaDescriptions;

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
        // Set gallery height CSS variable for container sizing
        updateGalleryHeightVariable();
        
        // Detect images and apply scale-to-fit sizing
        detectHorizontalImages();
        
        showSlide(currentSlideIndex);
        updateSlideCounter();
        
        // Add click handlers to gallery items for navigation
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                // Only switch if clicking on non-active items
                if (!this.classList.contains('active')) {
                    currentSlide(index + 1);
                }
            });
        });
        
        // Update gallery height variable and re-apply scale-to-fit on window resize
        window.addEventListener('resize', function() {
            updateGalleryHeightVariable();
            // Re-apply scale-to-fit sizing for images (not videos)
            detectHorizontalImages();
        });
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

// Update the --gallery-height CSS variable based on actual gallery height
// This is used for horizontal and square containers where width = gallery height
function updateGalleryHeightVariable() {
    const gallery = document.querySelector('.slideshow-gallery');
    if (gallery) {
        const galleryHeight = gallery.offsetHeight;
        document.documentElement.style.setProperty('--gallery-height', galleryHeight + 'px');
    }
}

// Detect images and apply scale-to-fit container sizing
// Note: Video slides are excluded as they have their own CSS handling via .video-slide class
// Scale-to-fit: Container hugs the image exactly with no blank spots, respecting the longer edge maximum
function detectHorizontalImages() {
    const galleryItems = document.querySelectorAll('.gallery-item:not(.video-slide)');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        if (img) {
            // Check if image is already loaded
            if (img.complete && img.naturalWidth > 0) {
                applyScaleToFit(item, img);
            } else {
                // Wait for image to load
                img.onload = function() {
                    applyScaleToFit(item, img);
                };
            }
        }
    });
}

// Apply scale-to-fit container sizing based on image's actual aspect ratio
// The container hugs the image exactly, with the longer edge at maximum
function applyScaleToFit(item, img) {
    const gallery = document.querySelector('.slideshow-gallery');
    if (!gallery) return;
    
    const galleryHeight = gallery.offsetHeight;
    const isRotated = item.classList.contains('rotated-image');
    
    // For rotated images, swap width and height
    let imgWidth = isRotated ? img.naturalHeight : img.naturalWidth;
    let imgHeight = isRotated ? img.naturalWidth : img.naturalHeight;
    
    const aspectRatio = imgWidth / imgHeight;
    
    // Remove old container classes
    item.classList.remove('container-vertical', 'container-square', 'container-horizontal', 'horizontal-image');
    
    // Add scale-to-fit class
    item.classList.add('scale-to-fit');
    
    let containerWidth, containerHeight;
    
    if (aspectRatio >= 1) {
        // Landscape or square: width is the longer edge, use gallery height as max width
        containerWidth = galleryHeight;
        containerHeight = galleryHeight / aspectRatio;
    } else {
        // Portrait: height is the longer edge, use gallery height as max height
        containerHeight = galleryHeight;
        containerWidth = galleryHeight * aspectRatio;
    }
    
    // Apply the dimensions
    item.style.width = containerWidth + 'px';
    item.style.height = containerHeight + 'px';
}

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
    
    // Pause all videos before changing slides
    pauseAllVideos();
    
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
    
    // Adjust container to fit the active image
    adjustGalleryHeight(slides[currentSlideIndex - 1]);
}

// Function to adjust gallery container height based on active image or video
// With fixed layout, this only ensures the slide is properly displayed
function adjustGalleryHeight(activeSlide) {
    if (!activeSlide) return;
    
    const gallery = document.querySelector('.slideshow-gallery');
    
    if (!gallery) return;
    
    // Fixed layout: container dimensions are set via CSS
    // No dynamic resizing needed - all slides use same fixed container size
}

// Helper function to set gallery and item dimensions - FIXED LAYOUT VERSION
function setGalleryHeight(img, gallery, activeSlide) {
    // Fixed layout: dimensions are controlled by CSS
    // No dynamic resizing - container size stays constant
}

// Helper function to set gallery and video dimensions (for video slides) - FIXED LAYOUT VERSION
function setVideoGalleryHeight(gallery, activeSlide) {
    // Fixed layout: dimensions are controlled by CSS
    // No dynamic resizing - container size stays constant
}

// Helper function to position arrows - FIXED LAYOUT VERSION
// Arrows are now positioned via CSS with fixed positions
function positionArrows(slideHeight) {
    // Fixed layout: arrow positions are controlled by CSS
    // No dynamic positioning needed
}

// Function to pause all videos (YouTube iframes, Instagram iframes, and local videos)
function pauseAllVideos() {
    // Pause all iframes (YouTube, Instagram, and other embeds)
    const iframes = document.querySelectorAll('.video-iframe');
    iframes.forEach(iframe => {
        // Send postMessage to pause the video
        try {
            const url = new URL(iframe.src);
            if (url.hostname === 'www.youtube.com' || url.hostname === 'youtube.com') {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } else if (url.hostname === 'www.instagram.com' || url.hostname === 'instagram.com') {
                // For Instagram, hide the iframe to stop playback without reloading
                iframe.style.visibility = 'hidden';
                setTimeout(() => {
                    iframe.style.visibility = 'visible';
                }, 100);
            } else {
                // For other embeds, try generic postMessage pause
                iframe.contentWindow.postMessage('{"event":"command","func":"pause","args":""}', '*');
            }
        } catch (e) {
            // Invalid URL or cross-origin issue, skip
        }
    });
    
    // Pause local HTML5 videos
    const videos = document.querySelectorAll('.local-video');
    videos.forEach(video => {
        if (!video.paused) {
            video.pause();
        }
    });
}

// Auto-advance slideshow (optional - commented out by default)
/*
function autoSlide() {
    changeSlide(1);
}

// Uncomment to enable auto-advance every 5 seconds
// setInterval(autoSlide, 5000);
*/
