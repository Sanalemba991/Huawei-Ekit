import { notFound } from 'next/navigation';
import connectDB from '@/lib/mongodb';
import NavbarCategory from '@/app/models/NavbarCategory';
import Category from '@/app/models/Category';
import NavbarCategoryClient from './NavbarCategoryClient';

interface PageProps {
  params: { slug: string };
}

async function getNavbarCategoryWithCategories(slug: string) {
  try {
    await connectDB();
    const navbarCategory = await NavbarCategory.findOne({ 
      slug: slug, 
      isActive: true 
    });

    if (!navbarCategory) {
      return null;
    }

    // Get all categories under this navbar category
    const categories = await Category.find({ 
      navbarCategory: navbarCategory._id, 
      isActive: true 
    }).sort({ createdAt: -1 });

    return {
      navbarCategory: JSON.parse(JSON.stringify(navbarCategory)),
      categories: JSON.parse(JSON.stringify(categories))
    };
  } catch (error) {
    console.error('Error fetching navbar category:', error);
    return null;
  }
}

export default async function NavbarCategoryPage({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getNavbarCategoryWithCategories(resolvedParams.slug);

  if (!data) {
    notFound();
  }

  return <NavbarCategoryClient data={data} />;
}

// Generate metadata for the page
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const data = await getNavbarCategoryWithCategories(resolvedParams.slug);
  
  if (!data) {
    return {
      title: 'Page Not Found'
    };
  }

  const { navbarCategory } = data;

  return {
    title: `${navbarCategory.name} - Huawei eKit UAE`,
    description: navbarCategory.description || `Explore ${navbarCategory.name} categories and products at Huawei eKit UAE`
  };
}