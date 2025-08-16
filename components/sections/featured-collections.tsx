'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { collections } from '@/lib/products';
import { ArrowRight } from 'lucide-react';

export function FeaturedCollections() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-grotesk font-black mb-4">
            Featured Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Curated collections that define modern streetwear culture
          </p>
        </motion.div>

        {/* Desktop Marquee */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex space-x-8"
            animate={{ x: [0, -50 * collections.length] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }}
          >
            {[...collections, ...collections].map((collection, index) => (
              <motion.div
                key={`${collection.id}-${index}`}
                className="flex-none w-80 group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={collection.href} className="block">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Overlay Content */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between text-white">
                        <div>
                          <h3 className="text-xl font-grotesk font-bold mb-1">
                            {collection.name}
                          </h3>
                          <p className="text-sm text-white/80">
                            {collection.productCount} items
                          </p>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <h4 className="font-grotesk font-bold text-lg mb-2">
                      {collection.name}
                    </h4>
                    <p className="text-muted-foreground">
                      {collection.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <Link href={collection.href} className="block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <h3 className="text-lg font-grotesk font-bold mb-1">
                          {collection.name}
                        </h3>
                        <p className="text-sm text-white/80">
                          {collection.productCount} items
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <h4 className="font-grotesk font-bold text-base mb-1">
                    {collection.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {collection.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}