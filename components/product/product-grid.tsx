'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/lib/products';
import { ProductCard } from './product-card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  title?: string;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
}

export function ProductGrid({ 
  products, 
  loading = false, 
  title,
  showLoadMore = false,
  onLoadMore 
}: ProductGridProps) {
  const [itemsToShow, setItemsToShow] = useState(8);

  const displayedProducts = products.slice(0, itemsToShow);

  const handleLoadMore = () => {
    setItemsToShow(prev => prev + 8);
    onLoadMore?.();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        {title && (
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-grotesk font-black">
              {title}
            </h2>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-[4/5] rounded-2xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {title && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-grotesk font-black mb-4">
            {title}
          </h2>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {displayedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>

      {/* Load More Button */}
      {(showLoadMore || itemsToShow < products.length) && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center pt-8"
        >
          <Button
            onClick={handleLoadMore}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-base font-medium"
            disabled={itemsToShow >= products.length}
          >
            {itemsToShow >= products.length ? 'All Products Loaded' : 'Load More Products'}
          </Button>
        </motion.div>
      )}
    </div>
  );
}