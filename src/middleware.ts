import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkIsSeason } from './utils/checkIsSeason';

export function middleware(request: NextRequest) {
  const cookies = request.cookies;
  const hasAuthCookies = cookies.has('auth');

  if (request.nextUrl.pathname === '/') {
    if (hasAuthCookies) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (request.nextUrl.pathname === '/home') {
    if (!hasAuthCookies) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname === '/login') {
    if (hasAuthCookies) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (request.nextUrl.pathname === '/create') {
    if (!hasAuthCookies) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (!checkIsSeason()) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (request.nextUrl.pathname === '/my') {
    if (!hasAuthCookies) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/plans')) {
    if (
      request.nextUrl.pathname.startsWith('/plans/edit') &&
      (!hasAuthCookies || !checkIsSeason())
    ) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/reminds')) {
    if (!hasAuthCookies) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (
      request.nextUrl.pathname.startsWith('/reminds/edit') &&
      !checkIsSeason()
    ) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/create',
    '/edit/:path*',
    '/my',
    '/login',
    '/plans/:path*',
    '/reminds/:path*',
  ],
};
