import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { checkIsSeason } from './utils/checkIsSeason';

export function middleware(request: NextRequest) {
  const cookies = request.cookies;

  if (request.nextUrl.pathname === '/') {
    if (cookies.has('auth')) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
    return NextResponse.redirect(new URL('/login', request.url));
  } else if (request.nextUrl.pathname === '/home') {
    if (!cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (
    request.nextUrl.pathname === '/create' ||
    request.nextUrl.pathname.startsWith('/edit')
  ) {
    if (!cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!checkIsSeason()) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (request.nextUrl.pathname === '/my') {
    if (!cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname === '/login') {
    if (cookies.has('auth')) {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/plans')) {
    if (!cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  } else if (request.nextUrl.pathname.startsWith('/reminds')) {
    if (!cookies.has('auth')) {
      return NextResponse.redirect(new URL('/login', request.url));
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
  ],
};
