'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, itemCount } = useCart();

  const drawerVariants = {
    closed: { x: "100%" },
    open: { x: 0 }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <h2 className="text-lg font-grotesk font-bold">
                    Shopping Cart
                  </h2>
                  {itemCount > 0 && (
                    <Badge className="bg-brand-accent text-white">
                      {itemCount}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeCart}
                  className="rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 p-6">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="font-grotesk font-bold text-lg">Your cart is empty</h3>
                      <p className="text-muted-foreground">
                        Add some bold pieces to get started
                      </p>
                    </div>
                    <Button onClick={closeCart} className="bg-brand-accent hover:bg-brand-accent/90">
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex space-x-4"
                      >
                        <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-muted">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          <div>
                            <h3 className="font-medium text-sm leading-tight">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                              <span>{item.color}</span>
                              <span>•</span>
                              <span>{item.size}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="w-7 h-7"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-medium text-sm">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.originalPrice && (
                                <div className="text-xs text-muted-foreground line-through">
                                  ${(item.originalPrice * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-muted-foreground hover:text-destructive p-0 h-auto"
                          >
                            Remove
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-grotesk font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Button 
                      className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-medium py-6 text-base group"
                      size="lg"
                    >
                      <Sparkles className="w-4 h-4 mr-2 group-hover:animate-spin" />
                      Checkout Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={closeCart}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                  
                  <div className="text-center text-xs text-muted-foreground">
                    Free shipping on orders over $100
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}