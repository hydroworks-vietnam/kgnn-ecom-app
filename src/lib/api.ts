import axios, { AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';

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
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json';
    }
    // Always generate a new X-Request-Id
    config.headers['X-Request-Id'] = uuidv4();
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error instanceof AxiosError) {
      console.log("🚀 ~ axios error:", error.response);
    }
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
    
    apiClient({
      url,
      method,
      data: body,
      headers: headers
    })
    .then((response) => {
      const result: Result<T> = {
        data: {
          statusCode: response.status,
          message: response.data.message || response.data.payload
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

export default apiCall;