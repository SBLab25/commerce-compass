import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/mock-data";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal } = useCart();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Nothing to checkout</h1>
        <Link to="/products" className="mt-4 inline-block text-brand-amber hover:underline">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Checkout</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          {/* Shipping */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-card-foreground">Shipping Address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input placeholder="First Name" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="Last Name" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="Address" className="sm:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="City" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="ZIP Code" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h2 className="text-lg font-bold text-card-foreground">Payment Method</h2>
            <p className="mt-2 text-sm text-muted-foreground">Payment integration coming soon. This is a demo checkout.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input placeholder="Card Number" className="sm:col-span-2 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="MM/YY" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
              <input placeholder="CVC" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-5 h-fit">
          <h2 className="text-lg font-bold text-card-foreground">Order Summary</h2>
          <div className="mt-3 max-h-48 overflow-y-auto space-y-2">
            {items.map((item) => (
              <div key={item.product.id} className="flex items-center gap-2 text-sm">
                <img src={item.product.images[0]} alt="" className="h-10 w-10 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-card-foreground">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatPrice(tax)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 font-bold text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
          </div>
          <button className="mt-4 w-full rounded-md bg-brand-amber py-2.5 font-semibold text-brand-amber-foreground transition-transform hover:scale-[1.01]">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
