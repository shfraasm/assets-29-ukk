import axios from "axios";
const ApiUrl = "";

const endpoints = {
};

const api = axios.create({
  baseURL: ApiUrl,
});

export { api, endpoints };
