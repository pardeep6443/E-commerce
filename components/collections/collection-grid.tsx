'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export function CollectionGrid() {
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

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
    >
      {collections.map((collection, index) => (
        <motion.div
          key={collection.id}
          variants={itemVariants}
          className={cn(
            "group cursor-pointer",
            index === 0 ? "md:col-span-2" : ""
          )}
        >
          <Link href={collection.href} className="block">
            <div className={cn(
              "relative rounded-3xl overflow-hidden",
              index === 0 ? "aspect-[2/1]" : "aspect-[4/3]"
            )}>
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <div className="text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className={cn(
                        "font-grotesk font-black mb-2",
                        index === 0 ? "text-3xl lg:text-5xl" : "text-2xl lg:text-3xl"
                      )}>
                        {collection.name}
                      </h2>
                      <p className={cn(
                        "text-white/80",
                        index === 0 ? "text-lg lg:text-xl" : "text-base"
                      )}>
                        {collection.description}
                      </p>
                    </div>
                    
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <ArrowRight className={cn(
                        "text-white",
                        index === 0 ? "w-8 h-8" : "w-6 h-6"
                      )} />
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-white/60",
                      index === 0 ? "text-base" : "text-sm"
                    )}>
                      {collection.productCount} items
                    </span>
                    
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                      Explore Collection
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}