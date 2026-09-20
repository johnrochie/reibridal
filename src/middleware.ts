import { NextResponse, type NextRequest } from 'next/server';
import { isComingSoonHold } from '@/lib/coming-soon';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/coming-soon') {
    return NextResponse.next();
  }

  const host = [request.headers.get('host'), request.headers.get('x-forwarded-host')]
    .filter(Boolean)
    .join(',');
  if (!isComingSoonHold({ host })) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!api/|studio|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)',
  ],
};
