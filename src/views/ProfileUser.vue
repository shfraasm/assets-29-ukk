<template>
  <div class="about-page">
    <MainNavbar />
    <div class="container mt-5 pt-5">
      <div class="row pb-5 justify-content-center d-flex">
        <div class="col-8">
          <b-card>
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-2 align-items-center d-flex">
                  <b-avatar
                    variant="primary"
                    class="text-white bg-tosca mx-2"
                    style="margin-left: 40px !important; margin-bottom: 40px"
                    size="145px"
                  ></b-avatar>
                </div>
                <div
                  class="col-8 px-3"
                  v-for="(us, index) in users"
                  :key="index"
                >
                  <div class="h2-style mt-1 justify-content-between d-flex">
                    <h3>
                      <b>{{ us.username }}</b>
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <p><strong>Nama Lengkap: </strong>{{ us.name }}</p>
                      <p><strong>Email: </strong> {{ us.email }}</p>
                      <p><strong>Alamat: </strong>{{ us.address }}</p>
                    </div>
                  </div>
                </div>
                <div class="justify-content-between d-flex mt-2">
                  <div class="">
                    <b-button class="btn-sm button-primary" to="/dashboard"
                      ><b-icon-arrow-left></b-icon-arrow-left> Kembali</b-button
                    >
                  </div>
                  <div class="">
                    <div class="">
                      <b-button
                        class="btn-sm button-danger border-0"
                        @click="showDeleteModal = true"
                        ><b-icon-trash></b-icon-trash> Hapus Akun</b-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-card>
        </div>
      </div>
    </div>
    <!-- modal delete account -->
    <b-modal id="modal-1" v-model="showDeleteModal" hide-footer hide-header>
      <div class="justify-content-end d-flex">
        <b-button class="btn-close" @click="showDeleteModal = false"></b-button>
      </div>
      <div class="text-center align-items-center pt-3 pb-4">
        <b-icon-exclamation-circle
          font-scale="5.5"
          class="text-danger"
        ></b-icon-exclamation-circle>
        <h5
          class="mt-4 text-black"
          style="font-family: 'Nunito', sans-serif !important"
        >
          Apakah anda ingin melanjutkan proses ini?
        </h5>

        <b-button
          variant="secondary"
          class="mx-2 mt-3"
          @click="showDeleteModal = false"
          >Batal</b-button
        >
        <b-button variant="danger" class="mt-3" @click="deleteAccount"
          >Konfirmasi</b-button
        >
      </div>
    </b-modal>
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
      users: null,
      user_logged: localStorage.getItem("user_id"),
      showDeleteModal: false,
    };
  },

  mounted() {
    this.checkUserLogin();
    this.getUsers();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push("/access-denied");
      }
    },

    getUsers() {
      const userid = localStorage.getItem("user_id");
      const params = {
        id: userid,
      };

      api
        .get(endpoints.profile, { params: params })
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch profile");
        });
    },

    deleteAccount() {
      const id = localStorage.getItem("user_id");
      api
        .delete(endpoints.deleteUser(id))
        .then((response) => {
          localStorage.removeItem("user_id");
          localStorage.removeItem("user_name");
          localStorage.removeItem("username");
          localStorage.removeItem("user_role");
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
          alert("gagal delete akun");
        });
    },
  },
};
</script>