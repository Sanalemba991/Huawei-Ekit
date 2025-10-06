import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import Category from '@/app/models/Category';
import SubCategory from '@/app/models/SubCategory';
import CategorySubCategoriesClient from './CategorySubCategoriesClient';

interface PageProps {
  params: {
    slug: string;        // navbar category slug
    categorySlug: string; // category slug
  };
}

async function getCategoryWithSubCategories(navbarSlug: string, categorySlug: string) {
  try {
    await connectDB();

    const category = await Category.findOne({
      slug: categorySlug,
      isActive: true
    }).populate('navbarCategory', 'name slug description');

    // Verify the category belongs to the correct navbar category
    if (!category || (category.navbarCategory as any)?.slug !== navbarSlug) {
      return null;
    }

    // Get all subcategories under this category
    const subcategories = await SubCategory.find({
      category: category._id,
      isActive: true
    }).sort({ createdAt: -1 });

    return {
      category: JSON.parse(JSON.stringify(category)),
      subcategories: JSON.parse(JSON.stringify(subcategories))
    };
  } catch (error) {
    console.error('Error fetching category with subcategories:', error);
    return null;
  }
}

export default async function CategorySubCategoriesPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getCategoryWithSubCategories(resolvedParams.slug, resolvedParams.categorySlug);

  if (!data) {
    notFound();
  }

  return <CategorySubCategoriesClient data={data} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getCategoryWithSubCategories(resolvedParams.slug, resolvedParams.categorySlug);

  if (!data) {
    return {
      title: 'Category Not Found'
    };
  }

  const { category } = data;
  const navbarCategory = (category.navbarCategory as any);

  return {
    title: `${category.name} Categories - ${navbarCategory.name} - Huawei eKit UAE`,
    description: category.description || `Explore ${category.name} subcategories under ${navbarCategory.name} at Huawei eKit UAE`,
    keywords: `${category.name}, ${navbarCategory.name}, Huawei, networking, categories, solutions`
  };
}