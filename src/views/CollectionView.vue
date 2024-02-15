<template>
  <div class="background-tc-2">
    <MainNavbar />
    <div class="my-5">
      <div class="text-center">
        <h2 class="h2-style"><b>Koleksi Saya</b></h2>
        <p>
          <strong>PustakaPlus</strong>: Temukan Buku yang Menginspirasi di
          Halaman Daftar Buku Kami!
        </p>
      </div>
      <div
        class="text-center text-secondary align-items-center py-5 v-if-col-0"
      >
        <p>
          <b-icon-archive font-scale="5" class="mb-2"></b-icon-archive> <br />
          Anda belum memiliki koleksi
        </p>
      </div>
      <div class="row v-else">
        <div class="d-flex justify-content-center my-2">
          <div class="v-for">
            <div class="bg-light p-3 mx-3 rounded-3">
              <img
                src="../assets/buku-hijau.jpeg"
                style="max-width: 170px; max-height: 220px"
                alt=""
              />
              <b-card-text class="my-2" style="width: 120px">
                <h6>
                  <b>Nama Buku</b>
                </h6>
              </b-card-text>
              <b-button
                size="sm"
                class="gradient-btn"
                style="width: 60px"
                :to="{
                  name: 'detail-book',
                }"
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
import MainNavbar from "../components/MainNavbar.vue";
import MainFooter from "../components/MainFooter.vue";
export default {
  components: {
    MainNavbar,
    MainFooter,
  },

  data() {
    return {
      collections: [],
      user_logged: "",
    };
  },

  mounted() {
    this.fetchCollection();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},
    fetchCollection() {},
  },
};
</script>
  
  <style>
</style>