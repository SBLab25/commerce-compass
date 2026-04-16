import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/lib/mock-data";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery.trim() } });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-primary text-primary-foreground shadow-lg">
      {/* Top bar */}
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="shrink-0">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-brand-amber">Z</span>entra
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex flex-1 max-w-2xl">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products, brands, categories..."
            className="w-full rounded-l-md border-0 bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-amber"
          />
          <button
            type="submit"
            className="rounded-r-md bg-brand-amber px-4 py-2 font-medium text-brand-amber-foreground transition-colors hover:opacity-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </form>

        {/* Right actions */}
        <div className="flex items-center gap-5">
          <Link to="/" className="hidden text-sm hover:text-brand-amber transition-colors md:block">
            <div className="text-xs opacity-75">Hello, Sign in</div>
            <div className="font-semibold">Account</div>
          </Link>
          <Link to="/" className="hidden text-sm hover:text-brand-amber transition-colors md:block">
            <div className="text-xs opacity-75">Returns</div>
            <div className="font-semibold">& Orders</div>
          </Link>
          <Link to="/cart" className="relative flex items-center gap-1 hover:text-brand-amber transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber text-xs font-bold text-brand-amber-foreground">
                {itemCount}
              </span>
            )}
            <span className="hidden text-sm font-semibold sm:block">Cart</span>
          </Link>
        </div>
      </div>

      {/* Category bar */}
      <div className="border-t border-primary-foreground/10 bg-primary/90">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-4 py-1.5 text-sm scrollbar-none">
          <Link to="/products" className="shrink-0 rounded-sm px-2.5 py-1 font-medium hover:bg-primary-foreground/10 transition-colors">
            All
          </Link>
          {categories.slice(0, 7).map((cat) => (
            <Link
              key={cat.id}
              to="/products"
              search={{ category: cat.slug }}
              className="shrink-0 rounded-sm px-2.5 py-1 hover:bg-primary-foreground/10 transition-colors"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/deals" className="shrink-0 rounded-sm px-2.5 py-1 font-medium text-brand-amber hover:bg-primary-foreground/10 transition-colors">
            Today's Deals
          </Link>
        </div>
      </div>
    </header>
  );
}
