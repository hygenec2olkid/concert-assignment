import request from "../axios";
import { HistoryResponse } from "./type";

export const getHistoryApi: () => Promise<HistoryResponse[]> = () => {
  return request.get("/history");
};
