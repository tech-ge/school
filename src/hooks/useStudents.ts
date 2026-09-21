'use client';
import { useFetch } from './useFetch';
export const useStudents = () => useFetch('/api/students');