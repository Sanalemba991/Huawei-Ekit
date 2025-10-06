import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/app/models/Category';
import NavbarCategory from '@/app/models/NavbarCategory';
import { checkAdminAuth } from '@/lib/auth';
import { createSecureResponse, createSecureErrorResponse } from '@/lib/securityHeaders';
import mongoose from 'mongoose';

// GET - Fetch single category (public)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid category ID', 400);
    }

    const category = await Category.findById(id)
      .populate('navbarCategory', 'name slug');

    if (!category) {
      return createSecureErrorResponse('Category not found', 404);
    }

    return createSecureResponse({ 
      success: true, 
      data: category 
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return createSecureErrorResponse('Failed to fetch category', 500);
  }
}

// PATCH - Update category (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return createSecureErrorResponse('Admin authentication required', 401);
    }

    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    const { name, navbarCategory, description, image, isActive } = body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid category ID', 400);
    }

    if (!name || name.trim().length === 0) {
      return createSecureErrorResponse('Category name is required', 400);
    }

    if (!navbarCategory || !mongoose.Types.ObjectId.isValid(navbarCategory)) {
      return createSecureErrorResponse('Valid navbar category is required', 400);
    }

    // Check if navbar category exists
    const navbarCategoryExists = await NavbarCategory.findById(navbarCategory);
    if (!navbarCategoryExists) {
      return createSecureErrorResponse('Navbar category not found', 400);
    }

    const updateData: any = {
      name: name.trim(),
      navbarCategory,
      description: description?.trim() || '',
      isActive: typeof isActive === 'boolean' ? isActive : true,
      updatedAt: new Date()
    };

    if (image && image.trim()) {
      updateData.image = image.trim();
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('navbarCategory', 'name slug');

    if (!updatedCategory) {
      return createSecureErrorResponse('Category not found', 404);
    }

    return createSecureResponse({ 
      success: true, 
      data: updatedCategory,
      message: 'Category updated successfully'
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return createSecureErrorResponse('Failed to update category', 500);
  }
}

// DELETE - Delete category (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin authentication
    const isAuthenticated = await checkAdminAuth(request);
    if (!isAuthenticated) {
      return createSecureErrorResponse('Admin authentication required', 401);
    }

    await connectDB();
    
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid category ID', 400);
    }

    // Check if category exists
    const category = await Category.findById(id);
    if (!category) {
      return createSecureErrorResponse('Category not found', 404);
    }

    // Delete the category
    await Category.findByIdAndDelete(id);

    return createSecureResponse({ 
      success: true, 
      message: 'Category deleted successfully',
      data: { id, name: category.name }
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return createSecureErrorResponse('Failed to delete category', 500);
  }
}