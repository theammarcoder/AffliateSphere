import { NextResponse } from 'next/server';

export async function GET(request) {
  return NextResponse.json({ 
    success: true, 
    message: 'AffiliateSphere API is running',
    timestamp: new Date().toISOString()
  });
}

