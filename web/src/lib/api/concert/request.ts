import requset from "../axios";
import { Concert, ConcertResponse, CreateConcertRequest } from "./type";

export const createNewConcertApi: (
  data: CreateConcertRequest
) => Promise<Concert> = (data) => {
  return requset.post("/concert", data);
};

export const getConcertApi: () => Promise<ConcertResponse[]> = () => {
  return requset.get("/concert");
};

export const deleteConcertApi: (id: number) => Promise<{ message: string }> = (
  id
) => {
  return requset.delete(`/concert/${id}`);
};
