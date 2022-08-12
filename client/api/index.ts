import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001/",
});

export const post = (url: string, payload: Object) =>
  axiosInstance.post(url, payload).then((res) => res.data);

export const put = (url: string, payload: Object) =>
  axiosInstance.put(url, payload).then((res) => res.data);

export const get = (url: string) =>
  axiosInstance.get(url).then((res) => res.data);
