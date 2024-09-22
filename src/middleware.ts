import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { SESSION_KEY_NAME } from './lib/session';

const publicRoutes = ['/auth/login', '/auth/register', '/'];
const baseProtectedRoutes = ['/home', '/courses'];

export default async function middleware(req: NextRequest) {
  console.log(`Middleware hit: ${req.nextUrl.pathname}`);
  // Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isPublicRoute = publicRoutes.includes(path);
  const isProtectedRoute = baseProtectedRoutes.some((protectedRoute) =>
    path.startsWith(protectedRoute)
  );

  const accessToken = cookies().get(SESSION_KEY_NAME)?.value ?? '';

  console.log({
    isProtectedRoute,
    isPublicRoute,
    accessToken,
  });

  // Redirect to /auth/login if the user is not authenticated
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  // Redirect to /home if the user is authenticated
  if (isPublicRoute && accessToken) {
    return NextResponse.redirect(new URL('/home', req.nextUrl));
  }

  console.log(`Middleware allowing to access: ${req.nextUrl.pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};
