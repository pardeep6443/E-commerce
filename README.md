# BOLD THREADS - Modern E-commerce Store

A modern, animated, mobile-first clothing e-commerce frontend built with React, Next.js, Tailwind CSS, and Framer Motion. Features bold design aesthetics inspired by contemporary streetwear culture.

## 🚀 Features

### Design & UX
- **Bold Visual Design**: High-contrast typography, bright accent colors, generous whitespace
- **Smooth Animations**: Framer Motion powered transitions, reveals, and micro-interactions
- **Mobile-First**: Responsive design optimized for all device sizes
- **Dark Mode**: Seamless theme switching with system preference detection
- **Accessibility**: WCAG compliant with semantic HTML, focus states, and ARIA labels

### E-commerce Functionality
- **Product Catalog**: Grid/list views with filtering, sorting, and search
- **Product Details**: Image galleries, color/size selection, reviews
- **Shopping Cart**: Persistent cart with quantity management
- **Wishlist**: Save favorite items across sessions
- **Advanced Filtering**: Price ranges, color swatches, size selection

### Performance & SEO
- **Next.js 13**: App router with server components
- **Image Optimization**: Next/Image with lazy loading
- **SEO Ready**: Meta tags, Open Graph, structured data
- **Core Web Vitals**: Optimized for LCP, FID, and CLS scores

## 🛠️ Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context
- **Form Handling**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: Sonner

## 🎨 Branding

The design system uses a bold, modern aesthetic:

- **Primary Color**: `#111111` (Black)
- **Accent Color**: `#FF4D6D` (Bright Pink)
- **Typography**: Inter (System font stack)
- **Headings**: Inter with black weight (900)
- **Spacing**: 8px grid system
- **Border Radius**: 12px (0.75rem) default

## 🚀 Getting Started

### Prerequisites
- Node.js 16.8 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bold-threads
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── products/          # Product pages
├── components/            # React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   ├── layout/           # Layout components
│   ├── product/          # Product-related components
│   └── sections/         # Page sections
├── contexts/             # React contexts
├── lib/                  # Utilities and configurations
├── styles/              # Global styles
└── public/              # Static assets
```

## 🎯 Key Components

### Navigation
- **Sticky Navbar**: Logo, categories, search, cart badge
- **Dropdown Menus**: Animated category dropdowns
- **Mobile Menu**: Slide-out navigation drawer

### Product Features
- **Product Cards**: Hover effects, quick-add, wishlist toggle
- **Product Gallery**: Swipeable images, zoom, thumbnails
- **Color/Size Selection**: Interactive swatches and size grid
- **Reviews**: Star ratings and review count

### Shopping Experience
- **Cart Drawer**: Slide-in cart with quantity controls
- **Filtering**: Advanced filters with mobile drawer
- **Search**: Real-time product search
- **Wishlist**: Persistent wishlist with heart animations

## 🎨 Customization

### Branding Colors
Update colors in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    primary: '#111111',    // Main brand color
    accent: '#FF4D6D',     // Accent color
    light: '#FFF5F7',      // Light accent
  }
}
```

### Typography
Modify fonts in `tailwind.config.ts`:

```typescript
fontFamily: {
  'grotesk': ['Inter', 'system-ui', 'sans-serif'],
  'sans': ['Inter', 'system-ui', 'sans-serif'],
}
```

### Component Theming
Components use CSS variables defined in `globals.css`. Customize the color palette by updating the CSS custom properties.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## ⚡ Performance Optimizations

- **Image Optimization**: Next/Image with WebP support
- **Code Splitting**: Dynamic imports for heavy components
- **Prefetching**: Link prefetching for faster navigation
- **Bundle Analysis**: Built-in bundle analyzer
- **Caching**: Aggressive caching strategies

## 🔧 Development

### Adding New Products
Update the `sampleProducts` array in `lib/products.ts`:

```typescript
{
  id: "unique-product-id",
  name: "Product Name",
  price: 99,
  originalPrice: 129,
  images: ["https://example.com/image.jpg"],
  description: "Product description",
  category: "category-name",
  sizes: ["S", "M", "L"],
  colors: [
    { name: "Black", value: "#000000", image: "image-url" }
  ],
  // ... other properties
}
```

### Creating New Pages
Use the app router structure:

```bash
app/
  new-page/
    page.tsx      # Main page component
    loading.tsx   # Loading UI
    error.tsx     # Error UI
    layout.tsx    # Optional page-specific layout
```

## 📦 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm run export  # For static export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [ ] User authentication and accounts
- [ ] Payment integration (Stripe)
- [ ] Order management
- [ ] Email notifications
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] PWA functionality

## 💡 Inspiration

This project draws inspiration from modern streetwear brands and contemporary e-commerce experiences, focusing on bold aesthetics and smooth interactions that engage users and drive conversions.