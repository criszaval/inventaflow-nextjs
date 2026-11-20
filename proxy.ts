
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

/**
 * Autenticación administrativa de InventaFlow.
 * En desarrollo permite acceso desde localhost.
 * En producción exige credenciales.
 */
export function proxy(request: NextRequest) {

  // Acceso local durante el desarrollo
  if (
    process.env.NODE_ENV === 'development' &&
    request.nextUrl.hostname === 'localhost'
  ) {
    return NextResponse.next();
  }

  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  const configured = Boolean(username && password);

  if (!configured && process.env.NODE_ENV !== 'production') {
    return NextResponse.next();
  }

  const authorization = request.headers.get('authorization') ?? '';
  let authorized = false;

  if (configured && authorization.startsWith('Basic ')) {
    try {
      const decoded = Buffer.from(
        authorization.slice(6),
        'base64'
      ).toString('utf8');

      const expected = `${username}:${password}`;

      const actualBuffer = Buffer.from(decoded);
      const expectedBuffer = Buffer.from(expected);

      authorized =
        actualBuffer.length === expectedBuffer.length &&
        timingSafeEqual(actualBuffer, expectedBuffer);

    } catch {
      authorized = false;
    }
  }

  if (authorized) {
    return NextResponse.next();
  }

  return new NextResponse(
    'Acceso restringido: configura o introduce credenciales de administrador.',
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="InventaFlow", charset="UTF-8"',
        'Cache-Control': 'no-store',
      },
    }
  );
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt).*)'],
};
