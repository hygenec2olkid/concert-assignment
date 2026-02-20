import requset from "../axios";
import { Concert, CreateConcertRequest } from "./type";

export const createNewConcertApi: (
  data: CreateConcertRequest
) => Promise<Concert> = (data) => {
  return requset.post("/concert", data);
};
