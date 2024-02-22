import axios from "axios";
const ApiUrl = "http://127.0.0.1:8000/api";

const endpoints = {
  login: `${ApiUrl}/login`,
  register: `${ApiUrl}/register`,

  getBooks: `${ApiUrl}/books`,
  getBookById: (id) =>  `${ApiUrl}/books/${id}`,
  addBook: `${ApiUrl}/books`,
  editBook: (id) =>  `${ApiUrl}/books/${id}`,
  deleteBook: (id) =>  `${ApiUrl}/books/${id}`,

  getRatings: `${ApiUrl}/ratings`,
  addRatings: `${ApiUrl}/ratings`,

  getCollections: `${ApiUrl}/collections`,
  addCollection: `${ApiUrl}/collections`,
  deleteCollection: (id) => `${ApiUrl}/collections/${id}`,
};

const api = axios.create({
  baseURL: ApiUrl,
});

export { api, endpoints };
