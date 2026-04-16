import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories, getFeaturedProducts, formatPrice, getDiscount } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const featured = getFeaturedProducts();
  const { addItem } = useCart();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 py-12 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-brand-amber/20 px-3 py-1 text-xs font-semibold text-brand-amber">
                🔥 Spring Sale — Up to 50% Off
              </span>
              <h1 className="mt-4 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
                Shop Smart,<br />
                <span className="text-brand-amber">Live Better</span>
              </h1>
              <p className="mt-4 max-w-md text-base opacity-80">
                Discover millions of products from trusted brands at unbeatable prices. Free shipping on orders over $50.
              </p>
              <div className="mt-8 flex gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center rounded-md bg-brand-amber px-6 py-3 font-semibold text-brand-amber-foreground transition-transform hover:scale-[1.02]"
                >
                  Shop Now
                </Link>
                <Link
                  to="/deals"
                  className="inline-flex items-center rounded-md border border-primary-foreground/30 px-6 py-3 font-semibold transition-colors hover:bg-primary-foreground/10"
                >
                  Today's Deals
                </Link>
              </div>
            </div>
            <div className="hidden md:grid grid-cols-2 gap-3">
              {featured.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-lg bg-primary-foreground/10 p-3 transition-colors hover:bg-primary-foreground/15"
                >
                  <img src={p.images[0]} alt={p.name} className="mx-auto h-24 w-24 rounded object-cover" />
                  <p className="mt-2 text-xs font-medium line-clamp-1">{p.name}</p>
                  <p className="text-sm font-bold text-brand-amber">{formatPrice(p.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="text-xl font-bold text-foreground">Shop by Category</h2>
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              search={{ category: cat.slug }}
              className="flex flex-col items-center gap-1.5 rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-md"
            >
              <span className="text-2xl">{cat.icon}</span>
              <span className="text-xs font-medium text-card-foreground text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Deal banner */}
      <section className="mx-auto max-w-7xl px-4 pb-6">
        <div className="rounded-xl bg-gradient-to-r from-brand-amber/20 to-brand-amber/5 px-6 py-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-bold text-foreground">Deal of the Day</h3>
            <p className="text-sm text-muted-foreground">Limited time offers on top products</p>
          </div>
          <Link to="/deals" className="mt-3 inline-flex items-center text-sm font-semibold text-brand-amber hover:underline md:mt-0">
            View all deals →
          </Link>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium text-brand-amber hover:underline">See all →</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-xl font-bold text-foreground">Trending Now</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {products.slice(4, 10).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-border bg-surface-sunken">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "🔒", title: "Secure Payments", desc: "SSL encrypted checkout" },
            { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
            { icon: "💬", title: "24/7 Support", desc: "We're here to help" },
          ].map((v) => (
            <div key={v.title} className="text-center">
              <span className="text-3xl">{v.icon}</span>
              <h3 className="mt-2 text-sm font-bold text-foreground">{v.title}</h3>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
