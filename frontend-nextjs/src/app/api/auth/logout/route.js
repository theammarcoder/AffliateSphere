import { NextResponse } from 'next/server';
import { protect } from '@/lib/middleware/auth';
import { destroySession } from '@/lib/session';

export async function POST(request) {
  try {
    const authResult = await protect();
    
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }

    await destroySession();
    
    const response = NextResponse.json({ success: true, message: 'Logout successful' });
    response.cookies.delete('admin-session');
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}

