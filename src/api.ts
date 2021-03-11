import axios, { AxiosInstance } from "axios";

const token = `AAAqwegfdghjssdfsfsfsdfs`;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: `https://11.ecmascript.pages.academy/big-trip`,
    timeout: 1000 * 5,
    withCredentials: false,
    headers: {
      authorization: `Basic ${token}`,
    },
  });

  return api;
};
