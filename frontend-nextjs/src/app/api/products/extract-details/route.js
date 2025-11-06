import { NextResponse } from 'next/server';
import { protect } from '@/lib/middleware/auth';
import { extractProductDetails } from '@/lib/services/geminiService';

export async function POST(request) {
  try {
    const authResult = await protect();
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }

    const { affiliateLink } = await request.json();

    if (!affiliateLink || affiliateLink.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Affiliate link is required' },
        { status: 400 }
      );
    }

    const result = await extractProductDetails(affiliateLink);

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Extract details error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

