import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

import { login } from "./user";

const api = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN,
});

const onAxiosRequest = async (
  config: InternalAxiosRequestConfig,
): Promise<InternalAxiosRequestConfig> => {
  const accessToken = localStorage.getItem("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

const onAxiosRequestError = (error: AxiosError | Error): Promise<AxiosError> =>
  Promise.reject(error);

api.interceptors.request.use(onAxiosRequest, onAxiosRequestError);

const onAxiosResponse = async (
  response: AxiosResponse,
): Promise<AxiosResponse> => {
  return response;
};

const onAxiosResponseError = async (error: AxiosError): Promise<AxiosError> => {
  const isAccessTokenExpired = error.response?.status === 401;

  if (!isAccessTokenExpired) {
    return Promise.reject(error);
  }

  console.log("access token expired.");

  const originalRequest = error.config;
  if (!originalRequest) {
    return Promise.reject(error);
  }

  const address = localStorage.getItem("wallet_address");

  if (!address) {
    return Promise.reject(error);
  }

  const newAccessTokenResponse = await login({ address });

  localStorage.setItem("access_token", newAccessTokenResponse.token);

  return api(originalRequest);
};

api.interceptors.response.use(onAxiosResponse, onAxiosResponseError);

export default api;
