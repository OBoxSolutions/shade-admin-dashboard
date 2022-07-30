import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://shade-api.herokuapp.com/api",
  headers: {
    "Content-type": "application/json",
  },
});

export default adminApi;
