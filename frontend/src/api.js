// All calls to the backend are here, so components stay clean.
// Locally this is "/api" (Vite proxy). On Vercel it comes from VITE_API_URL.
const BASE = import.meta.env.VITE_API_URL || '/api';

let token = localStorage.getItem('token');

export function setToken(newToken) {
  token = newToken;
  if (newToken) localStorage.setItem('token', newToken);
  else localStorage.removeItem('token');
}

async function request(path, method = 'GET', body) {
  const res = await fetch(BASE + path, {
    method,
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (res.status === 204) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const api = {
  register: (body) => request('/auth/register', 'POST', body),
  login: (body) => request('/auth/login', 'POST', body),
  getDashboard: () => request('/dashboard'),
  getTransactions: (filters) => {
    // remove empty filters, then build ?from=...&to=...
    const clean = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    return request('/transactions?' + new URLSearchParams(clean));
  },
  addTransaction: (body) => request('/transactions', 'POST', body),
  updateTransaction: (id, body) => request('/transactions/' + id, 'PUT', body),
  deleteTransaction: (id) => request('/transactions/' + id, 'DELETE'),
};