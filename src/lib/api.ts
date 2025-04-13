import axios, { AxiosError } from 'axios';

export interface Result<T = any> {
  data: ApiBaseResponse<T>;
}

export interface ApiBaseResponse<T = any> {
  statusCode: number;
  message: T;
}

export type HttpAllowMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const BACKEND_BASE_URL = `${import.meta.env.PUBLIC_BACKEND_URL}/api`;

const apiClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 10000, // Optional: set a timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.request.use(
//   (config) => {
//     // Modify request config if needed (e.g., attach a token)
//     const token = localStorage.getItem('token'); // Example
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("🚀 ~ axios error:", error.cause)
    return Promise.reject(error);
  }
);

function apiCall<T = any>(
  message: {
    url: string;
    method?: HttpAllowMethod;
    params?: Record<string, any>;
    body?: any;
    headers?: Record<string, string>;
  },
  callback: (res: Result<T>) => void
) {
    const { url, method, body, headers } = message;
    const finalHeaders = {
      ...headers,
      Accept: '*/*',
      'Content-Type': 'application/json',
    }

    apiClient({
      url, 
      method,
      data: body,
      headers: finalHeaders
    })
    .then((response) => {
      const result: Result<T> = {
        data: {
          statusCode: response.status,
          message: response.data.message
        },
      };
    callback(result);
  })
  .catch((err) => {
    const error: Result<T> = {
      data: {
        message: err.response?.data?.message || err.message || 'Network error occurred',
        statusCode: err.response?.status || 500,
      },
    };
    callback(error);
  });
}

export default apiCall