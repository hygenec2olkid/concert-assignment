import request from "../axios";
import { HistoryResponse } from "./type";

export const getHistoryApi: (userId?: number) => Promise<HistoryResponse[]> = (
  userId
) => {
  const path = userId ? `/history?userId=${userId}` : "/history";
  return request.get(path);
};
