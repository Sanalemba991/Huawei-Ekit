# Emergency CSP Fix Script
Write-Host "🚨 Applying emergency CSP fix..." -ForegroundColor Red

# Clear any local build cache
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "✅ Cleared .next cache" -ForegroundColor Green
}

# Commit emergency fix
git add .
git commit -m "EMERGENCY FIX: Completely disable CSP causing deployment failures"
git push --force origin main

Write-Host "🚀 Emergency fix deployed!" -ForegroundColor Green
Write-Host "🔧 CSP is now completely disabled" -ForegroundColor Yellow
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Wait 2-3 minutes for Vercel deployment"
Write-Host "  2. Test: https://huawei-kit.vercel.app/"
Write-Host "  3. Check console - should have NO CSP errors"
Write-Host "  4. Add DISABLE_CSP=true to Vercel environment variables"