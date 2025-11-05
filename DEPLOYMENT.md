# 🚀 Deployment Guide - AffiliateSphere

Complete guide to deploy AffiliateSphere to production.

## Prerequisites

- ✅ Backend and frontend working locally
- ✅ GitHub account (recommended for deployment)
- ✅ Domain name (optional, but recommended)

## Option 1: Deploy with Railway (Recommended for Backend)

### Backend Deployment on Railway

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Select your backend folder

3. **Configure Environment Variables**
   Add these in Railway dashboard:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://amaarmazhar757:ammar12@cluster0.p1zprli.mongodb.net/affiliateDB
   GEMINI_API_KEY=AIzaSyBqhqwTHwkXP6f2zhUsP8aqgSpRwMJCQAo
   SESSION_SECRET=affiliatesphere_secret_key_2024
   ADMIN_EMAIL=ammarahmadkhan757@gmail.com
   EMAIL_USER=ammarahmadkhan757@gmail.com
   EMAIL_PASS=your_gmail_app_password
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway will auto-deploy
   - Copy your backend URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment on Vercel

1. **Sign up at Vercel**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select `frontend` folder as root directory

3. **Configure Build Settings**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```

5. **Update Frontend API Base URL**
   In `frontend/src/context/AuthContext.jsx` and API calls, update:
   ```js
   axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
   ```

6. **Deploy**
   - Click "Deploy"
   - Your site will be live at `https://your-app.vercel.app`

## Option 2: Deploy with Render

### Backend on Render

1. **Sign up at Render**
   - Go to https://render.com
   - Sign up with GitHub

2. **Create Web Service**
   - New → Web Service
   - Connect your GitHub repo
   - Select backend folder

3. **Configure**
   ```
   Name: affiliatesphere-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables**
   Same as Railway configuration above

5. **Deploy**
   - Render will deploy automatically
   - Copy your backend URL

### Frontend on Render (Static Site)

1. **Create Static Site**
   - New → Static Site
   - Connect frontend folder

2. **Configure**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

3. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   ```

## Option 3: Deploy with Netlify (Frontend Only)

1. **Sign up at Netlify**
   - Go to https://netlify.com
   - Sign up with GitHub

2. **Deploy**
   - Drag and drop `frontend/dist` folder after building
   OR
   - Connect GitHub repo and auto-deploy

3. **Configure**
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

## Post-Deployment Checklist

### 1. Update CORS in Backend

In `backend/server.js`, update CORS origin:
```js
app.use(cors({
  origin: 'https://your-frontend.vercel.app',
  credentials: true
}));
```

### 2. Update Cookie Settings

In `backend/server.js`, enable secure cookies:
```js
cookie: {
  maxAge: 1000 * 60 * 60 * 24 * 7,
  httpOnly: true,
  secure: true,  // Enable for production
  sameSite: 'none'  // Required for cross-origin
}
```

### 3. Run Admin Initialization

After backend is deployed, initialize admin:
- Connect to your production database via MongoDB Compass
- Or SSH into your server and run: `node scripts/initAdmin.js`

### 4. Test Everything

- [ ] User website loads
- [ ] Products display correctly
- [ ] Search and filters work
- [ ] Admin login works
- [ ] Create category works
- [ ] Add product with AI works
- [ ] Edit product works
- [ ] Delete product works
- [ ] Contact form sends emails

## Custom Domain Setup

### Vercel
1. Go to Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Railway
1. Go to Settings → Domains
2. Add custom domain
3. Update CNAME record

## SSL/HTTPS

All platforms provide free SSL certificates:
- Vercel: Automatic
- Railway: Automatic
- Render: Automatic
- Netlify: Automatic

## Database Backup

**MongoDB Atlas** (already configured):
1. Go to MongoDB Atlas dashboard
2. Set up automated backups
3. Configure backup retention policy

## Monitoring

### Backend Monitoring
- Use Railway/Render built-in logs
- Set up error alerts
- Monitor API response times

### Frontend Monitoring
- Vercel Analytics (built-in)
- Google Analytics (optional)

## Environment-Specific Config

### Development
```env
NODE_ENV=development
```

### Production
```env
NODE_ENV=production
```

## Scaling Considerations

### When to Scale
- More than 1000 daily active users
- Database queries getting slower
- API response times > 500ms

### How to Scale
1. **Database**: Upgrade MongoDB Atlas tier
2. **Backend**: Upgrade Railway/Render plan
3. **Frontend**: Vercel handles scaling automatically
4. **CDN**: Add Cloudflare for static assets

## Cost Estimate

### Free Tier (Good for 1000+ users/month)
- **Railway**: Free tier available
- **Vercel**: Free tier with generous limits
- **MongoDB Atlas**: Free M0 cluster (512MB)
- **Total**: $0/month

### Paid Tier (Production-ready)
- **Railway**: $5-20/month
- **Vercel**: Free (Pro at $20/month optional)
- **MongoDB Atlas**: $9-57/month
- **Domain**: $12/year
- **Total**: ~$20-50/month

## Security Checklist

- [ ] All API keys in environment variables
- [ ] HTTPS enabled
- [ ] Secure cookies enabled
- [ ] CORS properly configured
- [ ] Rate limiting enabled (optional)
- [ ] Input validation on all forms
- [ ] Regular dependency updates

## Rollback Plan

If deployment fails:
1. Revert to previous GitHub commit
2. Redeploy from dashboard
3. Check environment variables
4. Review deployment logs

## Support

For deployment help:
- Email: ammarahmadkhan757@gmail.com
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs

---

**Good luck with your deployment! 🚀**
