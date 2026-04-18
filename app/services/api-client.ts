import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10_000,
});

// ---------------------------------------------------------------------------
// Request interceptor – attach auth tokens or any common headers here
// ---------------------------------------------------------------------------
api.interceptors.request.use(
  (config) => {
    // Example: inject bearer token when available
    // const token = localStorage.getItem('access_token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// Response interceptor – normalise errors
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Surface a readable message from the API error payload when possible
    const message: string =
      error?.response?.data?.error ?? error?.message ?? 'Unknown error';
    return Promise.reject(new Error(message));
  },
);

export default api;
