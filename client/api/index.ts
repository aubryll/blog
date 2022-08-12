import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

export const post = (url: string, payload: Object) =>
  axiosInstance.post(url, payload);

export const put = (url: string, payload: Object) =>
  axiosInstance.put(url, payload);

export const get = (url: string) =>
  axiosInstance.get(url);
