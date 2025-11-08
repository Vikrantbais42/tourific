'use server';

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;
  const sessionCookie = request.cookies.get('admin-session');

  // Protect the /admin/dashboard route
  if (pathname.startsWith('/admin/dashboard')) {
    if (!sessionCookie || sessionCookie.value !== 'true') {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If user is logged in and tries to access /admin, redirect to dashboard
  if (pathname === '/admin' || pathname === '/admin/login') {
    if (sessionCookie && sessionCookie.value === 'true') {
      const dashboardUrl = new URL('/admin/dashboard', request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/dashboard', '/admin/login'],
};
