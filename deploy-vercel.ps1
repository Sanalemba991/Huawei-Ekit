# Vercel deployment script
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Green

# Check if Vercel CLI is installed
if (!(Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Login to Vercel (if not already logged in)
Write-Host "Checking Vercel authentication..." -ForegroundColor Cyan
vercel whoami

if ($LASTEXITCODE -ne 0) {
    Write-Host "Please login to Vercel:" -ForegroundColor Yellow
    vercel login
}

# Deploy to Vercel
Write-Host "Deploying to Vercel..." -ForegroundColor Green
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "Check your deployment at: https://vercel.com/dashboard" -ForegroundColor Cyan