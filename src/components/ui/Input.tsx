export function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div>
      {label && <label className="text-xs uppercase tracking-widest text-muted mb-2 block">{label}</label>}
      <input {...props} className={`input-field ${props.className || ''}`} />
    </div>
  );
}