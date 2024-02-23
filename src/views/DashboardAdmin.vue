<template>
  <div class="background-tc">
    <OperatorNavbar />
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
              to="#"
              class="btn gradient-btn text-white rounded-4 py-2"
              >Info Lebih Lanjut</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white py-3 mb-5">
      <div class="container">
        <div class="row">
          <div class="col-6 sec-fitur pt-5 mt-4">
            <div class="">
              <h5 class="pt-5 mb-3"><b>Fitur PustakaPlus</b></h5>
              <p>
                <strong>PustakaPlus </strong> - menyediakan fitur akses cepat ke
                buku favorit Anda dengan fitur pencarian intuitif PustakaPlus.
                Temukan sinopsis, ulasan, dan informasi penting dengan antarmuka
                yang ramah pengguna, memastikan pengalaman membaca yang lebih
                efisien dan menyenangkan
              </p>
            </div>
          </div>
          <div class="col-6 pt-5 mt-4">
            <div class="text-center">
              <img
                src="../assets/haas.jpg"
                alt=""
                style="width: 70%"
                class="rounded-4"
              />
              <b-button
                href="#"
                style="width: 380px"
                class="btn gradient-btn text-white rounded-4 py-2 mt-3"
                >Lihat Daftar Buku</b-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white pt-2">
      <FooterBottom />
    </div>
  </div>
</template>
 
 <script>
import OperatorNavbar from "../components/OperatorNavbar.vue";
import FooterBottom from "../components/FooterBottom.vue";
export default {
  components: {
    FooterBottom,
    OperatorNavbar,
  },

  data() {
    return {
      role: localStorage.getItem("user_role"),
      user_logged: localStorage.getItem("user_id")
    };
  },

  mounted() {
    this.checkRole();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push('/access-denied')
      }
    },
    checkRole() {
      if (this.role == 1) {
        this.$router.push('/access-denied')
      }
      else if (this.role == 2) {
        this.$router.push('/access-denied')
      }
    },
  },
};
</script>
 
 <style>
</style>