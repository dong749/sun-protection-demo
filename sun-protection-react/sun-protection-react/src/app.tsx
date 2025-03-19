import { errorConfig } from './requestErrorConfig';

export const request = {
  baseURL: "http://localhost:8101",
  withCredentials: true,
  ...errorConfig,
};

