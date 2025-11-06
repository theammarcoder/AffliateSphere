import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Category from '@/lib/models/Category';
import Product from '@/lib/models/Product';
import { protect } from '@/lib/middleware/auth';

const createSlug = (name) => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const category = await Category.findById(params.id);
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Get category error:', error);
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

    const { name } = await request.json();

    if (!name || name.trim() === '') {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      );
    }

    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    const existingCategory = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, 'i') },
      _id: { $ne: params.id }
    });
    
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category name already exists' },
        { status: 400 }
      );
    }

    category.name = name.trim();
    category.slug = createSlug(name.trim());
    await category.save();

    return NextResponse.json({ success: true, category, message: 'Category updated successfully' });
  } catch (error) {
    console.error('Update category error:', error);
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

    const category = await Category.findById(params.id);
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }

    const productsCount = await Product.countDocuments({ category: params.id });
    
    if (productsCount > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Cannot delete category. ${productsCount} product(s) are assigned to this category.` 
        },
        { status: 400 }
      );
    }

    await Category.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}

