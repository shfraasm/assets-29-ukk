<template>
  <div class="background-tc-2">
    <MainNavbar />
    <div class="container m-5" style="margin-left: 250px !important">
      <div class="row justify-content-center d-flex align-items-center">
        <div class="col-8">
          <b-card>
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-3">
                  <img :src="selectedBook.photo" width="100%" />
                </div>
                <div class="col-8">
                  <div class="h2-style mt-1">
                    <h3>
                      <b>{{ selectedBook.name }}</b>
                    </h3>
                  </div>
                  <b-form class="pt-2" @submit.prevent="createRating">
                    <b-form-rating
                      variant="warning"
                      class="mb-2"
                      v-model="star"
                    ></b-form-rating>
                    <b-form-textarea
                      id="textarea-1"
                      type="text"
                      class="font-nunito"
                      rows="3"
                      v-model="description"
                      max-rows="6"
                      placeholder="Masukkan ulasan anda"
                      required
                      style="height: 195px"
                    ></b-form-textarea>
                    <div class="justify-content-between d-flex pt-2">
                      <b-button
                        class="btn-sm button-primary"
                        :to="{
                          name: 'detail-book',
                          params: {
                            id: selectedBook.id
                          }
                        }"
                        ><b-icon-arrow-left></b-icon-arrow-left>
                        Kembali</b-button
                      >
                      <b-button
                        class="gradient-btn btn-sm"
                        type="submit"
                        style="width: 85px"
                        >Simpan</b-button
                      >
                    </div>
                  </b-form>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import MainNavbar from "../components/MainNavbar.vue";
import { endpoints, api } from "../api.js";
export default {
  components: {
    MainNavbar,
  },
  data() {
    return {
      selectedBook: null,
      description: "",
      star: 0,
      user_logged: localStorage.getItem('user_id'),
    };
  },

  mounted() {
    this.bookDetail();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
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

    createRating() {
      const bookId = this.$route.params.id;
      const ratingData = {
        user_id: this.user_logged,
        book_id: bookId,
        description: this.description,
        star: this.star
      }
      api
        .post(endpoints.addRatings, ratingData)
        .then((response) => {
         alert('berhasil menambah ulasan')
         this.$router.push('/booklist')
        })
        .catch((error) => {
          console.error(error);
          alert('gagal tambah rating')
        });
    },
  },
};
</script>
  
  <style>
</style>