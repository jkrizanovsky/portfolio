# Digital Creator Portfolio

A modern, fully functional portfolio website for digital creators with a stunning **plum noir** visual style.

## 🎨 Features

- **4 Portfolio Sections**: Graphic Design, Social Media Management, Photography, and Video Editing
- **Dual View Modes**: 
  - Gallery View: Showcase your work in a beautiful grid layout
  - CV Timeline View: Display your professional experience chronologically
- **Toggle Button**: Easy switching between gallery and CV views in the top navigation bar
- **Modern Design**: Trending plum noir color scheme with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Easy to Update**: Simple structure for adding images and video links

## 🚀 Quick Start

1. Open `index.html` in a web browser
2. Use the toggle button in the top navigation to switch between Gallery and CV views

## 📁 Adding Your Content

### Adding Images to Gallery Sections

Each section has placeholder images. To add your own:

1. **Place your images** in the appropriate folder:
   - Graphic Design: `assets/graphic-design/`
   - Social Media: `assets/social-media/`
   - Photography: `assets/photography/`
   - Video Editing: `assets/video-editing/`

2. **Update the HTML** in `index.html`:
   ```html
   <!-- Example for Graphic Design section -->
   <div class="media-item">
       <img src="assets/graphic-design/your-image.jpg" alt="Your Description">
   </div>
   ```

3. **Add more items** by copying the `<div class="media-item">` block:
   ```html
   <div class="media-item">
       <img src="assets/graphic-design/design1.jpg" alt="Brand Identity">
   </div>
   <div class="media-item">
       <img src="assets/graphic-design/design2.jpg" alt="Logo Design">
   </div>
   ```

### Adding Video Links

For the Video Editing section, update the video links:

```html
<div class="media-item video-item">
    <a href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank" class="video-link">
        <img src="assets/video-editing/thumbnail.jpg" alt="Video Project">
        <div class="play-icon">▶</div>
    </a>
</div>
```

You can link to:
- YouTube videos
- Vimeo videos
- Any other video platform

### Customizing the CV Timeline

Edit the timeline content in `index.html` within the `<div id="cvView">` section:

1. **Update Personal Information**:
   ```html
   <h2 class="cv-name">Your Name</h2>
   <p class="cv-title">Your Professional Title</p>
   <div class="cv-contact">
       <span>📧 your@email.com</span>
       <span>📱 +1 234 567 890</span>
       <span>🌐 www.yoursite.com</span>
   </div>
   ```

2. **Add/Edit Experience**:
   ```html
   <div class="timeline-item">
       <div class="timeline-date">2023 - Present</div>
       <div class="timeline-content">
           <h4>Your Job Title</h4>
           <p class="timeline-company">Company Name</p>
           <ul class="timeline-details">
               <li>Achievement or responsibility 1</li>
               <li>Achievement or responsibility 2</li>
           </ul>
       </div>
   </div>
   ```

## 🎨 Color Scheme (Plum Noir)

The website uses a sophisticated plum noir color palette:
- Deep blacks and dark plums for backgrounds
- Rich purple tones for accents
- Gold highlights for premium feel
- Smooth gradients throughout

## ⌨️ Keyboard Shortcuts

- Press **G** to switch to Gallery view
- Press **C** to switch to CV view
- **Print** button appears in CV view for easy printing

## 🔧 Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --plum-darkest: #1a0f1f;
    --plum-dark: #2d1b3d;
    --plum-medium: #4a2c5e;
    /* ... more colors ... */
}
```

### Adjusting Layout

The gallery uses CSS Grid. Modify in `styles.css`:

```css
.gallery-grid {
    grid-template-columns: repeat(2, 1fr); /* Change to 3 or 4 for more columns */
    gap: 2rem;
}
```

## 📱 Responsive Design

The website automatically adapts to different screen sizes:
- **Desktop**: 2-column grid for sections
- **Tablet**: 1-column grid with adjusted spacing
- **Mobile**: Optimized single-column layout

## 🌐 Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

## 📄 File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
├── assets/             # Media files
│   ├── graphic-design/
│   ├── social-media/
│   ├── photography/
│   └── video-editing/
└── README.md          # This file
```

## 💡 Tips

1. **Image Optimization**: Compress images before uploading for faster load times
2. **Consistent Sizing**: Use images with similar aspect ratios for best results
3. **Video Thumbnails**: Create attractive thumbnails for your video links
4. **Regular Updates**: Keep your CV and portfolio sections current
5. **Test Responsive**: Check the site on different devices

## 🚀 Deployment

You can deploy this website to:
- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your git repository
- **Any web hosting**: Upload via FTP

## 📞 Support

For questions or issues, refer to the HTML comments in the code or customize as needed!

---

**Built with modern web technologies and a passion for great design** ✨