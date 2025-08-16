import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';
import { CollectionGrid } from '@/components/collections/collection-grid';

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-6xl font-grotesk font-black mb-4">
              Collections
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collections of bold, modern streetwear that defines contemporary fashion.
            </p>
          </div>
          
          <CollectionGrid />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}