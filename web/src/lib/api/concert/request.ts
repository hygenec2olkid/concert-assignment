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
