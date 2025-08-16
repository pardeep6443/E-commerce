'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Heart, Star, Truck, Shield, RotateCcw, Sparkles } from 'lucide-react';
import { Product } from '@/lib/products';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem({
      id: `${product.id}-${selectedColor.name}-${selectedSize}`,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: selectedColor.image,
      color: selectedColor.name,
      size: selectedSize,
    });

    // Confetti effect
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Simulate confetti
      setTimeout(() => {}, Math.random() * 100);
    }, 250);
  };

  const handleToggleWishlist = () => {
    const wishlistItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
    };

    if (isInWishlist(product.id)) {
      // removeFromWishlist would be called here
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <Image
                  src={product.images[selectedImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-brand-accent text-white">NEW</Badge>
              )}
              {product.isOnSale && (
                <Badge className="bg-destructive text-white">SALE</Badge>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={cn(
                    "relative flex-none w-20 h-24 rounded-lg overflow-hidden border-2 transition-colors",
                    selectedImageIndex === index 
                      ? "border-foreground" 
                      : "border-border hover:border-foreground/50"
                  )}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl lg:text-4xl font-grotesk font-black mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground capitalize">
                  {product.category}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-grotesk font-black">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge className="bg-destructive text-white">
                    Save ${product.originalPrice - product.price}
                  </Badge>
                )}
              </div>
            </div>
          </motion.div>

          <Separator />

          {/* Product Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Color Selection */}
            <div>
              <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-3">
                Color: {selectedColor.name}
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedImageIndex(0);
                    }}
                    className={cn(
                      "relative w-10 h-10 rounded-full border-2 transition-all",
                      selectedColor.name === color.name
                        ? "border-foreground scale-110"
                        : "border-muted hover:border-foreground"
                    )}
                    style={{ backgroundColor: color.value }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="sr-only">{color.name}</span>
                    {selectedColor.name === color.name && (
                      <div className="absolute inset-0 rounded-full border-2 border-background" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-3">
                Size
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-lg border transition-all",
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-foreground"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>
          </motion.div>

          <Separator />

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                onClick={handleAddToCart}
                className="sm:col-span-2 bg-brand-accent hover:bg-brand-accent/90 text-white font-medium py-6 text-lg group"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                Add to Cart
              </Button>
              
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className={cn(
                  "font-medium py-6",
                  isInWishlist(product.id) 
                    ? "bg-brand-accent text-white border-brand-accent hover:bg-brand-accent/90" 
                    : ""
                )}
                size="lg"
              >
                <Heart 
                  className={cn(
                    "w-5 h-5",
                    isInWishlist(product.id) && "fill-current"
                  )}
                />
                <span className="sr-only">Add to Wishlist</span>
              </Button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-green-600 font-medium">In Stock</span>
              <span className="text-muted-foreground">• Ships within 1-2 business days</span>
            </div>
          </motion.div>

          <Separator />

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Truck className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="font-medium text-sm">Free Shipping</div>
                <div className="text-xs text-muted-foreground">Orders over $100</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <RotateCcw className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="font-medium text-sm">Easy Returns</div>
                <div className="text-xs text-muted-foreground">30-day window</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-4 rounded-lg bg-muted/50">
              <Shield className="w-5 h-5 text-brand-accent" />
              <div>
                <div className="font-medium text-sm">Quality Guarantee</div>
                <div className="text-xs text-muted-foreground">Premium materials</div>
              </div>
            </div>
          </motion.div>

          {/* Product Details Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger className="font-grotesk font-bold">
                  Description
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="sizing">
                <AccordionTrigger className="font-grotesk font-bold">
                  Size & Fit
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>Model is 6'0" and wearing size M</p>
                    <p>Regular fit</p>
                    <p>True to size</p>
                    <Button variant="link" className="p-0 h-auto text-brand-accent">
                      View size guide
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="care">
                <AccordionTrigger className="font-grotesk font-bold">
                  Care Instructions
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-1 text-muted-foreground">
                    <p>Machine wash cold</p>
                    <p>Tumble dry low</p>
                    <p>Do not bleach</p>
                    <p>Iron on medium heat</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger className="font-grotesk font-bold">
                  Shipping & Returns
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Shipping:</strong> Free on orders over $100. Standard delivery 3-5 business days.</p>
                    <p><strong>Returns:</strong> 30-day return window. Items must be unworn with tags attached.</p>
                    <Button variant="link" className="p-0 h-auto text-brand-accent">
                      Full return policy
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </div>
  );
}