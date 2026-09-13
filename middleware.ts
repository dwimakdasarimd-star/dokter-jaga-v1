import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from './lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('dokter_jaga_session')?.value;
  if (await verifySessionToken(token)) return NextResponse.next();

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('next', request.nextUrl.pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)'],
};
