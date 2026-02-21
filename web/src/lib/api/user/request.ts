import request from "../axios";
import { UserResponse } from "./type";

export const getListUserApi: () => Promise<UserResponse[]> = () => {
  return request.get("/user");
};
