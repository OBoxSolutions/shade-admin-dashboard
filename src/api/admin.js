import axios from "axios";

const adminApi = axios.create({
  baseURL: "https://shade-api.herokuapp.com/api",
});

export default adminApi;
