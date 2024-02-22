<template>
  <div class="background-tc-2">
    <MainNavbar />
    <div class="container m-5" style="margin-left: 250px !important">
      <div class="row justify-content-center d-flex align-items-center">
        <div class="col-8">
          <b-card class="v-if-select" v-if="selectedBook">
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-2">
                  <img
                    :src="selectedBook.photo"
                    width="100%"
                    class="rounded-3"
                  />
                  <!-- <img src="../assets/buku-hijau.jpeg" width="100%" class="rounded-3" /> -->
                </div>
                <div class="col-8 px-3">
                  <div class="h2-style mt-1 justify-content-between d-flex">
                    <h3>
                      <b>{{ selectedBook.name }}</b>
                    </h3>
                    <b-button class="gradient-btn btn-sm" @click="createCollection"
                      ><b-icon-bookmark-fill></b-icon-bookmark-fill
                    ></b-button>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <p>
                        <strong>Rating: </strong
                        ><b-icon-star-fill variant="warning"></b-icon-star-fill>
                        {{ selectedBook.total_rating }}
                      </p>
                      <p>
                        <strong>Kategori: </strong>{{ selectedBook.category }}
                      </p>
                      <p>
                        <strong>Sinopsis: </strong
                        >{{ selectedBook.description }}
                      </p>
                      <p><strong>Penulis: </strong>{{ selectedBook.author }}</p>
                      <p>
                        <strong>Penerbit: </strong>{{ selectedBook.publisher }}
                      </p>
                      <p>
                        <strong>Tahun Rilis: </strong
                        >{{ selectedBook.published_year }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="justify-content-start d-flex mt-2">
                  <b-button class="btn-sm button-primary" to="/booklist"
                    ><b-icon-arrow-left></b-icon-arrow-left> Kembali</b-button
                  >
                </div>
              </div>
            </div>
          </b-card>

          <!-- card ulasan -->
          <b-card class="my-5">
            <div class="container p-4">
              <div class="row">
                <div class="v-if-rating-0" v-if="ratings.length == 0">
                  <div class="text-center py-3">
                    <p>Buatlah ulasan pertamamu disini!</p>
                  </div>
                </div>
                <div class="v-else col-8" v-else>
                  <div class="h2-style mt-1 justify-content-start d-flex">
                    <h4><strong>Ulasan buku ini</strong></h4>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <div
                        class="v-for-rate"
                        v-for="(rate, index) in ratings"
                        :key="index"
                      >
                        <div class="mb-3">
                          <p>
                            <strong>{{ rate.user_name }}: </strong>
                          </p>
                          <div class="card">
                            <p class="text-black pt-2 px-2">
                              {{ rate.description }} (<b-icon-star-fill
                                variant="warning"
                              ></b-icon-star-fill>
                              {{ rate.star }})
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="justify-content-end d-flex mx-1">
                  <b-button
                    class="gradient-btn btn-sm"
                    style="width: 100px"
                    :to="{
                      name: 'rating-book',
                      params:{
                        id: selectedBook.id
                      }
                    }"
                    >Beri Ulasan</b-button
                  >
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>

<script>
import MainNavbar from "../components/MainNavbar.vue";
import MainFooter from "../components/MainFooter.vue";
import { endpoints, api } from "../api.js";
export default {
  components: {
    MainNavbar,
    MainFooter,
  },
  data() {
    return {
      selectedBook: null,
      ratings: [],
      user_logged: localStorage.getItem('user_id'),
    };
  },

  mounted() {
    this.bookDetail();
    this.fetchRating();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == 0) {
        this.$router.push('/access-denied')
      }
    },

    setDetail(data) {
      this.selectedBook = data.data;
    },
    bookDetail() {
      const bookId = this.$route.params.id;
      api
        .get(endpoints.getBookById(bookId))
        .then((response) => {
          console.log(response);
          this.setDetail(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal get data");
        });
    },

    fetchRating() {
      const bookId = this.$route.params.id;
      api
        .get(endpoints.getRatings)
        .then((response) => {
          this.ratings = response.data.data.filter(
            (rating) => rating.book_id === bookId
          );
        })
        .catch((error) => {
          console.error(error);
          alert('gagal get rating')
        });
    },

    createCollection() {
      const userId = localStorage.getItem('user_id')
      const addCollect = {
        user_id: userId,
        book_id: this.selectedBook.id
      }
      api
        .post(endpoints.addCollection, addCollect)
        .then((response) => {
          if (response.status == 200) {
            alert('berhasil tesimpan di koleksi anda')
          }
        })
        .catch((error) => {
          console.error(error);
          alert('gagal add koleksi')
        });
    },
  },
};
</script>

<style>
</style>