import requset from "../axios";
import { TDogResponse } from "./type";

export const getDog: () => Promise<TDogResponse> = () => {
  return requset.get("/breeds");
};
