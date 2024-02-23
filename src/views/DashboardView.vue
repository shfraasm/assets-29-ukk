<template>
  <div class="background-tc">
    <MainNavbar />
    <div class="card-dashboard justify-content-center d-flex text-center">
      <div class="card py-3 card-welcome rounded-4">
        <div class="card-body">
          <h5 class="card-title m-4 text-center">Jelajahi Dunia Ilmu di</h5>
          <h5 class="card-title m-4 text-center">Perpustakaan Kami</h5>
          <p class="card-text">
            <strong>PustakaPlus </strong>- temukan sumber daya, komunitas, dan
            kesempatan untuk memperluas wawasan Anda.
          </p>
          <div class="px-3">
            <b-button
              style="width: 200px"
              href="#info-lanjut"
              class="btn gradient-btn text-white rounded-4 py-2"
              >Info Lebih Lanjut</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="container pb-5">
        <div class="row py-3 align-items-center px-5" id="info-lanjut">
          <div class="col-md-6 sec-fitur ml-5">
            <h5 class="mb-3"><b>Fitur PustakaPlus</b></h5>
            <p style="width: 420px">
              <strong>PustakaPlus </strong> - menyediakan fitur akses cepat ke
              buku favorit Anda dengan fitur pencarian intuitif PustakaPlus.
              Temukan sinopsis, ulasan, dan informasi penting dengan antarmuka
              yang ramah pengguna, memastikan pengalaman membaca yang lebih
              efisien dan menyenangkan.
            </p>
          </div>
          <div class="col-md-6 pt-5">
            <div class="text-end">
              <img
                src="../assets/bg-buku.jpg"
                alt=""
                style="width: 380px"
                class="rounded-4"
              />
              <b-button
                to="/booklist"
                style="width: 380px"
                class="btn gradient-btn text-white rounded-4 py-2 mt-3"
                >Lihat Daftar Buku</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="background-tc-2">
      <div class="pt-5">
        <div class="pt-5"></div>
        <h2 class="h2-style text-center"><b>Koleksi Terbaru</b></h2>
        <p class="text-center">
          <strong>PustakaPlus</strong>: Temukan Buku yang Menginspirasi di
          Halaman Daftar Buku Kami!
        </p>
        <div class="row mx-5">
          <div class="col">
            <div class="d-flex flex-wrap justify-content-center my-2">
              <div class="v-for-book" v-for="(book, index) in books" :key="index">
                <div class="bg-white p-3 mx-3 rounded-3 mb-4">
                  <img
                    :src="book.photo"
                    style="max-width: 170px; max-height: 220px"
                    class="rounded-3"
                    alt=""
                  />
                  <p style="width: 120px" class="text-start mt-2">
                    <b>{{book.name}}</b>
                  </p>
                  <b-button
                    size="sm"
                    class="gradient-btn align-items-start d-flex"
                    style="width: 60px"
                    :to="{ name: 'detail-book', params: {
                      id: book.id
                    } }"
                    >Detail</b-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white">
      <div class="container py-5">
        <div class="row py-3">
          <div class="col-md-6">
            <div class="contact-us">
              <span class="badge badge-custom rounded-4 px-3 py-2 mb-3"
                ><b>PustakaPlus</b></span
              >
              <h1><b>Hubungi Kami</b></h1>
              <p style="width: 450px">
                <strong>PustakaPlus </strong> - menyediakan fitur akses cepat ke
                buku favorit Anda dengan fitur pencarian intuitif PustakaPlus.
              </p>

              <span class="badge badge-custom rounded-4 px-3 py-2 mb-3"
                ><b-icon-instagram font-scale="1.5"></b-icon-instagram
              ></span>
              <span class="badge badge-custom rounded-4 px-3 py-2 mb-3 mx-3"
                ><b-icon-whatsapp font-scale="1.5"></b-icon-whatsapp
              ></span>
              <span class="badge badge-custom rounded-4 px-3 py-2 mb-3"
                ><b-icon-envelope font-scale="1.5"></b-icon-envelope
              ></span>
            </div>
          </div>
          <div class="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5769326362156!2d106.6351776741822!3d-6.18732806062018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f929162547c7%3A0xbbf35137362e584d!2sSMK%20Negeri%204%20Kota%20Tangerang!5e0!3m2!1sid!2sid!4v1707808433480!5m2!1sid!2sid"
              width="510"
              height="300"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    <MainFooterVue />
  </div>
</template>

<script>
import MainNavbar from "../components/MainNavbar.vue";
import MainFooterVue from "../components/MainFooter.vue";
import { endpoints, api } from "../api.js";
export default {
  components: {
    MainNavbar,
    MainFooterVue,
  },

  data() {
    return {
      books: [],
      user_logged: localStorage.getItem("user_id")

    };
  },

  mounted() {
    this.checkUserLogin();
    this.fetchBook()
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push('/access-denied')
      }
    },

    fetchBook() {
      api
        .get(endpoints.getBooks)
        .then((response) => {
          this.books = response.data.data
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },
  },
};
</script>

<style>
</style>