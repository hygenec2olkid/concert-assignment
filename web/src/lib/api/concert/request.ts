import requset from "../axios";
import {
  Concert,
  ConcertResponse,
  CreateConcertRequest,
  ConcertUserRequest,
} from "./type";

const BASE_CONCERT_URL = "/concert";

export const createNewConcertApi: (
  req: CreateConcertRequest
) => Promise<Concert> = (req) => {
  return requset.post(BASE_CONCERT_URL, req);
};

export const getConcertApi: () => Promise<ConcertResponse[]> = () => {
  return requset.get(BASE_CONCERT_URL);
};

export const userGetConcertApi: (
  userId: number
) => Promise<ConcertResponse[]> = (userId) => {
  return requset.get(`${BASE_CONCERT_URL}?userId=${userId}`);
};

export const deleteConcertApi: (id: number) => Promise<{ message: string }> = (
  id
) => {
  return requset.delete(`${BASE_CONCERT_URL}/${id}`);
};

export const reserveApi: (
  req: ConcertUserRequest
) => Promise<{ message: string }> = (req) => {
  return requset.post(`${BASE_CONCERT_URL}/reserve`, req);
};

export const cancelApi: (
  req: ConcertUserRequest
) => Promise<{ message: string }> = (req) => {
  return requset.post(`${BASE_CONCERT_URL}/cancel`, req);
};
