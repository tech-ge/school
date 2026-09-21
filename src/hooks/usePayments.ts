'use client';
import { useFetch } from './useFetch';
export const usePayments = () => useFetch('/api/payments');