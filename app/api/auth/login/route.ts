import { NextResponse } from 'next/server';
import { createSessionToken } from '../../../../lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const username = String(body.username ?? '').trim();
    const password = String(body.password ?? '');
    const expectedUsername = process.env.DOKTER_JAGA_USERNAME;
    const expectedPassword = process.env.DOKTER_JAGA_PASSWORD;

    if (!expectedUsername || !expectedPassword || !process.env.DOKTER_JAGA_AUTH_SECRET) {
      return NextResponse.json({ error: 'Login belum dikonfigurasi di server.' }, { status: 503 });
    }

    if (username !== expectedUsername || password !== expectedPassword) {
      return NextResponse.json({ error: 'Username atau password salah.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set('dokter_jaga_session', await createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Permintaan login tidak valid.' }, { status: 400 });
  }
}
