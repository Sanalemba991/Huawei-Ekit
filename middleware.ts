import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Minimal middleware - no security headers during debugging
  const response = NextResponse.next();
  
  // Only handle authentication and blocking sensitive files
  const { pathname } = request.nextUrl;

  // Block access to sensitive files
  if (pathname.includes('.env') || 
      pathname.includes('config.json') || 
      pathname.includes('/logs/') ||
      pathname.includes('.git/')) {
    return NextResponse.json({ 
      error: 'Access denied' 
    }, { status: 403 });
  }

  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};