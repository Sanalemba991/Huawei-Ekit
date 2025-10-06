import { NextRequest, NextResponse } from 'next/server';

export interface SecurityConfig {
  contentSecurityPolicy?: string;
  strictTransportSecurity?: string;
  xFrameOptions?: string;
  xContentTypeOptions?: string;
  referrerPolicy?: string;
  permissionsPolicy?: string;
}

const defaultSecurityConfig: SecurityConfig = {
  // Temporarily disable CSP to fix Vercel deployment
  // contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';",
  strictTransportSecurity: "max-age=63072000; includeSubDomains; preload",
  xFrameOptions: "DENY",
  xContentTypeOptions: "nosniff",
  referrerPolicy: "strict-origin-when-cross-origin",
  permissionsPolicy: "camera=(), microphone=(), geolocation=(), interest-cohort=()"
};

export function addSecurityHeaders(
  response: NextResponse, 
  config: SecurityConfig = defaultSecurityConfig
): NextResponse {
  // Skip CSP if disabled via environment variable
  if (process.env.DISABLE_CSP !== 'true' && config.contentSecurityPolicy) {
    response.headers.set('Content-Security-Policy', config.contentSecurityPolicy);
  }

  // HTTP Strict Transport Security
  if (config.strictTransportSecurity) {
    response.headers.set('Strict-Transport-Security', config.strictTransportSecurity);
  }

  // X-Frame-Options
  if (config.xFrameOptions) {
    response.headers.set('X-Frame-Options', config.xFrameOptions);
  }

  // X-Content-Type-Options
  if (config.xContentTypeOptions) {
    response.headers.set('X-Content-Type-Options', config.xContentTypeOptions);
  }

  // Referrer Policy
  if (config.referrerPolicy) {
    response.headers.set('Referrer-Policy', config.referrerPolicy);
  }

  // Permissions Policy
  if (config.permissionsPolicy) {
    response.headers.set('Permissions-Policy', config.permissionsPolicy);
  }

  // Additional security headers
  response.headers.set('X-DNS-Prefetch-Control', 'off');
  response.headers.set('X-Download-Options', 'noopen');
  response.headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export function createSecureResponse(
  data?: any, 
  status: number = 200,
  config?: SecurityConfig
): NextResponse {
  const response = NextResponse.json(data || { success: true }, { status });
  return addSecurityHeaders(response, config);
}

export function createSecureErrorResponse(
  message: string, 
  status: number = 400,
  config?: SecurityConfig
): NextResponse {
  const response = NextResponse.json({ error: message }, { status });
  return addSecurityHeaders(response, config);
}