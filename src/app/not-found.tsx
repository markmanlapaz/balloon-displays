import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream-100 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Decorative balloons */}
        <div className="flex justify-center gap-4 mb-8">
          <div className="w-16 h-20 rounded-full bg-gradient-to-b from-coral-300 to-coral-400 opacity-80" />
          <div className="w-20 h-24 rounded-full bg-gradient-to-b from-botanical-300 to-botanical-400 opacity-80 -mt-2" />
          <div className="w-14 h-18 rounded-full bg-gradient-to-b from-blush-300 to-blush-400 opacity-80 mt-1" />
        </div>

        <h1 className="font-accent text-8xl text-botanical-700 mb-4">404</h1>
        <h2 className="font-body text-2xl font-semibold text-charcoal-700 mb-3">
          This page has floated away
        </h2>
        <p className="text-charcoal-500 leading-relaxed mb-8">
          It looks like the page you're looking for doesn't exist or may have been moved.
          Let's get you back to celebrating!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-botanical-700 text-cream-100 font-medium hover:bg-botanical-800 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-botanical-700 text-botanical-700 font-medium hover:bg-botanical-50 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
