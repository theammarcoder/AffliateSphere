import { NextResponse } from 'next/server';
import { protect } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    const authResult = await protect();
    
    if (authResult.error) {
      return NextResponse.json(
        { success: false, authenticated: false },
        { status: authResult.status }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      email: authResult.adminEmail
    });
  } catch (error) {
    console.error('Check auth error:', error);
    return NextResponse.json(
      { success: false, authenticated: false },
      { status: 500 }
    );
  }
}

