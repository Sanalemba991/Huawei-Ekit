import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import SubCategory from '@/app/models/SubCategory';
import Product from '@/app/models/Product';
import SubCategoryProductsClient from './SubCategoryProductsClient';

interface PageProps {
  params: { 
    slug: string;           // navbar category slug
    categorySlug: string;   // category slug
    subCategorySlug: string; // subcategory slug
  };
}

async function getSubCategoryWithProducts(navbarSlug: string, categorySlug: string, subCategorySlug: string) {
  try {
    await connectDB();
    
    const subcategory = await SubCategory.findOne({ 
      slug: subCategorySlug, 
      isActive: true 
    }).populate({
      path: 'category',
      populate: {
        path: 'navbarCategory',
        select: 'name slug'
      }
    });

    // Verify the subcategory belongs to the correct hierarchy
    if (!subcategory || 
        !subcategory.category || 
        (subcategory.category as any).slug !== categorySlug ||
        (subcategory.category as any).navbarCategory.slug !== navbarSlug) {
      return null;
    }

    // Get all products under this subcategory
    const products = await Product.find({ 
      subcategory: subcategory._id, 
      isActive: true 
    })
    .populate('navbarCategory', 'name slug')
    .populate('category', 'name slug')
    .populate('subcategory', 'name slug')
    .sort({ createdAt: -1 });

    return {
      subcategory: JSON.parse(JSON.stringify(subcategory)),
      products: JSON.parse(JSON.stringify(products))
    };
  } catch (error) {
    console.error('Error fetching subcategory with products:', error);
    return null;
  }
}

export default async function SubCategoryProductsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getSubCategoryWithProducts(resolvedParams.slug, resolvedParams.categorySlug, resolvedParams.subCategorySlug);

  if (!data) {
    notFound();
  }

  return <SubCategoryProductsClient data={data} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getSubCategoryWithProducts(resolvedParams.slug, resolvedParams.categorySlug, resolvedParams.subCategorySlug);
  
  if (!data) {
    return {
      title: 'SubCategory Not Found'
    };
  }

  const { subcategory } = data;
  const category = subcategory.category as any;
  const navbarCategory = category.navbarCategory;

  return {
    title: `${subcategory.name} Products - ${category.name} - ${navbarCategory.name} - Huawei eKit UAE`,
    description: subcategory.description || `Explore ${subcategory.name} products under ${category.name} in ${navbarCategory.name} at Huawei eKit UAE`,
    keywords: `${subcategory.name}, ${category.name}, ${navbarCategory.name}, Huawei, networking, products, solutions`
  };
}