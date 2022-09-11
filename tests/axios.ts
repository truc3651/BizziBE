import axios from "axios";
import { ENDPOINT } from "./resources";

const api = axios.create({
  baseURL: ENDPOINT,
  headers: { Accept: "application/json" },
});

api.interceptors.request.use((config) => {
  console.log('>>token', config.params)
  const requestConfig: Record<string, any> = {
    ...config,
  };
  if (config?.params?.token) {
    requestConfig.headers.Authorization = `Bearer ${config.params.token}`;
  }
  return requestConfig;
});

api.interceptors.response.use(
  function (response) {
    return Object.values(response.data.data)[0];
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default api;
