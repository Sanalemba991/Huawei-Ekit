# Vercel Deployment Troubleshooting Guide

## 🚨 Common Production Issues & Fixes

### 1. Content Security Policy (CSP) Errors

#### Issue:
```
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self' 'unsafe-eval' 'unsafe-inline'"
```

#### ✅ Fixed in Configuration:
- Updated `vercel.json` with proper CSP headers
- Updated `next.config.ts` with Vercel-specific script sources
- Updated `middleware.ts` with correct CSP policy

#### Vercel Specific Domains Added:
- `https://vercel.live` - Vercel live preview
- `https://*.vercel.app` - Vercel application domains
- `https://va.vercel-scripts.com` - Vercel analytics scripts

### 2. Connection Closed Errors

#### Issue:
```
Uncaught Error: Connection closed.
Uncaught (in promise) Error: Connection closed.
```

#### ✅ Fixed in Database Configuration:
- Added connection pooling (`maxPoolSize: 10`)
- Added timeout settings (`serverSelectionTimeoutMS`, `socketTimeoutMS`)
- Added IPv4 preference (`family: 4`)
- Added retry logic and error handling
- Added connection event handlers

### 3. Deployment Steps After Fixes

#### Step 1: Commit Changes
```bash
git add .
git commit -m "Fix CSP and connection issues for Vercel deployment"
git push origin main
```

#### Step 2: Redeploy on Vercel
- Vercel will automatically redeploy from GitHub
- Or manually redeploy from Vercel dashboard

#### Step 3: Verify Environment Variables
Ensure these are set in Vercel:
```
MONGO_URI=mongodb+srv://websitedata0102_db_user:roygU3jcJBPOWfH4@huaweiekit.ascs3fq.mongodb.net/Huawei-ekit?retryWrites=true&w=majority&appName=huaweiekit
JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long
ADMIN_USERNAME=admin_secure_2024
ADMIN_PASSWORD=HuAwEi@eKit_UAE
NEXTAUTH_URL=https://your-actual-vercel-url.vercel.app
NEXTAUTH_SECRET=your-nextauth-secret-key-minimum-32-characters
```

### 4. Testing Checklist

#### ✅ Frontend Tests:
- [ ] Homepage loads without CSP errors
- [ ] Navigation works properly
- [ ] Images display correctly
- [ ] No console errors
- [ ] Mobile responsiveness

#### ✅ Admin Panel Tests:
- [ ] Admin login works
- [ ] Dashboard loads without errors
- [ ] File uploads function
- [ ] Database operations work
- [ ] No connection errors

#### ✅ API Tests:
- [ ] Health check: `https://your-domain.vercel.app/api/health`
- [ ] Authentication endpoints work
- [ ] CRUD operations function
- [ ] No 500 errors

### 5. Performance Monitoring

#### Check Vercel Functions:
1. Go to Vercel Dashboard → Your Project → Functions
2. Monitor execution times and errors
3. Check for timeout issues (max 30s configured)

#### Database Connection Monitoring:
1. Check MongoDB Atlas logs
2. Monitor connection pool usage
3. Watch for connection drops

### 6. Advanced Debugging

#### Enable Vercel Analytics:
```bash
npm install @vercel/analytics
```

Add to your layout:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

#### Check Function Logs:
```bash
# Install Vercel CLI
npm install -g vercel

# View function logs
vercel logs --follow
```

### 7. Security Headers Verification

Test your deployment with:
- [Security Headers Checker](https://securityheaders.com/)
- Browser Developer Tools → Network → Response Headers

Expected headers:
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

### 8. Quick Fixes for Common Issues

#### If still getting CSP errors:
1. Check browser console for specific violations
2. Add missing domains to CSP policy
3. Remove any hardcoded inline scripts

#### If database connections fail:
1. Verify MongoDB Atlas IP whitelist (allow all: 0.0.0.0/0)
2. Check database user permissions
3. Test connection string manually

#### If functions timeout:
1. Optimize database queries
2. Add proper indexing
3. Consider breaking up large operations

### 9. Rollback Plan

If issues persist:
1. Revert to previous working commit
2. Deploy simpler CSP policy first
3. Gradually add restrictions

### 10. Success Verification

After deployment, your app should:
- ✅ Load without any console errors
- ✅ Allow admin login and dashboard access
- ✅ Handle file uploads properly
- ✅ Show proper security headers
- ✅ Connect to MongoDB Atlas successfully

---

## 📞 Getting Help

If issues persist:
1. Check Vercel dashboard for specific error messages
2. Review function logs for detailed error traces
3. Test locally with `vercel dev` to simulate Vercel environment
4. Contact Vercel support if platform-specific issues

Your deployment should now be production-ready! 🚀