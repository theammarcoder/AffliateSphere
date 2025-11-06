import { cookies } from 'next/headers';

// Simple session management using cookies
// In production, consider using a more robust solution like next-auth or iron-session

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('admin-session');
    
    if (!sessionCookie) {
      return null;
    }
    
    const session = JSON.parse(sessionCookie.value);
    return session;
  } catch (error) {
    return null;
  }
}

export async function setSession(sessionData) {
  const cookieStore = await cookies();
  cookieStore.set('admin-session', JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete('admin-session');
}

