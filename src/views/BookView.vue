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
      </div>
      <div class="row mx-5">
        <div class="d-flex flex-wrap justify-content-center my-2">
          <div class="v-for-book" v-for="(book, index) in books" :key="index">
            <div class="bg-light p-3 mx-3 rounded-3 mb-4">
              <img
                :src="book.photo"
                class="rounded-3"
                style="max-width: 170px; max-height: 220px"
                alt=""
              />
              <b-card-text class="my-2" style="width: 120px">
                <h6>
                  <b>{{book.name}}</b>
                </h6>
              </b-card-text>
              <b-button
                size="sm"
                class="gradient-btn"
                style="width: 60px"
                :to="{ name: 'detail-book', params: { id: book.id} }"
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
      user_logged: localStorage.getItem('user_id'),


    };
  },

  mounted() {
    this.fetchBook();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push('/access-denied')
      }
    },
    fetchBook() {
      api.get(endpoints.getBooks).then((response) => {
        this.books = response.data.data
      }).catch(error => {
        console.error(error);
      })
    },
  },
};
</script>

<style>
</style>