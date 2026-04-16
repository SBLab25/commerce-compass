import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/mock-data";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCart();
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Discover great products and add them to your cart.</p>
        <Link to="/products" className="mt-6 inline-flex items-center rounded-md bg-brand-amber px-6 py-2.5 font-semibold text-brand-amber-foreground">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-foreground">Shopping Cart ({itemCount} items)</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
              <Link to="/products/$slug" params={{ slug: item.product.slug }}>
                <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded object-cover" />
              </Link>
              <div className="flex-1">
                <Link to="/products/$slug" params={{ slug: item.product.slug }} className="font-medium text-card-foreground hover:text-brand-amber transition-colors">
                  {item.product.name}
                </Link>
                <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                {item.selectedVariants && Object.entries(item.selectedVariants).length > 0 && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(", ")}
                  </p>
                )}
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center rounded border border-border">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground">−</button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 py-1 text-sm text-muted-foreground hover:text-foreground">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-card-foreground">{formatPrice(item.product.price * item.quantity)}</span>
                    <button onClick={() => removeItem(item.product.id)} className="text-sm text-destructive hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="rounded-lg border border-border bg-card p-5 h-fit">
          <h2 className="text-lg font-bold text-card-foreground">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? <span className="text-brand-success font-medium">Free</span> : formatPrice(shipping)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax (est.)</span><span>{formatPrice(tax)}</span></div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
              <span>Total</span><span>{formatPrice(total)}</span>
            </div>
          </div>
          {subtotal < 50 && (
            <p className="mt-3 rounded bg-brand-amber/10 px-3 py-2 text-xs text-brand-amber">
              Add {formatPrice(50 - subtotal)} more for free shipping!
            </p>
          )}
          <Link
            to="/checkout"
            className="mt-4 block w-full rounded-md bg-brand-amber py-2.5 text-center font-semibold text-brand-amber-foreground transition-transform hover:scale-[1.01]"
          >
            Proceed to Checkout
          </Link>
          <Link to="/products" className="mt-2 block text-center text-sm text-muted-foreground hover:text-foreground">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
