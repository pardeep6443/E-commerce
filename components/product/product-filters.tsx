'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface FilterOptions {
  categories: string[];
  sizes: string[];
  colors: { name: string; value: string }[];
  priceRange: [number, number];
}

interface ActiveFilters {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterOptions;
  activeFilters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  productCount: number;
}

export function ProductFilters({ 
  filters, 
  activeFilters, 
  onFiltersChange,
  productCount 
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...activeFilters.categories, category]
      : activeFilters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...activeFilters,
      categories: newCategories
    });
  };

  const handleSizeChange = (size: string, checked: boolean) => {
    const newSizes = checked 
      ? [...activeFilters.sizes, size]
      : activeFilters.sizes.filter(s => s !== size);
    
    onFiltersChange({
      ...activeFilters,
      sizes: newSizes
    });
  };

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked 
      ? [...activeFilters.colors, color]
      : activeFilters.colors.filter(c => c !== color);
    
    onFiltersChange({
      ...activeFilters,
      colors: newColors
    });
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    onFiltersChange({
      ...activeFilters,
      priceRange: range
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: filters.priceRange,
      sortBy: 'newest'
    });
  };

  const getActiveFilterCount = () => {
    return activeFilters.categories.length + 
           activeFilters.sizes.length + 
           activeFilters.colors.length +
           (activeFilters.priceRange[0] !== filters.priceRange[0] || 
            activeFilters.priceRange[1] !== filters.priceRange[1] ? 1 : 0);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {filters.categories.map(category => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={activeFilters.categories.includes(category)}
                onCheckedChange={(checked) => 
                  handleCategoryChange(category, checked as boolean)
                }
              />
              <label
                htmlFor={`category-${category}`}
                className="text-sm capitalize cursor-pointer"
              >
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-4">
          Price Range
        </h3>
        <div className="space-y-4">
          <Slider
            value={activeFilters.priceRange}
            onValueChange={(value) => handlePriceRangeChange(value as [number, number])}
            max={filters.priceRange[1]}
            min={filters.priceRange[0]}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${activeFilters.priceRange[0]}</span>
            <span>${activeFilters.priceRange[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Sizes */}
      <div>
        <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-4">
          Sizes
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {filters.sizes.map(size => {
            const isSelected = activeFilters.sizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => handleSizeChange(size, !isSelected)}
                className={`
                  px-3 py-2 text-xs font-medium rounded-lg border transition-colors
                  ${isSelected 
                    ? 'bg-foreground text-background border-foreground' 
                    : 'bg-background text-foreground border-border hover:border-foreground'
                  }
                `}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* Colors */}
      <div>
        <h3 className="font-grotesk font-bold text-sm uppercase tracking-wide mb-4">
          Colors
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {filters.colors.map(color => {
            const isSelected = activeFilters.colors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => handleColorChange(color.name, !isSelected)}
                className={`
                  w-10 h-10 rounded-full border-2 transition-all
                  ${isSelected 
                    ? 'border-foreground scale-110' 
                    : 'border-muted hover:border-foreground'
                  }
                `}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-80 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-grotesk font-bold text-lg">Filters</h2>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-sm"
            >
              Clear All
            </Button>
          )}
        </div>
        
        <FilterContent />
      </div>

      {/* Mobile Filter Bar */}
      <div className="lg:hidden sticky top-20 z-40 bg-background/95 backdrop-blur-md border-y border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-brand-accent text-white">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
                {getActiveFilterCount() > 0 && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <Button
                      variant="outline"
                      onClick={clearAllFilters}
                      className="w-full"
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
            
            <span className="text-sm text-muted-foreground">
              {productCount} products
            </span>
          </div>
        </div>

        {/* Active Filters */}
        <AnimatePresence>
          {getActiveFilterCount() > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border"
            >
              {activeFilters.categories.map(category => (
                <Badge
                  key={`category-${category}`}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-white"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  {category}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              
              {activeFilters.sizes.map(size => (
                <Badge
                  key={`size-${size}`}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-white"
                  onClick={() => handleSizeChange(size, false)}
                >
                  {size}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              
              {activeFilters.colors.map(color => (
                <Badge
                  key={`color-${color}`}
                  variant="secondary"
                  className="cursor-pointer hover:bg-destructive hover:text-white"
                  onClick={() => handleColorChange(color, false)}
                >
                  {color}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}