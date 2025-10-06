'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronDownIcon, MagnifyingGlassIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

interface NavbarCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  order: number;
  isActive: boolean;
}

interface NavigationItem {
  title: string;
  href: string;
  dropdownContent?: {
    sections: {
      title: string;
      items: Array<{
        title: string;
        href: string;
      }>;
    }[];
    links?: {
      name: string;
      href: string;
      external?: boolean;
    }[];
  } | null;
}

const Navbar = () => {
  const pathname = usePathname();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeTopDropdown, setActiveTopDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [topHoverTimeout, setTopHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Helper function to determine if a nav item is active
  const isNavItemActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  // Static fallback navigation items
  const defaultNavigationItems: NavigationItem[] = [
    {
      title: 'Home',
      href: '/',
      dropdownContent: null
    },
    {
      title: 'About Us',
      href: '/about',
      dropdownContent: null
    },
    {
      title: 'Products',
      href: '/products',
      dropdownContent: {
        sections: [
          {
            title: 'Product Categories',
            items: []
          }
        ],
        links: [{ name: 'All Products', href: '/products', external: true }]
      }
    },
    {
      title: 'Contact Us',
      href: '/contact',
      dropdownContent: null
    },
     
  ];

  // Fetch navbar categories from API
  const fetchNavbarCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/navbar-categories');
      const data = await response.json();
      
      console.log('Navbar API response:', data);
      console.log('Categories received:', data.data);
      
      if (data.success && data.data && data.data.length > 0) {
        setNavbarCategories(data.data);
        
        // Log each category's status
        data.data.forEach((cat: NavbarCategory) => {
          console.log(`Category: ${cat.name}, Active: ${cat.isActive}, Slug: ${cat.slug}`);
        });
        
        // Sort categories by order
        const sortedCategories = [...data.data].sort((a, b) => a.order - b.order);
        
        // Create dynamic product items from categories
        const dynamicProductItems = sortedCategories.map((category: NavbarCategory) => ({
          title: category.name,
          href: `/${category.slug}`
        }));
        
        // Create the Products dropdown with dynamic categories
        const productsDropdown: NavigationItem = {
          title: 'Products',
          href: '/products',
          dropdownContent: {
            sections: [
              {
                title: 'Product Categories',
                items: dynamicProductItems
              }
            ],
            links: [{ name: 'All Products', href: '/products', external: true }]
          }
        };
        
        // Create navigation items: Home + Products (with dynamic dropdown) + Contact Us only
        const navigationItems: NavigationItem[] = [
          {
            title: 'Home',
            href: '/',
            dropdownContent: null
          },
          {
            title: 'About Us',
            href: '/about',
            dropdownContent: null
          },
          productsDropdown,
          {
            title: 'Contact Us',
            href: '/contact',
            dropdownContent: null
          },
          
        ];

        setNavigationItems(navigationItems);
      } else {
        // No categories found, show basic navigation: Home + Products (empty) + Contact Us
        setNavigationItems([
          {
            title: 'Home',
            href: '/',
            dropdownContent: null
          },
           {
            title: 'About Us',
            href: '/about',
            dropdownContent: null
          },
          {
            title: 'Products',
            href: '/products',
            dropdownContent: {
              sections: [
                {
                  title: 'Product Categories',
                  items: []
                }
              ],
              links: [{ name: 'All Products', href: '/products', external: true }]
            }
          },
          {
            title: 'Contact Us',
            href: '/contact',
            dropdownContent: null
          },
         
        ]);
      }
    } catch (error) {
      console.error('Error fetching navbar categories:', error);
      // Show basic navigation on error: Home + Products (empty) + Contact Us
      setNavigationItems([
        {
          title: 'Home',
          href: '/',
          dropdownContent: null
        },{
          title: 'About Us',
          href: '/about',
          dropdownContent: null
        },
        {
          title: 'Products',
          href: '/products',
          dropdownContent: {
            sections: [
              {
                title: 'Product Categories',
                items: []
              }
            ],
            links: [{ name: 'All Products', href: '/products', external: true }]
          }
        },
        {
          title: 'Contact Us',
          href: '/contact',
          dropdownContent: null
        },
        
      ]);
    }
  }, []);

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories on mount
  useEffect(() => {
    if (mounted) {
      fetchNavbarCategories();
    }
  }, [mounted, fetchNavbarCategories]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);
    };

    // Set initial scroll state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((activeDropdown || activeTopDropdown) && !(event.target as Element).closest('.dropdown-container')) {
        setActiveDropdown(null);
        setActiveTopDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown, activeTopDropdown]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      if (topHoverTimeout) {
        clearTimeout(topHoverTimeout);
      }
    };
  }, [hoverTimeout, topHoverTimeout]);

  const handleDropdownToggle = (title: string) => {
    if (isMobileMenuOpen) {
      // Mobile behavior - toggle on click
      setActiveDropdown(activeDropdown === title ? null : title);
    } else {
      // Desktop behavior - show immediately
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActiveDropdown(title);
      setActiveTopDropdown(null);
    }
  };

  const handleDropdownMouseEnter = (title: string) => {
    if (!isMobileMenuOpen) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        setHoverTimeout(null);
      }
      setActiveDropdown(title);
      setActiveTopDropdown(null);
      setHoveredItem(title);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobileMenuOpen) {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
      }
      const timeout = setTimeout(() => {
        setActiveDropdown(null);
        setHoveredItem(null);
      }, 500); // 0.5 second delay
      setHoverTimeout(timeout);
    }
  };

  const handleNavItemMouseEnter = (title: string) => {
    setHoveredItem(title);
  };

  const handleNavItemMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleNavItemClick = () => {
    setActiveDropdown(null);
    setActiveTopDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleTopDropdownToggle = (title: string) => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
      setTopHoverTimeout(null);
    }
    setActiveTopDropdown(activeTopDropdown === title ? null : title);
    setActiveDropdown(null);
  };

  const handleTopDropdownMouseEnter = (title: string) => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
      setTopHoverTimeout(null);
    }
    setActiveTopDropdown(title);
    setActiveDropdown(null);
  };

  const handleTopDropdownMouseLeave = () => {
    if (topHoverTimeout) {
      clearTimeout(topHoverTimeout);
    }
    const timeout = setTimeout(() => {
      setActiveTopDropdown(null);
    }, 2000); // 2 second delay
    setTopHoverTimeout(timeout);
  };

  const handleLogoClick = () => {
    setActiveDropdown(null);
    setActiveTopDropdown(null);
  };

  const handleDropdownLinkClick = () => {
    setActiveDropdown(null);
    setActiveTopDropdown(null);
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={`w-full bg-white shadow-sm border-b border-gray-200 transition-all duration-300 ${
          isScrolled ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" onClick={handleLogoClick}>
                <Image
                  src="/huaweilogo-new.png"
                  alt="Huawei"
                  width={120}
                  height={40}
                  priority
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.title} className="relative dropdown-container">
                  {item.dropdownContent ? (
                    <button
                      onClick={() => handleDropdownToggle(item.title)}
                      onMouseEnter={() => handleDropdownMouseEnter(item.title)}
                      onMouseLeave={handleDropdownMouseLeave}
                      className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                        isNavItemActive(item.href) || activeDropdown === item.title || hoveredItem === item.title
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon className="w-4 h-4" />
                      {/* Active/Hover Underline */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-all duration-200 ${
                          isNavItemActive(item.href) || activeDropdown === item.title || hoveredItem === item.title
                            ? 'opacity-100 scale-x-100'
                            : 'opacity-0 scale-x-0'
                        }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={handleNavItemClick}
                      onMouseEnter={() => handleNavItemMouseEnter(item.title)}
                      onMouseLeave={handleNavItemMouseLeave}
                      className={`navbar-item flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 relative ${
                        isNavItemActive(item.href) || hoveredItem === item.title
                          ? 'text-red-600'
                          : 'text-gray-700 hover:text-red-600'
                      }`}
                    >
                      <span>{item.title}</span>
                      {/* Active/Hover Underline */}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transition-all duration-200 ${
                          isNavItemActive(item.href) || hoveredItem === item.title
                            ? 'opacity-100 scale-x-100'
                            : 'opacity-0 scale-x-0'
                        }`}
                      />
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {activeDropdown === item.title && item.dropdownContent && (
                    <div
                      className="dropdown-menu fixed left-0 w-full bg-white shadow-xl z-50 border-t border-gray-200"
                      style={{ top: '64px' }}
                      onMouseEnter={() => handleDropdownMouseEnter(item.title)}
                      onMouseLeave={handleDropdownMouseLeave}
                    >
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {item.dropdownContent.sections.map((section, index) => (
                            <div key={index} className="space-y-4">
                              <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                              <ul className="space-y-2">
                                {section.items.map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link
                                      href={subItem.href}
                                      onClick={handleDropdownLinkClick}
                                      className="text-sm text-gray-600 hover:text-red-600 transition-colors duration-200"
                                    >
                                      {subItem.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {item.dropdownContent.links && (
                          <div className="mt-8 pt-6 border-t border-gray-200">
                            <div className="flex flex-wrap gap-6">
                              {item.dropdownContent.links.map((link, linkIndex) => (
                                <Link
                                  key={linkIndex}
                                  href={link.href}
                                  onClick={handleDropdownLinkClick}
                                  className="inline-flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors duration-200 group"
                                >
                                  {link.name}
                                  {link.external && (
                                    <svg
                                      className="w-3 h-3 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setActiveDropdown(null);
              }}
              className="lg:hidden p-2 text-gray-600 hover:text-red-600"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-4 py-2 space-y-1">
                {navigationItems.map((item) => (
                  <div key={item.title} className="border-b border-gray-100 last:border-b-0">
                    {item.dropdownContent ? (
                      <>
                        <button
                          onClick={() => handleDropdownToggle(item.title)}
                          className={`w-full flex items-center justify-between py-3 text-sm font-medium transition-colors duration-200 ${
                            isNavItemActive(item.href) ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                          }`}
                        >
                          <span>{item.title}</span>
                          <ChevronDownIcon
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.title ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {activeDropdown === item.title && (
                          <div className="ml-4 pb-3 space-y-2">
                            {item.dropdownContent.sections.map((section, index) => (
                              <div key={index} className="space-y-2">
                                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wider pt-2">
                                  {section.title}
                                </p>
                                {section.items.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    onClick={handleDropdownLinkClick}
                                    className="block text-sm text-gray-600 hover:text-red-600 py-1"
                                  >
                                    {subItem.title}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleNavItemClick}
                        className={`block py-3 text-sm font-medium transition-colors duration-200 ${
                          isNavItemActive(item.href) ? 'text-red-600' : 'text-gray-700 hover:text-red-600'
                        }`}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
      {/* Spacer for fixed header */}
      {isScrolled && <div className="h-16" />}
    </>
  );
};

export default Navbar;