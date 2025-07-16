import axios, { InternalAxiosRequestConfig } from "axios";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token or other headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add auth token if available
    // TODO: Replace with your auth token logic
    // Auth Setup
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Types for API client
interface ApiClientOptions {
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  [key: string]: any;
}

type HttpMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

/**
 * Global API Client function
 * @param method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param endpoint - API endpoint path
 * @param options - Additional options
 * @returns Promise - Axios response promise
 */
export const apiClient = async <T = any>(
  method: HttpMethod | string,
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<T> => {
  const { data, headers = {}, params, ...restOptions } = options;

  try {
    const response = await axiosInstance({
      method: method.toUpperCase() as HttpMethod,
      url: endpoint,
      data,
      headers: {
        ...headers,
      },
      params,
      ...restOptions,
    });

    return response.data;
  } catch (error) {
    // You can customize error handling here
    throw error;
  }
};
