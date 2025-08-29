'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  Sun, 
  Moon,
  ChevronDown 
} from 'lucide-react';
import { useCart } from '../../contexts/cart-context';
import { useWishlist } from '../../contexts/wishlist-context';
import { useTheme } from '../../contexts/theme-context';

const categories = [
  { name: 'New', href: '/collections?category=new' },
  { name: 'Tops', href: '/collections?category=tops' },
  { name: 'Bottoms', href: '/collections?category=bottoms' },
  { name: 'Hoodies', href: '/collections?category=hoodies' },
  { name: 'Accessories', href: '/collections?category=accessories' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { theme, toggleTheme } = useTheme();

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                STORE
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {categories.map((category) => (
                  <div
                    key={category.name}
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(category.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <motion.a
                      href={category.href}
                      className="text-gray-900 dark:text-white hover:text-pink-500 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                      whileHover={{ y: -2 }}
                    >
                      {category.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </motion.a>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <motion.button
                className="p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="h-5 w-5" />
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className="p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </motion.button>

              {/* Account */}
              <motion.button
                className="p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <User className="h-5 w-5" />
              </motion.button>

              {/* Wishlist */}
              <motion.button
                className="p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {wishlistItems.length}
                  </motion.span>
                )}
              </motion.button>

              {/* Cart */}
              <motion.button
                className="p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200 relative"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {cartItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                className="md:hidden p-2 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-xl"
              variants={mobileMenuVariants}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-gray-900 dark:text-white hover:text-pink-500"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {categories.map((category, index) => (
                    <motion.a
                      key={category.name}
                      href={category.href}
                      className="block py-3 px-4 text-lg font-medium text-gray-900 dark:text-white hover:text-pink-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsOpen(false)}
                    >
                      {category.name}
                    </motion.a>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-4">
                    <button className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200">
                      <User className="h-5 w-5" />
                      <span>Account</span>
                    </button>
                    <button className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200">
                      <Heart className="h-5 w-5" />
                      <span>Wishlist ({wishlistItems.length})</span>
                    </button>
                    <button 
                      onClick={toggleTheme}
                      className="flex items-center space-x-3 text-gray-900 dark:text-white hover:text-pink-500 transition-colors duration-200"
                    >
                      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                      <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}