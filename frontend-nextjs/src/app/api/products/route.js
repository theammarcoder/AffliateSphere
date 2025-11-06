import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { protect } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'latest';
    const minRating = searchParams.get('minRating');

    let query = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    if (sort === 'rating-desc') {
      query.rating = { $gt: 0 };
    }

    let sortObj = {};
    switch (sort) {
      case 'rating-desc':
        sortObj = { rating: -1, createdAt: -1 };
        break;
      case 'price-asc':
        sortObj = { price: 1, createdAt: -1 };
        break;
      case 'price-desc':
        sortObj = { price: -1, createdAt: -1 };
        break;
      case 'latest':
      default:
        sortObj = { createdAt: -1 };
        break;
    }

    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort(sortObj)
      .lean();

    return NextResponse.json({ success: true, products, count: products.length });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const authResult = await protect();
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }

    const { title, description, image, category, price, rating, affiliateLink, buttonText, tags } = await request.json();

    if (!title || !description || !image || !category || !price || !affiliateLink || !buttonText) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    const Category = (await import('@/lib/models/Category')).default;
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return NextResponse.json(
        { success: false, message: 'Invalid category' },
        { status: 400 }
      );
    }

    const product = new Product({
      title,
      description,
      image,
      category,
      price: parseFloat(price),
      rating: rating ? parseFloat(rating) : 0,
      affiliateLink,
      buttonText,
      tags: tags || []
    });

    await product.save();
    await product.populate('category', 'name slug');

    return NextResponse.json(
      { success: true, product, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

