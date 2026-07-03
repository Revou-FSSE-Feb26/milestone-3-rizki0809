import { NextResponse } from 'next/server';

const ADMIN_PREFIX = '/admin';
const USER_PROTECTED_PATHS = ['/cart', '/checkout'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('revoshop_token')?.value;
  const role = request.cookies.get('revoshop_role')?.value;

  if (pathname.startsWith(ADMIN_PREFIX)) {
    if (!token || role !== 'admin') {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      loginUrl.searchParams.set('reason', 'admin-required');
      return NextResponse.redirect(loginUrl);
    }
  }

  if (USER_PROTECTED_PATHS.some((p) => pathname.startsWith(p))) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/cart', '/checkout'],
};
