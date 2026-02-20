import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },

  timeout: 10000,
});

const get = async <T = unknown>(path: string): Promise<T> => {
  const res = await axiosClient.get<T>(path);
  return res.data;
};

const post = async <T = unknown, D = unknown>(
  path: string,
  data: D
): Promise<T> => {
  const res = await axiosClient.post<T>(path, data);
  return res.data;
};

const put = async <T = unknown, D = unknown>(
  path: string,
  data: D
): Promise<T> => {
  const res = await axiosClient.put<T>(path, data);
  return res.data;
};

const deleted = async <T = unknown>(path: string): Promise<T> => {
  const res = await axiosClient.delete<T>(path);
  return res.data;
};

const Request = { get, post, put, delete: deleted };

export default Request;
