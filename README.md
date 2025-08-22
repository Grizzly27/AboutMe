# Drew W. - Personal Portfolio Website

A modern, Apple-inspired personal portfolio website showcasing finance and technology leadership expertise.

## 🌟 Features

- **Apple-Quality Design**: Clean, modern interface inspired by Apple's design principles
- **Responsive Layout**: Optimized for all devices from mobile to desktop
- **Smooth Animations**: Subtle, professional animations and micro-interactions
- **Interactive Elements**: Dynamic navigation, form validation, and hover effects
- **Performance Optimized**: Fast loading with modern web technologies
- **Accessible**: Built with accessibility best practices in mind

## 🚀 Technology Stack

- **HTML5**: Semantic markup with modern standards
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+**: Modern JavaScript with classes and async/await
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Typography**: Apple's SF Pro font family (with system fallbacks)

## 📁 Project Structure

```
drew-portfolio/
├── index.html          # Main HTML file
├── css/
│   └── main.css        # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── assets/             # Images and other assets
└── README.md          # Project documentation
```

## 🛠️ Setup Instructions

### Local Development

1. **Clone or download** the project to your local machine
2. **Open the project** in VS Code or your preferred editor
3. **Serve the files** using a local server:
   
   **Option A: VS Code Live Server**
   - Install the "Live Server" extension
   - Right-click on `index.html` and select "Open with Live Server"
   
   **Option B: Python Server**
   ```bash
   # Navigate to the project directory
   cd drew-portfolio
   
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
   
   **Option C: Node.js Server**
   ```bash
   npx http-server . -p 8000
   ```

4. **Open your browser** and navigate to `http://localhost:8000`

### GitHub Pages Deployment

1. **Create a new repository** on GitHub
2. **Upload all files** to the repository
3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"
4. **Access your site** at `https://yourusername.github.io/repository-name`

## 🎨 Customization

### Colors
The site uses CSS custom properties for easy color customization. Update the `:root` variables in `css/main.css`:

```css
:root {
    --color-primary: #122F57;    /* Primary blue */
    --color-secondary: #1C4E80;  /* Secondary blue */
    --color-accent: #4A78B0;     /* Accent blue */
    --color-light: #A7C0E8;      /* Light blue */
    --color-bg: #F5F7FA;         /* Background */
}
```

### Content
Update the content in `index.html`:
- Personal information in the About section
- Career details and achievements
- Project descriptions and links
- Contact information and social links

### Typography
The site uses Apple's SF Pro font family. If you prefer different fonts:
1. Update the Google Fonts link in `index.html`
2. Modify the font family variables in `css/main.css`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ⚡ Performance Features

- **Optimized Images**: Compressed and properly sized images
- **Efficient CSS**: Minimal and organized stylesheets
- **Modern JavaScript**: ES6+ features with performance optimizations
- **Lazy Loading**: Images and non-critical resources
- **Smooth Scrolling**: Hardware-accelerated animations

## 🔧 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal portfolio, but if you find bugs or have suggestions:
1. Open an issue
2. Submit a pull request
3. Contact me directly

## 📞 Contact

- **Email**: [your-email@domain.com]
- **LinkedIn**: [Your LinkedIn Profile]
- **GitHub**: [Your GitHub Profile]

---

Built with ❤️ using modern web technologies and Apple-inspired design principles.
