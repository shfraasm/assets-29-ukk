<template>
  <div class="background-tc-2">
    <MainNavbar />
    <div class="container m-5">
      <div class="row justify-content-center d-flex align-items-center">
        <div class="col-8">
          <b-card>
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-3">
                  <img src="../assets/buku-hijau.jpeg" width="100%" />
                </div>
                <div class="col-8">
                  <div class="h2-style mt-1">
                    <h3>
                      <b>Nama Buku</b>
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
export default {
  components: {
    MainNavbar,
  },
  data() {
    return {
      selectedBook: null,
      description: "",
      star: 0,
      user_logged: "",
    };
  },

  mounted() {
    this.bookDetail();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},
    setDetail(data) {},
    bookDetail() {},

    createRating() {},
  },
};
</script>
  
  <style>
</style>