import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import Category from '@/lib/models/Category';
import { protect } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();
    
    const authResult = await protect();
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }

    const totalProducts = await Product.countDocuments();
    const totalCategories = await Category.countDocuments();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentProducts = await Product.find({ 
      createdAt: { $gte: sevenDaysAgo } 
    })
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(5);

    const systemStatus = {
      database: 'connected',
      geminiAPI: process.env.GEMINI_API_KEY ? 'configured' : 'not configured'
    };

    return NextResponse.json({
      success: true,
      stats: {
        totalProducts,
        totalCategories,
        recentProductsCount: recentProducts.length,
        recentProducts,
        systemStatus
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

