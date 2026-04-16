import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-bold">Get to Know Us</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/" className="hover:underline">About Zentra</Link></li>
              <li><Link to="/" className="hover:underline">Careers</Link></li>
              <li><Link to="/" className="hover:underline">Press Releases</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">Shop With Us</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/" className="hover:underline">Your Account</Link></li>
              <li><Link to="/" className="hover:underline">Your Orders</Link></li>
              <li><Link to="/" className="hover:underline">Shipping Rates</Link></li>
              <li><Link to="/" className="hover:underline">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">Let Us Help You</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/contact" className="hover:underline">Help Center</Link></li>
              <li><Link to="/" className="hover:underline">Track Package</Link></li>
              <li><Link to="/" className="hover:underline">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-bold">Sell on Zentra</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/" className="hover:underline">Start Selling</Link></li>
              <li><Link to="/" className="hover:underline">Fulfillment</Link></li>
              <li><Link to="/" className="hover:underline">Advertising</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-primary-foreground/15 pt-6 text-center">
          <span className="text-xl font-bold"><span className="text-brand-amber">Z</span>entra</span>
          <p className="mt-2 text-xs opacity-60">© 2026 Zentra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
