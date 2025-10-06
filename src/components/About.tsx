"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SS801111 from "../../public/About/Proc1.jpg";
import S2201222 from "../../public/About/S220-2.png"
import AP661333 from "../../public/About/AP661-3.png"
import AP371444 from "../../public/About/AP371-4.png"
import S3801555 from "../../public/About/S380-5.png"
import S3101666 from "../../public/About/S310-6.png"
import S1101777 from "../../public/About/S110-7.png"
import A9160888 from "../../public/About/AP160-8.png"
import S3809999 from "../../public/About/S380-9.png"
import S2200000 from "../../public/About/S220-10.png"
import AP263011 from "../../public/About/AP263-11.png"
import USG6000E022 from "../../public/About/USG6000E-12.png"
import S2200111113 from "../../public/About/S220-13.png"
import S1100111114 from "../../public/About/S110-14.png"
import AP76111115 from "../../public/About/AP761-15.png"
import AR30311116 from "../../public/About/AR303-16.png"
import S380111117 from "../../public/About/S380-17.png"
import S220011118 from "../../public/About/S220-18.png"
import AP36191119 from "../../public/About/AP361-19.png"
import Banner from "../../public/About/banner.png"

const fadeInUp : Variants= {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const staggerContainer : Variants=  {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.3
        }
    }
};

