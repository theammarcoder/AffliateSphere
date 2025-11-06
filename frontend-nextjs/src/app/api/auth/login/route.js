import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/lib/models/Admin';

export async function POST(request) {
  try {
    await connectDB();
    
    const { email, password } = await request.json();

    const admin = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      const sessionData = {
        adminId: admin._id.toString(),
        adminEmail: admin.email
      };
      
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        admin: {
          id: admin._id,
          email: admin.email
        }
      });
      
      // Set session cookie
      response.cookies.set('admin-session', JSON.stringify(sessionData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      
      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

