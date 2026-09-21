'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass p-12 rounded-3xl text-center max-w-md">
        <h1 className="font-display text-3xl mb-2 gold-text">Something went wrong</h1>
        <p className="text-muted mb-8 text-sm">{error.message}</p>
        <button onClick={reset} className="btn-gold">Try Again</button>
      </div>
    </div>
  );
}