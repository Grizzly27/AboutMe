# 🎨 Customization Guide

## Quick Personalization Checklist

### 1. Update Contact Information

**In `index.html`, find and replace:**

```html
<!-- Line ~570-580 -->
<a href="mailto:drew.whitlock04@gmail.com" class="social-link email">
<a href="https://www.linkedin.com/in/drewwhitlock" class="social-link linkedin">
<a href="https://github.com/Grizzly27" class="social-link github">
```

**Replace with your actual:**
- Email address
- LinkedIn profile URL
- GitHub profile URL
- Twitter/X handle

### 2. Customize Colors (Optional)

**In `css/main.css`, find the `:root` section (line ~2-12):**

```css
:root {
    --color-primary: #122F57;    /* Main brand color */
    --color-secondary: #1C4E80;  /* Secondary brand color */
    --color-accent: #4A78B0;     /* Accent color */
    --color-light: #A7C0E8;      /* Light accent */
    --color-bg: #F5F7FA;         /* Background */
}
```

**Color Palette Suggestions:**
- **Executive Blue** (current): `#122F57, #1C4E80, #4A78B0`
- **Apple Gray**: `#1d1d1f, #424245, #86868b`
- **Professional Green**: `#1B4D3E, #2D7D32, #4CAF50`
- **Modern Purple**: `#4A148C, #7B1FA2, #9C27B0`

### 3. Add Your Photo

**Replace the placeholder avatar:**
1. Add your headshot to the `assets/` folder (name it `headshot.jpg`)
2. In `index.html`, find the avatar section (~line 120):

```html
<div class="avatar-placeholder">DW</div>
```

**Replace with:**
```html
<img src="assets/headshot.jpg" alt="Drew W." class="personal-avatar-img">
```

**Add this CSS to `css/main.css`:**
```css
.personal-avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
}
```

### 4. Update Project Details

**In `index.html`, find the projects section (~line 250-350) and customize:**
- Project titles
- Descriptions
- Technology stacks
- Status badges
- Add links to live projects or GitHub repos

### 5. Modify Experience Details

**Update your current role information (~line 180-220):**
- Company name and logo
- Job title
- Location and work style
- Role description
- Skills and achievements

### 6. Add Real Achievements

**Update the achievements section with your actual accomplishments:**
- Replace the `~$30M` metric with your real numbers
- Update achievement descriptions
- Add quantifiable results and impacts

### 7. Customize Interests

**Modify the interests section (~line 400-450) with your actual hobbies:**
- Change icons (use emoji or add SVG icons)
- Update interest titles and descriptions
- Add/remove interest cards as needed

### 8. Update Speaking Topics

**If you do speaking engagements, update (~line 520-540):**
- Replace with your actual speaking topics
- Add any conferences or events you've spoken at

### 9. Social Media Integration

**Add more social platforms if needed:**

```html
<!-- Add after existing social links -->
<a href="https://www.instagram.com/yourhandle" class="social-link instagram">
    <!-- Instagram SVG icon -->
</a>
```

### 10. SEO Optimization

**In `index.html` head section:**
- Update the `<title>` tag with your name
- Modify the meta description
- Update keywords to match your expertise
- Add your actual location and company

## Advanced Customizations

### Add Blog Section
If you write content, consider adding a blog section:

```html
<section class="blog" id="blog">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Latest Writing</h2>
            <p class="section-subtitle">Thoughts on finance, technology, and leadership</p>
        </div>
        <!-- Add blog posts here -->
    </div>
</section>
```

### Add Testimonials
Add a testimonials section for client or colleague recommendations:

```html
<section class="testimonials">
    <div class="container">
        <h2>What People Say</h2>
        <div class="testimonial-grid">
            <!-- Add testimonials here -->
        </div>
    </div>
</section>
```

### Add Portfolio/Case Studies
For detailed project case studies:

```html
<div class="case-study">
    <h3>Project Deep Dive: Automated Forecasting</h3>
    <div class="case-study-content">
        <div class="problem">
            <h4>The Challenge</h4>
            <p>Describe the business problem...</p>
        </div>
        <div class="solution">
            <h4>The Solution</h4>
            <p>Explain your approach...</p>
        </div>
        <div class="results">
            <h4>The Results</h4>
            <p>Share quantifiable outcomes...</p>
        </div>
    </div>
</div>
```

## Typography Customization

### Using Different Fonts
If you prefer different fonts, update the Google Fonts link:

```html
<!-- Replace SF Pro with your preferred font -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

Then update CSS variables:
```css
--font-family-display: 'Inter', sans-serif;
--font-family-text: 'Inter', sans-serif;
```

## Mobile Optimization

The site is already mobile-optimized, but test on various devices:
- iPhone (Safari)
- Android (Chrome)
- iPad (Safari)
- Various screen sizes

Use browser developer tools (F12) to test different viewport sizes.

## Performance Tips

1. **Optimize images**: Keep images under 500KB
2. **Use WebP format** for better compression
3. **Lazy load images** for faster initial load
4. **Minify CSS/JS** for production (optional)

## Final Checklist

Before deploying:
- [ ] All personal information updated
- [ ] Contact links working
- [ ] All images loading correctly
- [ ] Forms working (test contact form)
- [ ] Mobile responsiveness checked
- [ ] All links functional
- [ ] Spelling and grammar checked
- [ ] SEO tags updated

---

💡 **Pro Tip**: Make small changes and test frequently. The beauty of this design is in its simplicity and attention to detail!
