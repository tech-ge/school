export function Badge({ children, variant = 'default' }: {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'gold';
}) {
  const styles = {
    default: 'bg-white/5 text-white/70 border-white/10',
    success: 'bg-green-500/10 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30',
    gold: 'bg-gold/10 text-gold border-gold/30',
  }[variant];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${styles}`}>
      {children}
    </span>
  );
}