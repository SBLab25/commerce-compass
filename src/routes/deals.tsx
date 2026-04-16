import { createFileRoute, Link } from "@tanstack/react-router";
import { products, formatPrice, getDiscount } from "@/lib/mock-data";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Today's Deals — Zentra" },
      { name: "description", content: "Discover unbeatable deals on electronics, fashion, home and more. Limited time offers every day." },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  const deals = products.filter((p) => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="rounded-xl bg-gradient-to-r from-destructive/10 to-brand-amber/10 px-6 py-8 text-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground">🔥 Today's Deals</h1>
        <p className="mt-2 text-muted-foreground">Limited time offers — grab them before they're gone!</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {deals.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>

      {deals.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-semibold">No deals available right now</p>
          <Link to="/products" className="mt-2 text-sm text-brand-amber hover:underline">Browse all products</Link>
        </div>
      )}
    </div>
  );
}
