import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/app/models/Product';
import { checkAdminAuth } from '@/lib/auth';
import { createSecureResponse, createSecureErrorResponse } from '@/lib/securityHeaders';
import mongoose from 'mongoose';

// GET - Fetch single product (admin only)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // 🔒 SECURITY CHECK: Admin authentication required
    const isAdmin = await checkAdminAuth(request);
    if (!isAdmin) {
      return createSecureErrorResponse('Admin authentication required', 401);
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid product ID', 400);
    }

    const product = await Product.findById(id)
      .populate('navbarCategory', 'name slug')
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!product) {
      return createSecureErrorResponse('Product not found', 404);
    }

    return createSecureResponse({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    return createSecureErrorResponse('Failed to fetch product', 500);
  }
}

// PATCH - Update product (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // 🔒 SECURITY CHECK: Admin authentication required
    const isAdmin = await checkAdminAuth(request);
    if (!isAdmin) {
      return createSecureErrorResponse('Admin authentication required', 401);
    }

    const { id } = await params;
    const body = await request.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid product ID', 400);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    )
      .populate('navbarCategory', 'name slug')
      .populate('category', 'name slug')
      .populate('subcategory', 'name slug');

    if (!updatedProduct) {
      return createSecureErrorResponse('Product not found', 404);
    }

    return createSecureResponse({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    console.error('Error updating product:', error);
    return createSecureErrorResponse('Failed to update product', 500);
  }
}

// DELETE - Delete product (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    // 🔒 SECURITY CHECK: Admin authentication required
    const isAdmin = await checkAdminAuth(request);
    if (!isAdmin) {
      return createSecureErrorResponse('Admin authentication required', 401);
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return createSecureErrorResponse('Invalid product ID', 400);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return createSecureErrorResponse('Product not found', 404);
    }

    return createSecureResponse({ 
      success: true, 
      message: 'Product deleted successfully',
      data: { id, name: deletedProduct.name }
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return createSecureErrorResponse('Failed to delete product', 500);
  }
}
