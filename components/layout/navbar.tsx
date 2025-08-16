'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { categories } from '@/lib/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { itemCount, toggleCart } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-grotesk font-black text-xl lg:text-2xl text-foreground"
            >
              BOLD THREADS
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={category.href}
                  className="text-sm font-medium text-foreground hover:text-brand-accent transition-colors duration-200"
                >
                  {category.name}
                </Link>
                
                <AnimatePresence>
                  {activeDropdown === category.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg p-4"
                    >
                      <div className="space-y-2">
                        <Link
                          href={`${category.href}/featured`}
                          className="block text-sm text-foreground hover:text-brand-accent transition-colors"
                        >
                          Featured
                        </Link>
                        <Link
                          href={`${category.href}/new`}
                          className="block text-sm text-foreground hover:text-brand-accent transition-colors"
                        >
                          New Arrivals
                        </Link>
                        <Link
                          href={`${category.href}/sale`}
                          className="block text-sm text-foreground hover:text-brand-accent transition-colors"
                        >
                          Sale
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search */}
            <Button variant="ghost" size="icon" className="relative">
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Account */}
            <Button variant="ghost" size="icon" className="relative hidden sm:flex">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brand-accent text-white">
                  {wishlistCount}
                </Badge>
              )}
              <span className="sr-only">Wishlist</span>
            </Button>

            {/* Cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative" 
              onClick={toggleCart}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-brand-accent text-white text-xs flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.div>
              )}
              <span className="sr-only">Cart</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="font-grotesk font-black text-lg">BOLD THREADS</span>
                </div>
                
                <div className="py-6 space-y-4">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-lg font-medium text-foreground hover:text-brand-accent transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <Link
                    href="/account"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 text-foreground hover:text-brand-accent transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}