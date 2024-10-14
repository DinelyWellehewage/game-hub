import axios from "axios";

export interface FetchResponse<T> {
  count: number;
  next:string|null;
  results: T[];
}

export default axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "aee59c9ae1564f3b9e4011fa6c4f19ee",
  },
});
