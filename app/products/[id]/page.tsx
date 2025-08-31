import { notFound } from 'next/navigation';
import { getProductById } from '@/lib/products';
import { ProductDetails } from '@/components/product/product-details';
import Navbar from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CartDrawer } from '@/components/cart/cart-drawer';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <ProductDetails product={product} />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export async function generateStaticParams() {
  const { sampleProducts } = await import('@/lib/products');
  return sampleProducts.map((product) => ({
    id: product.id,
  }));
}