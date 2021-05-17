import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const api = axios.create({ baseURL: "http://localhost:3000" });

// Axios middleware to convert all api responses to camelCase
api.interceptors.response.use((response: AxiosResponse) => {
  if (
    response.data &&
    response.headers["content-type"] === "application/json; charset=utf-8"
  ) {
    response.data = camelcaseKeys(response.data, { deep: true });
  }
  return response;
});

// Axios middleware to convert all api requests to snake_case
api.interceptors.request.use((config: AxiosRequestConfig) => {
  const newConfig = { ...config };
  newConfig.url = `${config.url}`;
  if (newConfig.headers["Content-Type"] === "multipart/form-data")
    return newConfig;
  if (config.params) {
    newConfig.params = snakecaseKeys(config.params, { deep: true });
  }
  if (config.data) {
    newConfig.data = snakecaseKeys(config.data, { deep: true });
  }
  return newConfig;
});

export default api;
