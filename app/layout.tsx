import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BOLD THREADS - Modern Streetwear & Fashion',
  description: 'Discover bold, modern clothing that makes a statement. Shop the latest in streetwear, hoodies, and accessories.',
  keywords: 'streetwear, clothing, fashion, hoodies, accessories, modern style',
  authors: [{ name: 'BOLD THREADS' }],
  creator: 'BOLD THREADS',
  publisher: 'BOLD THREADS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'BOLD THREADS - Modern Streetwear & Fashion',
    description: 'Discover bold, modern clothing that makes a statement.',
    url: 'https://boldthreads.com',
    siteName: 'BOLD THREADS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOLD THREADS - Modern Streetwear & Fashion',
    description: 'Discover bold, modern clothing that makes a statement.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}