import axios from "axios";

export const testUrl = () => {
  return axios.create({
    headers: {
      Authorization: `JWT ${sessionStorage.getItem("token")}`,
    },
    baseURL: "http://localhost:5000",
  });
};
