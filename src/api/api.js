import axios from "axios";

export const testUrl = () => {
  return axios.create({
    baseURL: "http://localhost:5000",
  });
};
