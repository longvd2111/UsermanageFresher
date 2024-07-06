import axios from "./customize-axios";

export const fetchAllUser = () => {
  return axios.get("/api/users?page=2");
};
