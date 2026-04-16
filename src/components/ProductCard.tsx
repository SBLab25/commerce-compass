import { Link } from "@tanstack/react-router";
import { formatPrice, getDiscount, type Product } from "@/lib/mock-data";
import { StarRating } from "./StarRating";

export function ProductCard({ product }: { product: Product }) {
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-sunken">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {discount && (
          <span className="absolute left-2 top-2 rounded-sm bg-destructive px-2 py-0.5 text-xs font-bold text-destructive-foreground">
            -{discount}%
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <span className="rounded-md bg-background px-3 py-1 text-sm font-semibold text-foreground">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <p className="text-xs text-muted-foreground">{product.brand}</p>
        <h3 className="mt-0.5 line-clamp-2 text-sm font-medium text-card-foreground group-hover:text-brand-amber transition-colors">
          {product.name}
        </h3>
        <div className="mt-1">
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-auto pt-2">
          <span className="text-lg font-bold text-card-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        {product.inStock && product.stockCount < 30 && (
          <p className="mt-1 text-xs text-destructive">Only {product.stockCount} left!</p>
        )}
      </div>
    </Link>
  );
}
