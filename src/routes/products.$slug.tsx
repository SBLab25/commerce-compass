import { createFileRoute, Link } from "@tanstack/react-router";
import { getProductBySlug, formatPrice, getDiscount, products } from "@/lib/mock-data";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { useState } from "react";

export const Route = createFileRoute("/products/$slug")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { slug } = Route.useParams();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Link to="/products" className="mt-4 inline-block text-brand-amber hover:underline">Browse products</Link>
      </div>
    );
  }

  const discount = getDiscount(product.price, product.originalPrice);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-foreground">Products</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Images */}
        <div>
          <div className="overflow-hidden rounded-lg border border-border bg-surface-sunken">
            <img src={product.images[selectedImage]} alt={product.name} className="aspect-square w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded border-2 transition-colors ${i === selectedImage ? "border-brand-amber" : "border-border hover:border-muted-foreground"}`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-sm font-medium text-brand-amber">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground md:text-3xl">{product.name}</h1>
          <div className="mt-2">
            <StarRating rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                <span className="rounded bg-destructive/10 px-2 py-0.5 text-sm font-semibold text-destructive">-{discount}%</span>
              </>
            )}
          </div>

          {product.inStock ? (
            <p className="mt-2 text-sm font-medium text-brand-success">✓ In Stock ({product.stockCount} available)</p>
          ) : (
            <p className="mt-2 text-sm font-medium text-destructive">✕ Out of Stock</p>
          )}

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Variants */}
          {product.variants?.map((v) => (
            <div key={v.type} className="mt-4">
              <label className="text-sm font-medium text-foreground">{v.type}</label>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {v.options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariants((prev) => ({ ...prev, [v.type]: opt }))}
                    className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${selectedVariants[v.type] === opt ? "border-brand-amber bg-brand-amber/10 font-medium text-foreground" : "border-border text-muted-foreground hover:border-muted-foreground"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity + Add to cart */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border border-border">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground">−</button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground">+</button>
            </div>
            <button
              onClick={() => { addItem(product, quantity, selectedVariants); }}
              disabled={!product.inStock}
              className="flex-1 rounded-md bg-brand-amber px-6 py-2.5 font-semibold text-brand-amber-foreground transition-transform hover:scale-[1.01] disabled:opacity-50"
            >
              Add to Cart
            </button>
          </div>

          {/* Tags */}
          <div className="mt-6 flex flex-wrap gap-1.5">
            {product.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-foreground">Related Products</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
