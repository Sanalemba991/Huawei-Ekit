'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';

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

interface NavbarCategoryData {
    navbarCategory: NavbarCategory;
    categories: Category[];
}

interface NavbarCategoryClientProps {
    data: NavbarCategoryData;
}

const NavbarCategoryClient: React.FC<NavbarCategoryClientProps> = ({ data }) => {
    const { navbarCategory, categories } = data;

    // Animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

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
                            src="/banner/first.jpg"
                            alt="Products Banner"
                            fill
                            className="object-cover"
                            priority
                            quality={90}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/85 to-red-900/90"></div>
                          <div className="absolute inset-0 opacity-10" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      
                          }}></div>
                        </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <motion.nav
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="mb-4"
                        >
                            <div className="flex items-center space-x-2 text-sm text-gray-300">
                                <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
                                <span>→</span>
                                <Link href="/products" className="hover:text-white transition-colors duration-200">Products</Link>
                                <span>→</span>
                                <Link href={`/products/${navbarCategory.slug}`} className="hover:text-white transition-colors duration-200">
                                    {navbarCategory.name}
                                </Link>

                            </div>
                        </motion.nav>
                        <div className="inline-flex items-center px-4 py-2 bg-red-600/20 backdrop-blur-sm border border-red-400/30 rounded-full mb-6">
                            <span className="text-red-300 text-sm font-semibold tracking-wide">
                                {navbarCategory.name.toUpperCase()}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight">
                            Explore Our
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                                {navbarCategory.name}
                            </span>
                        </h1>
                        {navbarCategory.description && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-8"
                            >
                                {navbarCategory.description}
                            </motion.p>
                        )}
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-10">
                    <svg className="w-full h-12 md:h-16 text-white" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M0 48h1440V0C1440 0 1200 48 720 48S0 0 0 0v48z" fill="currentColor" />
                    </svg>
                </div>
            </motion.div>

            {/* Categories Grid Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                        Categories in <span className="text-red-600">{navbarCategory.name}</span>
                    </h2>
                    <p className="text-gray-600">
                        Discover our comprehensive range of solutions tailored to meet your needs
                    </p>
                </motion.div>

                {categories.length > 0 ? (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {categories.map((category) => (
                            <motion.div
                                key={category._id}
                                variants={itemVariants}
                                className="group"
                            >
                                <div className="bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
                                    {/* Image Container */}
                                    <motion.div
                                        className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {category.image ? (
                                            <motion.div
                                                variants={imageVariants}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true }}
                                                className="relative w-full h-full flex items-center justify-center"
                                            >
                                                <Image
                                                    src={category.image}
                                                    alt={category.name}
                                                    fill
                                                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                                className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-inner group-hover:from-red-600 group-hover:to-red-700 transition-all duration-300"
                                            >
                                                {category.name.charAt(0).toUpperCase()}
                                            </motion.div>
                                        )}

                                        {/* Status Badge */}

                                    </motion.div>

                                    {/* Content Container */}
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h3 className="text-base font-semibold text-gray-900 group-hover:text-red-600 transition-colors mb-2 line-clamp-2 leading-tight">
                                            {category.name}
                                        </h3>

                                        {category.description && (
                                            <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-3 flex-1">
                                                {category.description}
                                            </p>
                                        )}

                                        {/* Action Button */}
                                        <div className="flex justify-center">
                                            <Link
                                                href={`/products/${navbarCategory.slug}/${category.slug}`}
                                                className="mt-auto"
                                            >
                                                <motion.div
                                                    className="inline-flex items-center text-red-600 font-medium text-xs group-hover:gap-1 transition-all duration-300"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span>View Sub Categories</span>
                                                    <svg
                                                        className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </motion.div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Available</h3>
                            <p className="text-gray-600 mb-6">There are currently no categories available in this section.</p>
                            <Link
                                href="/products"
                                className="inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Products
                            </Link>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Bottom CTA Section */}

        </div>
    );
};

export default NavbarCategoryClient;