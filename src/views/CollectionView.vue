<template>
  <div class="background-tc-2" style="height: fit-content;">
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
        class="text-center text-secondary align-items-center py-5 v-if-col-0" v-if="collections.length == 0"
      >
        <p>
          <b-icon-archive font-scale="5" class="mb-2"></b-icon-archive> <br />
          Anda belum memiliki koleksi
        </p>
      </div>
      <div class="row v-else pb-3" v-else>
        <div class="d-flex justify-content-center my-2">
          <div class="v-for" v-for="(col, index) in collections" :key="index">
            <div class="bg-white p-3 mx-3 rounded-3">
              <img
                :src="col.book_photo"
                style="max-width: 170px; max-height: 220px"
                alt=""
              />
              <b-card-text class="my-2" style="width: 120px">
                <h6>
                  <b>{{ col.book_name }}</b>
                </h6>
              </b-card-text>
              <b-button
                size="sm"
                class="gradient-btn"
                style="width: 60px"
                :to="{
                  name: 'detail-book',
                  params: {
                    id: col.book_id,
                  },
                }"
                >detail</b-button
              >
              <b-button
                class="gradient-btn btn-sm mx-1"
                @click="deleteCollection(col.id)"
                v-b-popover.hover.bottomleft="'Menghapus buku ini dari koleksi anda'"
                      title="Hapus"
                ><b-icon-bookmark-dash></b-icon-bookmark-dash
              ></b-button>
             
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
import { endpoints, api } from "../api.js";
export default {
  components: {
    MainNavbar,
    MainFooter,
  },

  data() {
    return {
      collections: [],
      user_logged: localStorage.getItem("user_id"),
    };
  },

  mounted() {
    this.fetchCollection();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push('/access-denied')
      }
    },

    
    fetchCollection() {
      const userId = localStorage.getItem("user_id");
      const params = {
        user_id: userId,
      };

      api
        .get(endpoints.getCollections, { params: params })
        .then((response) => {
          this.collections = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch koleksi");
        });
    },

    deleteCollection(id) {
      api
        .delete(endpoints.deleteCollection(id))
        .then((response) => {
          console.log(response.data);
          this.fetchCollection();
        
        })
        .catch((error) => {
          console.error(error);
          alert("gagal hapus koleksi");
        });
    },
  },
};
</script>
  
  <style>
</style>