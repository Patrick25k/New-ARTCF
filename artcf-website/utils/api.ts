export const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const getToken = (): string =>
  typeof window !== 'undefined' ? localStorage.getItem('admin_token') || '' : '';

export const authHeaders = (): Record<string, string> => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});
