import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = path.startsWith('/admin') || path.startsWith('/student');

  if (isProtectedRoute) {
    const session = (await cookies()).get('session')?.value;
    const decrypted = session ? await decrypt(session) : null;

    if (!decrypted) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Role-based access control
    if (path.startsWith('/admin') && decrypted.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (path.startsWith('/student') && decrypted.role !== 'student') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
