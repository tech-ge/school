import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-12 rounded-3xl text-center max-w-md">
        <div className="font-display text-8xl gold-text mb-4">404</div>
        <h1 className="font-display text-2xl mb-2">Page Not Found</h1>
        <p className="text-muted mb-8 text-sm">This page doesn't exist at TechGeo University.</p>
        <Link href="/" className="btn-gold inline-block">Back Home</Link>
      </div>
    </div>
  );
}