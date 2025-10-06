# Huawei eKit UAE - Vercel Deployment Guide

## 🚀 Deploy to Vercel

This guide will walk you through deploying your Huawei eKit UAE application to Vercel.

## Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository (already set up)
- MongoDB Atlas database (production ready)

## Step-by-Step Deployment

### 1. Connect Repository to Vercel

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "New Project"
   - Select your GitHub repository: `adeebjamil/Huawei-Kit`
   - Click "Import"

3. **Configure Project**
   - Project Name: `huawei-ekit-uae`
   - Framework: Next.js (auto-detected)
   - Root Directory: `./` (leave default)

### 2. Environment Variables Setup

In the Vercel dashboard, add these environment variables:

#### Required Variables:
```env
MONGO_URI=mongodb+srv://websitedata0102_db_user:roygU3jcJBPOWfH4@huaweiekit.ascs3fq.mongodb.net/Huawei-ekit?retryWrites=true&w=majority&appName=huaweiekit

JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long

ADMIN_USERNAME=admin_secure_2024

ADMIN_PASSWORD=HuAwEi@eKit_UAE

NEXTAUTH_URL=https://your-vercel-domain.vercel.app

NEXTAUTH_SECRET=your-nextauth-secret-key-minimum-32-characters
```

#### How to Add Environment Variables:
1. In your Vercel project dashboard
2. Go to "Settings" → "Environment Variables"
3. Add each variable with appropriate values
4. Set environment: `Production`, `Preview`, and `Development`

### 3. Build Settings

Vercel will automatically detect these from `vercel.json`:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### 4. Deploy

1. Click "Deploy" in Vercel
2. Wait for build completion (2-5 minutes)
3. Your app will be available at: `https://your-project-name.vercel.app`

## 🔧 Advanced Configuration

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to "Settings" → "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update Environment Variables**
   ```env
   NEXTAUTH_URL=https://your-custom-domain.com
   ```

### Performance Optimizations

Our `vercel.json` includes:
- **Function timeout**: 30 seconds for API routes
- **Headers**: Security headers for all routes
- **Redirects**: Admin route optimization
- **Rewrites**: Upload path handling

### Security Headers

Automatically configured:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Enable in project settings
2. Add Vercel Analytics to your app:
   ```bash
   npm install @vercel/analytics
   ```

### Function Logs

- View in Vercel dashboard → "Functions" tab
- Real-time logging available
- Error tracking and performance metrics

## 🔒 Security Considerations

### Environment Variables Security

✅ **Secure Variables** (use Vercel environment variables):
- Database credentials
- JWT secrets
- Admin credentials
- API keys

❌ **Never commit** sensitive data to repository

### CORS Configuration

Our setup includes proper CORS headers for API routes:
```json
{
  "key": "Access-Control-Allow-Origin",
  "value": "*"
}
```

## 🚨 Troubleshooting

### Common Issues

**1. Build Failures**
```bash
# Check build logs in Vercel dashboard
# Common fixes:
- Ensure all dependencies are in package.json
- Check TypeScript errors
- Verify environment variables
```

**2. Database Connection Issues**
```bash
# Verify MongoDB Atlas connection string
# Check IP whitelist (allow all: 0.0.0.0/0)
# Verify database user permissions
```

**3. API Route Timeouts**
```bash
# Default Vercel timeout: 10s
# Our config allows 30s for complex operations
# Optimize database queries if needed
```

**4. Image Upload Issues**
```bash
# Vercel has 50MB deployment limit
# Use external storage for large files
# Configure proper file handling
```

### Debug Tools

1. **Vercel CLI**
   ```bash
   npm install -g vercel
   vercel dev  # Local development with Vercel environment
   vercel logs # View function logs
   ```

2. **Build Analysis**
   ```bash
   npm run build  # Test build locally
   npm run start  # Test production build
   ```

## 🔄 Continuous Deployment

### Automatic Deployments

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from pull requests
- **Branch**: Deploy specific branches

### Deployment Workflow

1. Push to GitHub → Automatic Vercel deployment
2. Preview URLs for testing
3. Automatic promotion to production

## 📈 Post-Deployment Checklist

### ✅ Verify Functionality

1. **Basic Navigation**
   - [ ] Homepage loads correctly
   - [ ] All navigation links work
   - [ ] Images display properly

2. **Admin Panel**
   - [ ] Admin login works
   - [ ] Dashboard loads statistics
   - [ ] File uploads function
   - [ ] Database operations work

3. **API Endpoints**
   - [ ] Health check: `/api/health`
   - [ ] Authentication APIs
   - [ ] CRUD operations

4. **Performance**
   - [ ] Page load times < 3 seconds
   - [ ] Images optimized
   - [ ] Database queries efficient

### 🎯 Production Optimization

1. **Enable Vercel Speed Insights**
2. **Configure CDN settings**
3. **Set up monitoring alerts**
4. **Regular performance audits**

## 📞 Support

### Vercel Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Project Support
- GitHub Issues: [Create an issue](https://github.com/adeebjamil/Huawei-Kit/issues)
- Documentation: Check project README

---

## 🎉 Your Deployment URL

After successful deployment, your application will be available at:
**https://huawei-ekit-uae.vercel.app**

Update your `NEXTAUTH_URL` environment variable with this URL for proper authentication.

---

**Huawei eKit UAE** - Now live on Vercel! 🚀