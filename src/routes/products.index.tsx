import { createFileRoute, Link } from "@tanstack/react-router";
import { products, categories, searchProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/products/")({
  validateSearch: (search: Record<string, unknown>) => ({
    category: (search.category as string) || "",
    sort: (search.sort as string) || "popular",
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { category, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const filtered = useMemo(() => {
    let result = [...products];
    if (category) {
      const cat = categories.find((c) => c.slug === category);
      if (cat) result = result.filter((p) => p.category === cat.name);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    switch (sort) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => Number(b.id) - Number(a.id)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [category, sort, priceRange]);

  const currentCategory = categories.find((c) => c.slug === category);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{currentCategory?.name || "All Products"}</span>
      </nav>

      <div className="flex gap-6">
        {/* Sidebar filters */}
        <aside className="hidden w-56 shrink-0 md:block">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-bold text-card-foreground mb-3">Categories</h3>
            <ul className="space-y-1.5">
              <li>
                <Link
                  to="/products"
                  search={{ sort }}
                  className={`block rounded px-2 py-1 text-sm transition-colors ${!category ? "bg-brand-amber/10 font-semibold text-brand-amber" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All ({products.length})
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to="/products"
                    search={{ category: cat.slug, sort }}
                    className={`block rounded px-2 py-1 text-sm transition-colors ${category === cat.slug ? "bg-brand-amber/10 font-semibold text-brand-amber" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-card-foreground mb-3">Price Range</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">${priceRange[0]}</span>
                <span className="text-muted-foreground">—</span>
                <span className="text-muted-foreground">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min={0} max={500} value={priceRange[1]}
                onChange={(e) => setPriceRange([0, Number(e.target.value)])}
                className="mt-2 w-full accent-brand-amber"
              />
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-bold text-card-foreground mb-3">Rating</h3>
              <div className="space-y-1">
                {[4, 3, 2].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-foreground">
                    <input type="checkbox" className="rounded accent-brand-amber" />
                    {r}+ Stars
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{filtered.length} results</p>
            <select
              value={sort}
              onChange={(e) => navigate({ search: (prev: Record<string, string>) => ({ ...prev, sort: e.target.value }) })}
              className="rounded-md border border-input bg-card px-3 py-1.5 text-sm text-card-foreground"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-foreground">No products found</p>
              <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
