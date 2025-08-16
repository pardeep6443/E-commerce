'use client';

import { ThemeProvider } from 'next-themes';
import { CartProvider } from '@/contexts/cart-context';
import { WishlistProvider } from '@/contexts/wishlist-context';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange={false}
    >
      <CartProvider>
        <WishlistProvider>
          {children}
          <Toaster 
            richColors 
            closeButton 
            position="bottom-right"
            expand={true}
            className="z-[100]"
          />
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}