<template>
  <div class="background-tc-2">
    <MainNavbar />
    <div class="container m-5" style="margin-left: 120px !important; ">
      <div class="row justify-content-center d-flex align-items-center">
        <div class="col-8">
          <b-card class="v-if-select">
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-2">
                  <img
                    src="../assets/buku-hijau.jpeg"
                    width="100%"
                    class="rounded-3"
                  />
                  <!-- <img src="../assets/buku-hijau.jpeg" width="100%" class="rounded-3" /> -->
                </div>
                <div class="col-8 px-3">
                  <div class="h2-style mt-1 justify-content-between d-flex">
                    <h3>
                      <b>Nama Buku</b>
                    </h3>
                    <b-button class="gradient-btn btn-sm"
                      ><b-icon-bookmark-fill></b-icon-bookmark-fill
                    ></b-button>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <p>
                        <strong>Rating: </strong
                        ><b-icon-star-fill variant="warning"></b-icon-star-fill>
                        3.5
                      </p>
                      <p><strong>Genre: </strong>Nonfiksi</p>
                      <p>
                        <strong>Sinopsis: </strong>Lorem ipsum dolor sit amet.
                      </p>
                      <p><strong>Penulis: </strong>Shafira</p>
                      <p><strong>Penerbit: </strong>Gramedia</p>
                      <p><strong>Tahun Rilis: </strong>2023</p>
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
                <div class="v-if-rating-0">
                  <div class="text-center py-3">
                    <p>Buatlah ulasan pertamamu disini!</p>
                  </div>
                </div>
                <div class="v-else col-8">
                  <div class="h2-style mt-1 justify-content-start d-flex">
                    <h4><strong>Ulasan buku ini</strong></h4>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <div class="v-for-rate">
                        <div class="mb-3">
                          <p>
                            <strong>username: </strong>
                          </p>
                          <div class="card">
                            <p class="text-black pt-2 px-2">
                              Lorem, ipsum dolor sit amet consectetur
                              adipisicing. (<b-icon-star-fill
                                variant="warning"
                              ></b-icon-star-fill>
                              4)
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
    <MainFooter/>
  </div>
</template>

<script>
import MainNavbar from "../components/MainNavbar.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: {
    MainNavbar,
    MainFooter
  },
  data() {
    return {
      selectedBook: null,
      ratings: [],
      user_logged: "",
    };
  },

  mounted() {
    this.bookDetail();
    this.fetchRating();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},

    setDetail(data) {},

    bookDetail() {},

    fetchRating() {},

    createCollection() {}
  },
};
</script>

<style>
</style>