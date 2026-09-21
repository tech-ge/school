import { redirect } from 'next/navigation';

export default function VerifyRedirect({ searchParams }: { searchParams: { reference?: string } }) {
  redirect(`/payments/success?reference=${searchParams.reference || ''}`);
}