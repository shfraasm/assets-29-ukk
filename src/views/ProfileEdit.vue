<template>
  <div class="about-page">
    <OperatorNavbar />
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
                <div class="col-8">

                  <b-form
                    @submit.prevent="editUser"
                    class="p-3"
                    enctype="multipart/form-data"
                    style="font-size: 15px"
                  >
                    <b-form-group class="font-nunito mb-3" label="Nama lengkap">
                      <b-form-input
                        id="input-1"
                        placeholder="Masukkan nama lengkap"
                        class="font-nunito"
                        v-model="newUser.name"
                        
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group class="font-nunito mb-3" label="Nama pengguna">
                      <b-form-input
                        id="input-2"
                        placeholder="Masukkan nama pengguna"
                        class="font-nunito"
                        v-model="newUser.username"
                        
                      ></b-form-input>
                    </b-form-group>
                    <b-form-group class="font-nunito mb-3" label="Email">
                      <b-form-input
                        type="email"
                        id="input-3"
                        v-model="newUser.email"
                        class="font-nunito"
                        placeholder="Masukkan email"
                        
                      ></b-form-input>
                    </b-form-group>
  
                    <b-form-group class="font-nunito mb-3" label="Alamat">
                      <b-form-textarea
                        id="textarea-2"
                        v-model="newUser.address"
                        class="font-nunito"
                        placeholder="Masukkan alamat"
                        
                      ></b-form-textarea>
                    </b-form-group>
                    <div class="justify-content-between d-flex pt-2">
                      <div class="">
                        <b-button
                          class="btn-sm button-primary border-0"
                          v-if="role == '2'"
                          to="/profile"
                          ><b-icon-arrow-left></b-icon-arrow-left>
                          Kembali</b-button
                        >
                        <b-button
                          class="btn-sm button-primary border-0"
                          v-if="role == '1'"
                          to="/op-profile"
                          ><b-icon-arrow-left></b-icon-arrow-left>
                          Kembali</b-button
                        >
                        <b-button
                          class="btn-sm button-primary border-0"
                          v-if="role == '0'"
                          to="/op-profile"
                          ><b-icon-arrow-left></b-icon-arrow-left>
                          Kembali</b-button
                        >
                      </div>
                      <b-button type="submit" class="button-primary border-0"
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
import OperatorNavbar from "../components/OperatorNavbar.vue";
import MainFooterVue from "../components/MainFooter.vue";
import { endpoints, api } from "../api.js";

export default {
  components: {
    OperatorNavbar,
    MainFooterVue,
  },

  data() {
    return {
      users: null,
      role: localStorage.getItem("user_role"),
      user_logged: localStorage.getItem("user_id"),
      showDeleteModal: false,
      newUser: {}
    };
  },

  mounted() {
    this.checkUserLogin();
    this.getUsers();
    this.detailUser()
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

    detailUser() {
      const id = this.$route.params.id
      api
        .get(endpoints.getUserById(id))
        .then((response) => {
          this.newUser = response.data.data
        })
        .catch((error) => {
          console.error(error);
          alert("gagal get data");
        });
    },

    editUser() {
      const id = this.$route.params.id
      let role =  localStorage.getItem("user_role");
      let formData = new FormData();
      for (let key in this.newUser) {
        formData.append(key, this.newUser[key]);
      }
      formData.append("_method", "PUT");
      api
        .post(endpoints.editUser(id), formData)
        .then((response) => {
          console.log(response.data);

          if (role == 0) {
            this.$router.push('/op-profile')
          } else if (role == 1) {
            this.$router.push('/op-profile')
          } else if (role == 2) {
            this.$router.push('/profile')
          }
          
        })
        .catch((error) => {
          console.error(error);
          alert("gagal edit data");
        });
    },
  },
};
</script>
<style scoped>
.footer {
  position: relative;
  top: 70px;
  left: 0;
  width: 100%;
  background-color: #ffffff;
  box-sizing: border-box;
}
</style>