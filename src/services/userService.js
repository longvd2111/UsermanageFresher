import axios from "./customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};

const postCreateUser = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

const putUpdateUser = (id, name, job) => {
  return axios.put(`./api/users/${id}`, { name: name, job: job });
};

export { fetchAllUser, postCreateUser, putUpdateUser };
