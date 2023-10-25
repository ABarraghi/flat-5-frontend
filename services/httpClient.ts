import axios from 'axios';
import { storage } from './storage';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add a request interceptor
httpClient.interceptors.request.use(
  function (config) {
    const auth = JSON.parse(storage.getValue('auth') || '{}');
    if (auth?.accessToken && config?.headers) {
      config.headers.Authorization = `Bearer ${auth.accessToken as string}`;
    }

    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (err) => {
    if (err.response?.status === 401) {
      const config = err.response.config;
      const retried = storage.getValue('retry');
      if (retried) {
        storage.deleteValue('auth');
        storage.deleteValue('retry');
        document.location.href = '/';
        return;
      }
      storage.setValue('retry', '1');
      const auth: { accessToken: string; refreshToken: string } = JSON.parse(storage.getValue('auth') || '{}');
      if (!auth.refreshToken) return Promise.reject(err);
      try {
        const resAuthRefreshToken = await httpClient.post(
          '/auth/refresh-token',
          {
            refreshToken: auth.refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          },
        );
        const newToken: { accessToken: string; refreshToken: string } = resAuthRefreshToken.data.data || {};
        storage.setValue('auth', JSON.stringify({ ...auth, ...newToken }));

        return httpClient(config);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(err);
  },
);
