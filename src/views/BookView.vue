<template>
  <div class="background-tc-2">
    <MainNavbar />
    
    <div class="my-5">
      <div class="text-center">
        <h2 class="h2-style"><b>Daftar Buku</b></h2>
        <p>
          <strong>PustakaPlus</strong>: Temukan Buku yang Menginspirasi di
          Halaman Daftar Buku Kami!
        </p>
        <div class="d-flex justify-content-center">
          <div class="">
            <b-input-group class="mb-2">
              <b-form-input
                class="font-nunito mb-2"
                style="width: 600px; height: 45px"
                placeholder="Masukkan Kata Kunci"
                v-model="keyword"
                @input="searchBooks(keyword)"
              ></b-form-input>
              <b-input-group-append>
                <b-button
                  class="gradient-btn border-0"
                  style="
                    border-bottom-left-radius: 0%;
                    border-top-left-radius: 0%;
                    height: 45px;
                  "
                >
                  <b-icon icon="search" />
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </div>
        </div>
      </div>
      
      <div class="row mx-5">
        <div class="d-flex flex-wrap justify-content-center my-2">
          <div class="v-for-book" v-for="(book, index) in books" :key="index">
            <div class="bg-white p-3 mx-3 rounded-3 mb-4">
              <img
                :src="book.photo"
                class="rounded-3"
                style="max-width: 170px; max-height: 220px"
                alt=""
              />
              <b-card-text class="my-2" style="width: 120px">
                <h6>
                  <b>{{ book.name }}</b>
                </h6>
              </b-card-text>
              <b-button
                size="sm"
                class="gradient-btn"
                style="width: 60px"
                :to="{ name: 'detail-book', params: { id: book.id } }"
                >detail</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
import { endpoints, api } from "../api.js";
import MainNavbar from "../components/MainNavbar.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: {
    MainNavbar,
    MainFooter,
  },

  data() {
    return {
      books: [],
      keyword: "",
      user_logged: localStorage.getItem("user_id"),
    };
  },

  mounted() {
    this.fetchBook();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push("/access-denied");
      }
    },
    searchBooks(keyword) {
      api
        .get(endpoints.searchBook, { params: { keyword: keyword } })
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          alert("pencarian tidak ditemukan");
        });
    },
    fetchBook() {
      api
        .get(endpoints.getBooks)
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
</style>