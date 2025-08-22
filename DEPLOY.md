# 🚀 Deployment Guide

## Quick Deploy to GitHub Pages

### Method 1: Direct GitHub Upload (Easiest)

1. **Create a new repository on GitHub**:
   - Go to [GitHub.com](https://github.com) and sign in
   - Click the "+" icon in the top right → "New repository"
   - Name it `drew-portfolio` (or any name you prefer)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)
   - Click "Create repository"

2. **Upload your files**:
   - Click "uploading an existing file"
   - Drag and drop all files from your `drew-portfolio` folder
   - Or click "choose your files" and select all files
   - Write commit message: "Initial commit: Portfolio website"
   - Click "Commit changes"

3. **Enable GitHub Pages**:
   - Go to repository "Settings" tab
   - Scroll down to "Pages" section (in the left sidebar)
   - Under "Source", select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

4. **Access your live site**:
   - GitHub will show you the URL: `https://yourusername.github.io/drew-portfolio`
   - It takes 1-5 minutes to deploy
   - Your site will be live!

### Method 2: Command Line (If you have Git configured)

```bash
# Add GitHub as remote origin (replace with your repo URL)
git remote add origin https://github.com/yourusername/drew-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main

# Then follow step 3 above to enable GitHub Pages
```

## Custom Domain (Optional)

If you want to use your own domain (e.g., `dreww.dev`):

1. **Buy a domain** from any registrar (Namecheap, GoDaddy, etc.)

2. **Add CNAME file** to your repository:
   - Create a new file called `CNAME` (no extension)
   - Add your domain: `dreww.dev`
   - Commit the change

3. **Configure DNS** at your domain registrar:
   - Add a CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

4. **Update GitHub Pages settings**:
   - Go to repository Settings → Pages
   - Enter your custom domain
   - Enable "Enforce HTTPS" (recommended)

## Testing Locally

### Option 1: Live Server Extension (VS Code)
1. Install "Live Server" extension in VS Code
2. Right-click `index.html` → "Open with Live Server"
3. Your site opens at `http://127.0.0.1:5500`

### Option 2: Python Server
```bash
# Python 3
python -m http.server 8000

# Then visit http://localhost:8000
```

### Option 3: Node.js
```bash
# Install http-server globally
npm install -g http-server

# Run from project directory
http-server . -p 8000

# Visit http://localhost:8000
```

## Making Updates

After your initial deployment:

1. **Edit files** locally
2. **Test changes** using local server
3. **Update GitHub repository**:
   - Upload changed files via GitHub web interface
   - Or use `git push` if using command line
4. **Changes go live** automatically (1-5 minutes)

## SEO and Social Media

### Update these in `index.html`:
- Change social media links (LinkedIn, GitHub, etc.)
- Update email address
- Add your actual domain to canonical URLs
- Consider adding Open Graph meta tags for better social sharing

### Google Analytics (Optional):
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## Performance Optimization

Your site is already optimized with:
- ✅ Compressed CSS and JavaScript
- ✅ Optimized images and fonts
- ✅ Modern browser features
- ✅ Mobile-first responsive design

## Troubleshooting

**Site not loading?**
- Check that `index.html` is in the root directory
- Verify GitHub Pages is enabled in Settings
- Make sure repository is public
- Wait 5-10 minutes after enabling Pages

**Styles not working?**
- Check that CSS and JS file paths are correct
- Ensure files are uploaded to correct folders
- Check browser console for errors (F12)

**Custom domain not working?**
- Verify DNS settings at your domain registrar
- Check CNAME file contains only your domain
- DNS changes can take 24-48 hours to propagate

## Support

If you encounter issues:
1. Check GitHub Pages documentation
2. Verify all files are uploaded correctly
3. Test locally first to isolate issues
4. Contact me if needed!

---

🎉 **Congratulations!** Your Apple-quality portfolio is ready to impress potential employers and clients!
