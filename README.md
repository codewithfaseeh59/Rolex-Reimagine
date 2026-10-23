# AURELIAN — Timeless Precision

> **Concept project by Faseeh Khan. AURELIAN is a fictional brand — not a real company.**

A concept luxury-watch website for the fictional brand AURELIAN, featuring an immersive visual experience with 3D elements, smooth animations, and elegant design.

![AURELIAN Website Preview](https://img.shields.io/badge/Version-1.0.0-gold?style=flat-square)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript)

---

## 🔗 Live Preview

You can view the live website here:

### [AURELIAN — Timeless Precision](https://codewithfaseeh59.github.io/AURELIAN-Reimagine/)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Pages](#pages)
4. [Technical Stack](#technical-stack)
5. [Project Structure](#project-structure)
6. [Getting Started](#getting-started)
7. [Customization](#customization)
8. [Browser Support](#browser-support)
9. [Performance Notes](#performance-notes)
10. [Credits](#credits)

---

## Project Overview

**AURELIAN — Timeless Precision** is a concept brand showcase website for an invented luxury watch house. The website combines elegant design with modern web technologies to create an immersive user experience that reflects luxury and precision.

### Key Highlights

- 🏆 Premium luxury brand aesthetic
- 🎨 Dark theme with gold accents (#b8972a)
- ✨ Smooth scroll animations using Locomotive Scroll
- 🎬 GSAP-powered scroll-triggered animations
- 📱 Fully responsive design
- ⌚ 3D watch model integration

---

## Features

### Core Features

1. **Custom Cursor**
   - Gold-colored dot cursor
   - Follower circle with smooth transition
   - Disabled on mobile devices

2. **Preloader**
   - Animated loading screen
   - Progress bar with percentage counter
   - Fade-out transition on load complete

3. **Hero Section**
   - Three.js powered 3D watch model on canvas
   - Interactive drag-to-rotate functionality
   - Animated text reveals

4. **Marquee Banner**
   - Infinite scrolling brand tagline
   - Gold themed typography

5. **Collection Showcase**
   - Filterable watch collection (All, Sport, Classic, Prestige)
   - Smooth hover effects
   - Reference numbers and descriptions

6. **Craftsmanship Section**
   - Scroll-triggered content reveals
   - Sticky visual elements
   - Step-by-step manufacturing process

7. **Statistics Section**
   - Animated number counters
   - Key brand metrics

8. **Quote Section**
   - Founder quote from the fictional Lucien Marchand
   - Elegant typography

9. **Contact Form**
   - Full-featured contact form
   - Form validation ready

10. **Retailer Locator**
    - Global store locations
    - Interactive cards

---

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Main landing page with hero, collection preview, and craftsmanship |
| Collection | `Pages/collection.html` | Full watch collection with filtering system |
| About | `Pages/about.html` | Company history, founder profile, timeline |
| Craftsmanship | `Pages/craftsmanship.html` | Manufacturing process and materials |
| Contact | `Pages/contact.html` | Contact form and retailer locations |

---

## Technical Stack

### Core Technologies

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with CSS Variables
- **JavaScript (ES6+)** — Vanilla JavaScript

### External Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| [Locomotive Scroll](https://locomotivemtl.github.io/locomotive-scroll/) | 4.1.4 | Smooth scrolling |
| [GSAP](https://greensock.com/gsap/) | 3.12.5 | Animation engine |
| [ScrollTrigger](https://greensock.com/scrolltrigger/) | 3.12.5 | Scroll-based animations |
| [Three.js](https://threejs.org/) | 0.128.0 | 3D graphics |
| [Font Awesome](https://fontawesome.com/) | 7.0.1 | Icons |
| [Remix Icon](https://remixicon.com/) | 4.2.0 | Icon library |

### Fonts

- **Cormorant Garamond** — Elegant serif font for headings
- **Montserrat** — Clean sans-serif for body text

---

## Project Structure

```
aurelian/
├── index.html                 # Home page
├── README.md                  # This file
├── Assets/
│   ├── Images/
│   │   ├── craft-.webp        # Craftsmanship image 1
│   │   ├── craft-.webp        # Craftsmanship image 2
│   │   ├── craft-.webp        # Craftsmanship image 3
│   │   ├── craft-.webp        # Craftsmanship image 4
│   │   ├── founder.webp       # Founder portrait (placeholder)
│   │   ├── aurelian-solstice.webp
│   │   ├── aurelian-sovereign.webp
│   │   ├── aurelian-circuit.webp
│   │   ├── aurelian-voyager.webp
│   │   ├── aurelian-origin.webp
│   │   └── aurelian-abyss.webp
│   └── Watch-Model/
│       └── aurelian.glb         # 3D watch model
├── CSS/
│   ├── style.css              # Main stylesheet
│   ├── about.css              # About page styles
│   ├── collection.css         # Collection page styles
│   ├── contact.css            # Contact page styles
│   └── craftsmanship.css      # Craftsmanship page styles
├── Fonts/
│   ├── Cormorant-Garamond/
│   │   └── CormorantGaramond-Regular.ttf
│   └── Montserrat/
│       └── Montserrat-Regular.ttf
├── JS/
│   ├── index.js               # Home page scripts
│   ├── about.js               # About page scripts
│   ├── collection.js          # Collection page scripts
│   ├── contact.js             # Contact page scripts
│   ├── craftsmanship.js       # Craftsmanship page scripts
│   └── common.js              # Shared scripts
└── Pages/
    ├── about.html
    ├── collection.html
    ├── contact.html
    └── craftsmanship.html
```

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for 3D features)

### Running the Project

1. **Clone or download** the project files

2. **Open in Browser**
   
   Simply open `index.html` in your browser:
   
   ```
   file:///path/to/aurelian/index.html
   ```

3. **Using a Local Server** (Recommended)
   
   For the best experience, especially with 3D features:
   
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```
   
   Then visit: `http://localhost:8000`

---

## Customization

### Color Scheme

The primary gold accent color is defined in `CSS/style.css`:

```css
:root {
    --gold: #b8972a;
    --gold-light: #d4af5a;
    --dark: #0a0a0a;
    --dark-secondary: #111;
    --text: #c8c0b0;
}
```

### Changing the Accent Color

To change the gold accent color, replace `#b8972a` throughout the CSS files.

### Adding New Watch Models

1. Add the watch image to `Assets/Images/`
2. Open `Pages/collection.html`
3. Add a new watch card:

```html
<div class="watch-card" data-category="sport">
    <div class="watch-card-image">
        <img src="../Assets/Images/your-watch.jpg" alt="Watch Name">
    </div>
    <div class="watch-card-body">
        <p class="watch-card-ref">Ref. XXXXXX</p>
        <h3 class="watch-card-name">Watch Name</h3>
        <p class="watch-card-desc">Description here.</p>
        <a href="#" class="watch-card-link">Explore →</a>
    </div>
</div>
```

### Modifying 3D Model

The 3D watch model is loaded in `JS/index.js` using Three.js. To change the model:

```javascript
// In JS/index.js
const loader = new THREE.GLTFLoader();
loader.load(
    './Assets/Watch-Model/your-model.glb', // Change this path
    (gltf) => { /* ... */ }
);
```

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |

### Not Supported
- Internet Explorer
- Opera Mini

---

## Performance Notes

### Optimization Tips

1. **Image Optimization** — Images are served as WebP with width/height set; keep new images under ~150 KB
2. **Lazy Loading** — Below-the-fold images use `loading="lazy"`
3. **3D Model** — The 3D model adds significant file size; consider using Draco compression
4. **Font Loading** — Fonts are loaded locally; consider using web font optimization

### Mobile Considerations

- Custom cursor is automatically disabled on mobile devices
- 3D interaction is simplified on touch devices
- All animations respect `prefers-reduced-motion`

---

## Credits

### Assets

- **Watch Images** — AURELIAN official assets (placeholders for demonstration)
- **3D Model** — Sample GLB file (placeholder)
- **Fonts** — Google Fonts (Cormorant Garamond, Montserrat)

### Libraries

All external libraries are loaded via CDN:

- [Locomotive Scroll](https://locomotive.github.io/locomotive-scroll/)
- [GSAP](https://greensock.com/)
- [Three.js](https://threejs.org/)
- [Font Awesome](https://fontawesome.com/)
- [Remix Icon](https://remixicon.com/)

---

## Disclaimer

AURELIAN is a **fictional brand** created for portfolio purposes. All names, models, history, addresses and testimonials are invented and any resemblance to real companies is coincidental. The site is not affiliated with or endorsed by any real watch manufacturer.

---

## License

Released under the MIT License — see [LICENSE](LICENSE). Replace the placeholder images listed in `TODO-ASSETS.md` with your own original renders before publishing.

---

**Created with precision and passion** ⌚