const fadeInLeft : Variants=  {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

const fadeInRight: Variants=  {
    hidden: { opacity: 0, x: 60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" }
    }
};

// Animated component wrapper
const AnimatedSection = ({ children, variants = fadeInUp, className = "" }: { children: React.ReactNode, variants?: Variants, className?: string }) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// Product data with imported images
const products = [
    {
        id: 1,
        name: "S380-S8T2T",
        thumbnail: SS801111,
        introduction: "Huawei S380-S8T2T eKitEngine Multi-Service Gateway",
    },
    {
        id: 2,
        name: "S220-48T4X",
        thumbnail: S2201222,
        introduction: "Huawei SS20-48T4X eKitEngine Network Switch",
    },
    {
        id: 3,
        name: "AP661",
        thumbnail: AP661333,
        introduction: "Huawei eKitEngine AP661 Wi-Fi 6 Access Point",
    },
    {
        id: 4,
        name: "AP371",
        thumbnail: AP371444,
        introduction: "Huawei AP371 eKit Access Point",
    },
    {
        id: 5,
        name: "S380-L4T1T",
        thumbnail: S3801555,
        introduction: "Huawei eKitEngine S380-L4T1T Multi-Service Gateway",
    },
    {
        id: 6,
        name: "S310-48T4X",
        thumbnail: S3101666,
        introduction: "Huawei S310-48T4X eKitEngine Network Switch",
    },
    {
        id: 7,
        name: "S110-24T2SR",
        thumbnail: S1101777,
        introduction: "Huawei S110-24T2SR eKitEngine Network Switch",
    },
    {
        id: 8,
        name: "AP160",
        thumbnail: A9160888,
        introduction: "Huawei AP160 eKit Access Point",
    },
    {
        id: 9,
        name: "S380-L4P1T",
        thumbnail: S3809999,
        introduction: "Huawei eKitEngine S380-L4P1T Multi-Service Gateway",
    },
    {
        id: 10,
        name: "S220-48T4S",
        thumbnail: S2200000,
        introduction: "Huawei S220-48T4S eKitEngine Network Switch",
    },
    {
        id: 11,
        name: "AP263",
        thumbnail: AP263011,
        introduction: "Huawei AP263 Wi-Fi In-wall eKit Access Point",
    },
    {
        id: 12,
        name: "USG6000E-S03",
        thumbnail: USG6000E022,
        introduction: "Huawei USG6000E-S03 eKit Next-Generation Firewall Switch",
    },
    {
        id: 13,
        name: "S220-8T4S",
        thumbnail: S2200111113,
        introduction: "Huawei S220-8T4S eKitEngine Network Switch",
    },
    {
        id: 14,
        name: "S110-16T2S",
        thumbnail: S1100111114,
        introduction: "Huawei S110-16T2S eKitEngine Network Switch",
    },
    {
        id: 15,
        name: "AP761",
        thumbnail: AP76111115,
        introduction: "Huawei AP761 eKit Engine Access Point",
    },
    {
        id: 16,
        name: "AR303",
        thumbnail: AR30311116,
        introduction: "Huawei AR303 eKitEngine Enterprise Router",
    },
    {
        id: 17,
        name: "S380-H8T3ST",
        thumbnail: S380111117,
        introduction: "Huawei S380-H8T3ST eKitEngine Multi-Service Gateway",
    },
    {
        id: 18,
        name: "S220-48P4S",
        thumbnail: S220011118,
        introduction: "Huawei S220-48P4S eKitEngine Network Switch",
    },
    {
        id: 19,
        name: "AP361",
        thumbnail: AP36191119,
        introduction: "Huawei AP361 eKit Access Point",
    }
];

const About = () => {
    const [expandedProduct, setExpandedProduct] = React.useState<number | null>(null);
    const productsSectionRef = React.useRef<HTMLDivElement>(null);

    const toggleExpand = (productId: number) => {
        setExpandedProduct(expandedProduct === productId ? null : productId);
    };

    const scrollToProducts = () => {
        if (productsSectionRef.current) {
            productsSectionRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* Hero Section - Reduced Height */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden ">
                {/* Background Image - Replace with your image */}
                <div className="absolute inset-0 bg-cover bg-center bg-fixed">
                   <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url("/About/banner.png")`,
            filter: 'brightness(0.8)'
          }}
        />
                    {/* Optional overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>

                {/* Content */}
                <AnimatedSection variants={staggerContainer} className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
                    {/* Main Heading */}
                    <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                       About Huawei <span className='text-red-600'>eKit</span> UAE
                    </motion.h1>

                    {/* Mission Statement */}
                    <motion.p variants={fadeInUp} className="text-base md:text-lg lg:text-xl mb-8 leading-relaxed max-w-3xl mx-auto">
                        Our vision and mission is to bring digital to every person, home and
                        organization for a fully connected, intelligent world.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        onClick={scrollToProducts}
                        variants={fadeInUp}
                      
                        className="border-2 border-red-600 text-white/80 px-8 py-3 text-base font-medium hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
 >
                        View Our Products
                    </motion.button>
                </AnimatedSection>
            </section>

            {/* Who is Huawei Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Title */}
                        <AnimatedSection variants={fadeInLeft}>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Huawei <span className='text-red-600'>eKit</span> Distributor in UAE
                            </h2>
                            <div className="w-16 h-1 bg-red-600 mb-6"></div>
                        </AnimatedSection>

                        {/* Right Column - Content */}
                        <AnimatedSection variants={fadeInRight} className="text-gray-700 leading-relaxed">
                            <p className="text-lg mb-6">
                                We are an authorized Huawei eKit distributor in the UAE, providing a complete range of genuine Huawei products, ICT infrastructure, and smart device solutions. Our authorization ensures customers receive only original products backed by Huawei's trusted warranty and support. As an official partner, we deliver reliable services, seamless supply, and tailored solutions to meet the growing digital needs of businesses and individuals across the UAE.
                            </p>
                            <p className="text-lg font-semibold">
                                Huawei eKit UAE professional dealer in UAE
                            </p>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Why Choose Huawei eKit UAE Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <AnimatedSection className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Why Choose Huawei <span className='text-red-600'>eKit</span> UAE?
                        </h2>
                        <div className="w-16 h-1 bg-red-600 mx-auto mb-6"></div>
                    </AnimatedSection>

                    <AnimatedSection variants={fadeInUp} className="text-gray-700 leading-relaxed mb-12">
                        <p className="text-lg mb-6">
                            Huawei eKit UAE is the authorized distributor of Huawei eKit products in UAE. We can provide attractive prices for Huawei eKit products with support services across Gulf countries. We are the largest stock-holding distributor of Huawei eKit products. We provide a range of Huawei eKit products and can deliver the products within 24 hours in UAE and the shipment could be done in 4-8 days throughout the GCC Countries (Saudi Arabia, Bahrain, Qatar). Huawei eKit UAE provides a variety of high-end wireless networking products that utilize innovative and ground-breaking wireless technology.
                        </p>
                    </AnimatedSection>

                    {/* Use Cases Grid */}
                    <AnimatedSection variants={staggerContainer}>
                        {/* SME Offices */}
                        <motion.div variants={fadeInUp} className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">SME Offices</h3>
                            <p className="text-gray-700">
                                Seamless connectivity and constant communication are essential for boosting workplace productivity. HUAWEI eKit SME network solution ensures uninterrupted Wi-Fi 6 coverage, effortless deployment, smart remote management, empowering efficient operations.
                            </p>
                        </motion.div>

                        {/* Budget Hotels and Restaurants */}
                        <motion.div variants={fadeInUp} className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Budget Hotels and Restaurants</h3>
                            <p className="text-gray-700">
                                Hotel guests prioritize a super-fast, secure and stable wireless network. HUAWEI eKit network solution offers superior Wi-Fi 6 connectivity, catering to diverse hotel operations. Also, it simplifies O&M by reconfiguration and one-key optimization.
                            </p>
                        </motion.div>

                        {/* Primary and Secondary Education */}
                        <motion.div variants={fadeInUp} className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Primary and Secondary Education</h3>
                            <p className="text-gray-700">
                                Fast, stable wireless networks are essential for interactive, immersive education. HUAWEI eKit SME network enables seamless learning with high-density access and robust privacy protection.
                            </p>
                        </motion.div>

                        {/* Commercial Stores */}
                        <motion.div variants={fadeInUp} className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Commercial Stores</h3>
                            <p className="text-gray-700">
                                Boosting transaction efficiency through digitalization is at the core of modern retail transformation. HUAWEI eKit network ensures stable, reliable wired and wireless connections, e-transaction transceivers, and comprehensive retail solutions.
                            </p>
                        </motion.div>
                    </AnimatedSection>

                    {/* Product Configuration Table */}
                    <div ref={productsSectionRef}>
                        <AnimatedSection variants={fadeInUp} className="mt-16">
                            <h2 className="text-4xl font-bold text-black text-center mb-12">Products in Huawei <span className='text-red-600'>eKit</span> UAE</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 cursor-pointer">
                                {products.map((product) => (
                                    <motion.div
                                        key={product.id}
                                        className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
                                        whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="relative h-40 w-full mb-4">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-sm font-semibold text-gray-900 leading-tight">
                                                {product.name}
                                            </h3>
                                            <p className="text-xs text-gray-600 mt-2">
                                                {product.introduction}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;