import { Hero } from '@/components/sections/hero';
import { FeaturedCollections } from '@/components/sections/featured-collections';
import { ProductGrid } from '@/components/product/product-grid';
import { sampleProducts, getFeaturedProducts } from '@/lib/products';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <ProductGrid 
              products={featuredProducts}
              title="Featured Products"
              showLoadMore
            />
          </div>
        </section>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}