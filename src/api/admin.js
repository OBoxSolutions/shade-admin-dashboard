import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://shade-api.herokuapp.com/api",
  // baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-type": "application/json",
    "Accept": "application/json"
  },
});

export default adminApi;
