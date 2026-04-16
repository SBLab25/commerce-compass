import { createFileRoute, Link } from "@tanstack/react-router";
import { searchProducts } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: (search.q as string) || "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q ? searchProducts(q) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <span className="text-foreground">Search</span>
      </nav>

      <h1 className="text-xl font-bold text-foreground">
        {q ? `Results for "${q}"` : "Search Products"}
      </h1>
      <p className="text-sm text-muted-foreground">{results.length} products found</p>

      {results.length === 0 && q ? (
        <div className="py-20 text-center">
          <p className="text-lg font-semibold text-foreground">No results found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search term</p>
          <Link to="/products" className="mt-4 inline-block text-sm font-medium text-brand-amber hover:underline">Browse all products</Link>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
