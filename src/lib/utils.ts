import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (kobo: number) => `₦${(kobo / 100).toLocaleString()}`;

export const formatDate = (d: Date | string) =>
  new Date(d).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });