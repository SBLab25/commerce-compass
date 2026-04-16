import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Support — Zentra" },
      { name: "description", content: "Get in touch with our support team. We're here to help 24/7." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-foreground">Contact & Support</h1>
      <p className="mt-2 text-muted-foreground">Have a question? We're here to help 24/7.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: "📧", title: "Email", desc: "support@zentra.shop" },
          { icon: "📞", title: "Phone", desc: "1-800-ZENTRA" },
          { icon: "💬", title: "Live Chat", desc: "Available 24/7" },
        ].map((c) => (
          <div key={c.title} className="rounded-lg border border-border bg-card p-4 text-center">
            <span className="text-2xl">{c.icon}</span>
            <h3 className="mt-2 font-bold text-card-foreground">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.desc}</p>
          </div>
        ))}
      </div>

      <form className="mt-8 space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-bold text-card-foreground">Send us a message</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input placeholder="Name" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
          <input placeholder="Email" type="email" className="rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
        </div>
        <input placeholder="Subject" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
        <textarea placeholder="Message" rows={5} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-amber" />
        <button type="submit" className="rounded-md bg-brand-amber px-6 py-2.5 font-semibold text-brand-amber-foreground">
          Send Message
        </button>
      </form>
    </div>
  );
}
