'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface NavbarCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  navbarCategory: NavbarCategory;
  description: string;
  image: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface CategoryGroup {
  navbarCategory: NavbarCategory;
  categories: Category[];
}

const ProductsPage = () => {
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/categories');
        const data = await response.json();
        
        if (data.success && data.data) {
          const groupedCategories = data.data.reduce((groups: { [key: string]: CategoryGroup }, category: Category) => {
            const navbarCategoryId = category.navbarCategory._id;
            
            if (!groups[navbarCategoryId]) {
              groups[navbarCategoryId] = {
                navbarCategory: category.navbarCategory,
                categories: []
              };
            }
            
            groups[navbarCategoryId].categories.push(category);
            return groups;
          }, {});

          const sortedGroups = (Object.values(groupedCategories) as CategoryGroup[]).sort(
            (a: CategoryGroup, b: CategoryGroup) => (a.navbarCategory.order || 0) - (b.navbarCategory.order || 0)
          );

          setCategoryGroups(sortedGroups);
        } else {
          setError('Failed to fetch categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error loading categories');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-block relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-red-600 border-r-transparent border-b-transparent border-l-transparent absolute top-0 left-0"></div>
            </div>
            <p className="mt-6 text-gray-600 font-medium">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/products-banner.jpg"
            alt="Products Banner"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-red-900/90"></div>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full mb-6">
              <span className="text-red-300 text-sm font-semibold tracking-wide">PRODUCT CATALOG</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
              Discover Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                Product Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8">
              Comprehensive networking and technology solutions engineered to elevate your business infrastructure.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0 48h1440V0C1440 0 1200 48 720 48S0 0 0 0v48z" fill="currentColor"/>
          </svg>
        </div>
      </motion.div>

      {/* Product Categories Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16"
        >
          Product <span className='text-red-600'>categories</span>
        </motion.h2>

        {categoryGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {categoryGroups.map((group, groupIndex) =>
              group.categories.map((category, categoryIndex) => {
                const cardIndex = categoryGroups
                  .slice(0, groupIndex)
                  .reduce((sum, g) => sum + g.categories.length, 0) + categoryIndex;
                
                return (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.5, 
                      delay: cardIndex * 0.1 
                    }}
                    className="flex justify-center"
                  >
                    <Link
                      href={`/products/${group.navbarCategory.slug}`}
                      className="block bg-white rounded-2xl border-2 border-gray-200 hover:border-red-500 hover:shadow-2xl transition-all duration-300 overflow-hidden group w-full max-w-sm"
                    >
                      <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-10">
                        {category.image ? (
                          <Image 
                            src={category.image} 
                            alt={category.name}
                            fill
                            className="object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center text-gray-500 font-bold text-4xl shadow-inner">
                            {category.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="p-6 text-center bg-white">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                          {category.name}
                        </h3>
                      </div>
                    </Link>
                  </motion.div>
                );
              })
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">No products available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;