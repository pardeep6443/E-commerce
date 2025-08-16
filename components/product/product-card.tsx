'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart with default selections
    addItem({
      id: `${product.id}-${product.colors[0].name}-${product.sizes[0]}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      color: product.colors[0].name,
      size: product.sizes[0],
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
    };

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  return (
    <motion.div
      className={cn("group cursor-pointer", className)}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`}>
        <div className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm group-hover:shadow-xl transition-shadow duration-300">
          {/* Image Section */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={product.images[currentImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-brand-accent text-white text-xs font-medium">
                  NEW
                </Badge>
              )}
              {product.isOnSale && (
                <Badge className="bg-destructive text-white text-xs font-medium">
                  SALE
                </Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <motion.button
              onClick={handleToggleWishlist}
              className={cn(
                "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200",
                isInWishlist(product.id)
                  ? "bg-brand-accent text-white"
                  : "bg-white/90 text-foreground hover:bg-brand-accent hover:text-white"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart 
                className={cn(
                  "w-4 h-4",
                  isInWishlist(product.id) && "fill-current"
                )}
              />
            </motion.button>

            {/* Quick Actions - Show on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0, 
                y: isHovered ? 0 : 20 
              }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-3 left-3 right-3 flex gap-2"
            >
              <Button
                onClick={handleQuickAdd}
                className="flex-1 bg-brand-accent hover:bg-brand-accent/90 text-white text-sm font-medium"
                size="sm"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Quick Add
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="px-3"
              >
                <Eye className="w-4 h-4" />
                <span className="sr-only">Quick View</span>
              </Button>
            </motion.div>

            {/* Color Swatches */}
            {product.colors.length > 1 && (
              <div className="absolute bottom-3 left-3 flex gap-1">
                {product.colors.slice(0, 3).map((color, index) => (
                  <motion.button
                    key={color.name}
                    className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: color.value }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCurrentImageIndex(index)}
                    onMouseLeave={() => setCurrentImageIndex(0)}
                  />
                ))}
                {product.colors.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-muted border-2 border-white shadow-sm flex items-center justify-center text-xs font-medium">
                    +{product.colors.length - 3}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-grotesk font-bold text-lg leading-tight mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3",
                      i < Math.floor(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Sizes */}
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 4).map((size) => (
                <span
                  key={size}
                  className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 4 && (
                <span className="px-2 py-1 text-xs bg-muted rounded-md text-muted-foreground">
                  +{product.sizes.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}