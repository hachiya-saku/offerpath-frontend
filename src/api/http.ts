import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { store } from "@/store";
import { clearCredentials, setAccessToken } from "@/store/authSlice";
import type { RefreshResponse } from "@/types/auth";

const baseConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
};

export const http = axios.create(baseConfig);
const refreshHttp = axios.create(baseConfig);

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

// Refresh tokens rotate, so concurrent 401 responses must share one refresh.
let refreshPromise: Promise<string> | null = null;

function isPublicAuthRequest(url?: string) {
  return ["/auth/login", "/auth/register", "/auth/refresh"].some((path) =>
    url?.endsWith(path),
  );
}

function refreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = refreshHttp
      .post<RefreshResponse>("/auth/refresh")
      .then((response) => {
        const { accessToken } = response.data;
        store.dispatch(setAccessToken(accessToken));
        return accessToken;
      })
      .catch((error: unknown) => {
        store.dispatch(clearCredentials());
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

http.interceptors.request.use((config) => {
  const accessToken = store.getState().auth.accessToken;

  if (accessToken && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetryableRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !config ||
      config._retry ||
      isPublicAuthRequest(config.url)
    ) {
      return Promise.reject(error);
    }

    config._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return http(config);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);
