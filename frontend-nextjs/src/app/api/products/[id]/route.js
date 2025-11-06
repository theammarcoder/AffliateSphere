import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import { protect } from '@/lib/middleware/auth';

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const product = await Product.findById(params.id).populate('category', 'name slug');
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
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

    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    if (category) {
      const Category = (await import('@/lib/models/Category')).default;
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return NextResponse.json(
          { success: false, message: 'Invalid category' },
          { status: 400 }
        );
      }
    }

    if (title) product.title = title;
    if (description) product.description = description;
    if (image) product.image = image;
    if (category) product.category = category;
    if (price) product.price = parseFloat(price);
    if (rating !== undefined) product.rating = parseFloat(rating);
    if (affiliateLink) product.affiliateLink = affiliateLink;
    if (buttonText) product.buttonText = buttonText;
    if (tags !== undefined) product.tags = tags;

    await product.save();
    await product.populate('category', 'name slug');

    return NextResponse.json({ success: true, product, message: 'Product updated successfully' });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const authResult = await protect();
    if (authResult.error) {
      return NextResponse.json(
        { success: false, message: authResult.message },
        { status: authResult.status }
      );
    }

    const product = await Product.findById(params.id);
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }

    await Product.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

