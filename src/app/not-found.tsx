import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-charcoal flex flex-col items-center justify-center px-6 text-center">
      <span className="font-serif text-9xl text-champagne/20 font-light leading-none block mb-6">404</span>
      <h1 className="font-serif text-4xl text-ivory mb-4">Page Not Found</h1>
      <p className="font-sans font-light text-ivory/40 mb-10 max-w-sm leading-relaxed">
        The page you&apos;re looking for seems to have drifted away. Let us guide you back.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="btn-primary">Return Home</Link>
        <Link href="/gowns" className="btn-primary border-ivory/20 text-ivory/50">View Collection</Link>
      </div>
    </section>
  );
}
