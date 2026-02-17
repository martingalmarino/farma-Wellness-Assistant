# Deployment Guide

## Quick Deploy to Vercel (Recommended)

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to deploy your project.

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel will auto-detect Next.js and configure everything
5. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

## Environment Variables

No environment variables are required. The app works completely offline with hardcoded data.

Optional (for future enhancements):
```bash
OPENAI_API_KEY=your_key_here  # For LLM-powered responses
```

## Other Deployment Platforms

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Railway

1. Connect your GitHub repo to Railway
2. Railway will auto-detect Next.js
3. Click "Deploy"

### Digital Ocean App Platform

1. Create a new app from your Git repo
2. Select "Next.js" as the build type
3. Click "Deploy"

## Build Commands

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Dev Command:** `npm run dev`
- **Output Directory:** `.next`

## Performance Optimization

The app is already optimized with:
- ✅ Static generation where possible
- ✅ Client-side state management
- ✅ No external API calls
- ✅ Minimal bundle size
- ✅ Tailwind CSS purging

## Testing Your Deployment

After deployment, test these flows:

1. **Home Page**
   - Load the homepage
   - View product grid
   - Click "Start Assistant"

2. **Assistant Flow**
   - Select a goal (e.g., Sleep)
   - Answer 3 questions
   - View recommendations
   - Add products to cart

3. **Cart Page**
   - View cart items
   - See optimization suggestions
   - Add suggested products
   - Proceed to checkout

4. **Checkout**
   - View order summary
   - Toggle replenishment reminder
   - Complete order

5. **Debug Page**
   - Navigate to `/debug`
   - View analytics events
   - Verify all interactions logged

## Production Checklist

- [x] All dependencies installed
- [x] Build completes without errors
- [x] All pages load correctly
- [x] Cart persists in localStorage
- [x] Analytics events tracked
- [x] Mobile responsive design
- [x] Disclaimers on all pages
- [x] No console errors
- [x] No broken links

## Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### localStorage Issues

If cart doesn't persist:
- Check browser localStorage is enabled
- Verify not in incognito/private mode
- Clear site data and refresh

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## Support

For deployment issues, check:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- Platform-specific documentation

---

**Your FarmaQuiero Demo is ready to deploy! 🚀**
