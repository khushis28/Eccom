# 🚀 Deployment Guide - EcomPulse Analytics Dashboard

## 📦 GitHub Push Instructions

### Step 1: Fix GitHub Authentication

The push failed because you're logged in as `Abhishek9503` but trying to push to `khushis28/Ecom-PulseV2`. You have two options:

#### Option A: Push with Personal Access Token (Recommended)

1. **Generate GitHub Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo` (all)
   - Copy the token

2. **Push with Token:**
   ```powershell
   cd "e:\Web_Dev\(0) All Projects\Khushi\EcomPulse\ecom-analytics-dashboard"
   
   # Remove existing remote
   git remote remove origin
   
   # Add remote with token
   git remote add origin https://YOUR_TOKEN@github.com/khushis28/Ecom-PulseV2.git
   
   # Push
   git push -u origin main
   ```

#### Option B: Use GitHub Desktop or GitHub CLI

1. **Install GitHub Desktop:** https://desktop.github.com/
2. Add the repository
3. Sign in with khushis28 account
4. Push from the GUI

#### Option C: Use SSH (More Secure)

1. **Generate SSH Key:**
   ```powershell
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```

2. **Add SSH key to GitHub:**
   - Copy key: `cat ~/.ssh/id_ed25519.pub`
   - Go to: https://github.com/settings/keys
   - Click "New SSH key" and paste

3. **Change remote to SSH:**
   ```powershell
   cd "e:\Web_Dev\(0) All Projects\Khushi\EcomPulse\ecom-analytics-dashboard"
   git remote set-url origin git@github.com:khushis28/Ecom-PulseV2.git
   git push -u origin main
   ```

---

## 🌐 Vercel Deployment (Frontend)

### Prerequisites
- Vercel account linked to GitHub
- Repository pushed to GitHub

### Deployment Steps

1. **Go to Vercel:** https://vercel.com/
2. **Sign in with GitHub**
3. **Click "Add New Project"**
4. **Import your repository:** `khushis28/Ecom-PulseV2`
5. **Configure Project:**
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

6. **Environment Variables** (if needed):
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

7. **Click "Deploy"**

### Update Frontend Code for Production

Update `frontend/src/App.jsx`:

```javascript
// Change from localhost to environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const fetchMetrics = async () => {
  const response = await axios.get(`${API_URL}/api/metrics`)
  setMetrics(response.data)
}
```

---

## ⚙️ Render Deployment (Backend)

### Prerequisites
- Render account linked to GitHub
- Repository pushed to GitHub

### Deployment Steps

1. **Go to Render:** https://render.com/
2. **Sign in with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your repository:** `khushis28/Ecom-PulseV2`
5. **Configure Service:**
   ```
   Name: ecompulse-backend
   Region: Choose closest to you
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

6. **Environment Variables:**
   ```
   NODE_ENV=production
   PORT=5000
   ```

7. **Instance Type:** Free (or paid if needed)

8. **Click "Create Web Service"**

### Update Backend Code for Production

Update `backend/server.js`:

```javascript
// At the top, add environment variables
const PORT = process.env.PORT || 5000;

// Update CORS to allow your Vercel domain
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app.vercel.app' // Add your Vercel URL
  ]
}));
```

---

## 🔗 Connect Frontend to Backend

### After Both Are Deployed:

1. **Get your Render backend URL:** 
   - Example: `https://ecompulse-backend.onrender.com`

2. **Update Vercel Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add: `VITE_API_URL=https://ecompulse-backend.onrender.com`
   - Redeploy

3. **Test the connection:**
   - Visit your Vercel URL
   - Check browser console (F12)
   - Verify data is loading

---

## 📋 Pre-Deployment Checklist

### Backend Preparation

- [ ] Create `backend/.gitignore` with:
  ```
  node_modules/
  .env
  *.log
  ```

- [ ] Update `backend/package.json` with proper scripts:
  ```json
  {
    "scripts": {
      "start": "node server.js",
      "dev": "nodemon server.js"
    },
    "engines": {
      "node": ">=18.0.0"
    }
  }
  ```

- [ ] Update CORS settings for production
- [ ] Add environment variable support
- [ ] Test locally: `npm start`

### Frontend Preparation

- [ ] Create `frontend/.gitignore` with:
  ```
  node_modules/
  dist/
  .env
  ```

- [ ] Update API endpoint to use environment variables
- [ ] Test build locally: `npm run build`
- [ ] Test preview: `npm run preview`

---

## 🎯 Deployment Commands Summary

### Push to GitHub (After fixing auth)

```powershell
cd "e:\Web_Dev\(0) All Projects\Khushi\EcomPulse\ecom-analytics-dashboard"

# Check status
git status

# Add any new changes
git add .

# Commit
git commit -m "Ready for deployment"

# Push to GitHub
git push origin main
```

### Local Testing Before Deploy

```powershell
# Test Backend
cd backend
npm install
npm start
# Check: http://localhost:5000/api/metrics

# Test Frontend
cd ../frontend
npm install
npm run build
npm run preview
# Check: http://localhost:4173
```

---

## 🔧 Troubleshooting

### Vercel Build Fails

**Error: "Module not found"**
- Check `package.json` dependencies
- Ensure all imports use correct paths
- Run `npm install` locally first

**Error: "Build timeout"**
- Increase build timeout in Vercel settings
- Optimize dependencies

### Render Deployment Fails

**Error: "Port already in use"**
- Use `process.env.PORT` in server.js
- Don't hardcode port 5000

**Error: "Cannot find module"**
- Check `package.json` dependencies
- Ensure `node_modules` is in `.gitignore`

### CORS Errors After Deployment

Update backend CORS:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-url.vercel.app'
  ],
  credentials: true
}));
```

---

## 📱 Post-Deployment

### Update README.md with Live URLs

```markdown
## 🌐 Live Demo

- **Frontend:** https://your-app.vercel.app
- **Backend API:** https://ecompulse-backend.onrender.com/api/metrics
- **Prometheus Metrics:** https://ecompulse-backend.onrender.com/metrics
```

### Monitor Your App

- **Vercel Analytics:** Check performance and errors
- **Render Logs:** Monitor backend activity
- **GitHub Actions:** Set up CI/CD (optional)

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Frontend loads at Vercel URL
- [ ] Backend responds at Render URL
- [ ] Dashboard shows live data
- [ ] Charts update every 5 seconds
- [ ] No CORS errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Prometheus metrics accessible

---

**You're ready to deploy! Follow these steps and your app will be live!** 🚀
