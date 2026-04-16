export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tags: string[];
  variants?: { type: string; options: string[] }[];
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
}

export const categories: Category[] = [
  { id: "1", name: "Electronics", slug: "electronics", icon: "💻", productCount: 245 },
  { id: "2", name: "Fashion", slug: "fashion", icon: "👕", productCount: 512 },
  { id: "3", name: "Home & Garden", slug: "home-garden", icon: "🏡", productCount: 189 },
  { id: "4", name: "Sports", slug: "sports", icon: "⚽", productCount: 134 },
  { id: "5", name: "Books", slug: "books", icon: "📚", productCount: 876 },
  { id: "6", name: "Beauty", slug: "beauty", icon: "✨", productCount: 298 },
  { id: "7", name: "Toys", slug: "toys", icon: "🎮", productCount: 167 },
  { id: "8", name: "Automotive", slug: "automotive", icon: "🚗", productCount: 94 },
];

const productImages = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80",
  "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80",
];

export const products: Product[] = [
  {
    id: "1", name: "Premium Wireless Headphones", slug: "premium-wireless-headphones",
    description: "Experience crystal-clear audio with active noise cancellation. 40-hour battery life, premium comfort padding, and seamless Bluetooth 5.3 connectivity.",
    price: 199.99, originalPrice: 299.99, images: [productImages[0], productImages[1]],
    category: "Electronics", brand: "SoundCore", rating: 4.7, reviewCount: 2341,
    inStock: true, stockCount: 156, tags: ["wireless", "noise-cancelling", "bluetooth"],
    variants: [{ type: "Color", options: ["Midnight Black", "Pearl White", "Navy Blue"] }],
    featured: true,
  },
  {
    id: "2", name: "Smart Fitness Watch Pro", slug: "smart-fitness-watch-pro",
    description: "Track your health 24/7 with heart rate monitoring, GPS, sleep tracking, and 100+ workout modes. Water resistant to 50m.",
    price: 149.99, originalPrice: 229.99, images: [productImages[1], productImages[0]],
    category: "Electronics", brand: "FitTech", rating: 4.5, reviewCount: 1876,
    inStock: true, stockCount: 89, tags: ["fitness", "smartwatch", "health"],
    variants: [{ type: "Size", options: ["40mm", "44mm"] }, { type: "Color", options: ["Black", "Silver", "Rose Gold"] }],
    featured: true,
  },
  {
    id: "3", name: "Polarized Aviator Sunglasses", slug: "polarized-aviator-sunglasses",
    description: "Classic aviator design with UV400 polarized lenses. Lightweight titanium frame for all-day comfort.",
    price: 79.99, originalPrice: 119.99, images: [productImages[6], productImages[5]],
    category: "Fashion", brand: "OptiVue", rating: 4.3, reviewCount: 967,
    inStock: true, stockCount: 234, tags: ["sunglasses", "polarized", "uv-protection"],
    variants: [{ type: "Lens Color", options: ["Gray", "Brown", "Green"] }],
  },
  {
    id: "4", name: "Running Shoes Ultra Boost", slug: "running-shoes-ultra-boost",
    description: "Engineered for performance with responsive cushioning, breathable mesh upper, and continental rubber outsole.",
    price: 129.99, originalPrice: 179.99, images: [productImages[3], productImages[2]],
    category: "Sports", brand: "StrideMax", rating: 4.6, reviewCount: 3421,
    inStock: true, stockCount: 67, tags: ["running", "shoes", "athletic"],
    variants: [{ type: "Size", options: ["8", "9", "10", "11", "12"] }, { type: "Color", options: ["Black/White", "Blue/Gray", "Red/Black"] }],
    featured: true,
  },
  {
    id: "5", name: "Organic Face Serum Set", slug: "organic-face-serum-set",
    description: "3-piece organic serum collection with Vitamin C, Hyaluronic Acid, and Retinol. Dermatologist tested.",
    price: 54.99, originalPrice: 89.99, images: [productImages[4], productImages[5]],
    category: "Beauty", brand: "PureGlow", rating: 4.8, reviewCount: 1543,
    inStock: true, stockCount: 312, tags: ["skincare", "organic", "serum"],
    featured: true,
  },
  {
    id: "6", name: "Portable Bluetooth Speaker", slug: "portable-bluetooth-speaker",
    description: "Powerful 360° sound in a compact, waterproof design. 20-hour playtime with built-in power bank.",
    price: 69.99, images: [productImages[7], productImages[0]],
    category: "Electronics", brand: "SoundCore", rating: 4.4, reviewCount: 2187,
    inStock: true, stockCount: 445, tags: ["speaker", "bluetooth", "waterproof"],
  },
  {
    id: "7", name: "Ergonomic Office Chair", slug: "ergonomic-office-chair",
    description: "Premium mesh back with lumbar support, adjustable armrests, and tilt mechanism. Supports up to 300 lbs.",
    price: 349.99, originalPrice: 499.99, images: [productImages[2], productImages[3]],
    category: "Home & Garden", brand: "ComfortZone", rating: 4.6, reviewCount: 892,
    inStock: true, stockCount: 23, tags: ["office", "ergonomic", "chair"],
  },
  {
    id: "8", name: "Bestselling Novel Collection", slug: "bestselling-novel-collection",
    description: "Curated set of 5 New York Times bestsellers. Hardcover edition with exclusive bookmarks.",
    price: 44.99, originalPrice: 74.99, images: [productImages[5], productImages[4]],
    category: "Books", brand: "ReadMore", rating: 4.9, reviewCount: 4521,
    inStock: true, stockCount: 567, tags: ["books", "fiction", "bestseller"],
  },
  {
    id: "9", name: "Wireless Gaming Mouse", slug: "wireless-gaming-mouse",
    description: "Ultra-responsive 25K DPI sensor, 70-hour battery, and customizable RGB lighting. Built for competitive gaming.",
    price: 89.99, originalPrice: 129.99, images: [productImages[0], productImages[7]],
    category: "Electronics", brand: "PixelForge", rating: 4.5, reviewCount: 1678,
    inStock: true, stockCount: 198, tags: ["gaming", "mouse", "wireless"],
  },
  {
    id: "10", name: "Stainless Steel Water Bottle", slug: "stainless-steel-water-bottle",
    description: "Triple-insulated, keeps drinks cold 24h or hot 12h. BPA-free, leak-proof cap. 32oz capacity.",
    price: 29.99, images: [productImages[2], productImages[6]],
    category: "Sports", brand: "HydroElite", rating: 4.7, reviewCount: 5632,
    inStock: true, stockCount: 890, tags: ["water-bottle", "insulated", "eco-friendly"],
  },
  {
    id: "11", name: "Smart Home Hub", slug: "smart-home-hub",
    description: "Control all your smart devices from one place. Voice assistant, touchscreen display, and Matter support.",
    price: 179.99, originalPrice: 249.99, images: [productImages[7], productImages[1]],
    category: "Electronics", brand: "ConnectHome", rating: 4.3, reviewCount: 765,
    inStock: false, stockCount: 0, tags: ["smart-home", "hub", "voice-assistant"],
  },
  {
    id: "12", name: "Premium Yoga Mat", slug: "premium-yoga-mat",
    description: "Extra-thick 6mm eco-friendly TPE mat with alignment lines. Non-slip surface with carrying strap.",
    price: 39.99, images: [productImages[4], productImages[3]],
    category: "Sports", brand: "ZenFit", rating: 4.8, reviewCount: 2109,
    inStock: true, stockCount: 432, tags: ["yoga", "fitness", "eco-friendly"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q))
  );
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price);
}

export function getDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
