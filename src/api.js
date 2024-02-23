import axios from "axios";
const ApiUrl = "http://127.0.0.1:8000/api";

const endpoints = {
  login: `${ApiUrl}/login`,
  register: `${ApiUrl}/register`,
  searchUser: `${ApiUrl}/search-users`,
  searchOp: `${ApiUrl}/search-operators`,
  
  profile: `${ApiUrl}/profile`,
  getUser2: `${ApiUrl}/users-peminjam`,
  addUser2: `${ApiUrl}/users`,

  getUser1: `${ApiUrl}/users-petugas`,
  addUser1: `${ApiUrl}/operators`,

  getUserById: (id) =>  `${ApiUrl}/users/${id}`,
  editUser: (id) =>  `${ApiUrl}/users/${id}`,
  deleteUser: (id) =>  `${ApiUrl}/users/${id}`,

  getBooks: `${ApiUrl}/books`,
  searchBook: `${ApiUrl}/search-books`,
  getBookById: (id) =>  `${ApiUrl}/books/${id}`,
  addBook: `${ApiUrl}/books`,
  editBook: (id) =>  `${ApiUrl}/books/${id}`,
  deleteBook: (id) =>  `${ApiUrl}/books/${id}`,
  
  getRatings: `${ApiUrl}/ratings`,
  addRatings: `${ApiUrl}/ratings`,
  destroyRating: (id) =>  `${ApiUrl}/ratings/${id}`,

  getCollections: `${ApiUrl}/collections`,
  addCollection: `${ApiUrl}/collections`,
  deleteCollection: (id) => `${ApiUrl}/collections/${id}`,

  getBorrows: `${ApiUrl}/borrowings`,
  searchBorrow: `${ApiUrl}/search-borrows`,
  getBorrowById: (id) =>  `${ApiUrl}/borrowings/${id}`,
  addBorrow: `${ApiUrl}/borrowings`,
  editBorrow: (id) =>  `${ApiUrl}/borrowings/${id}`,
  deleteBorrow: (id) =>  `${ApiUrl}/borrowings/${id}`,
};

const api = axios.create({
  baseURL: ApiUrl,
});

export { api, endpoints };
