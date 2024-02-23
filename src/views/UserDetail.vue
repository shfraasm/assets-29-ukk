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
                <div class="col-8 px-3" v-if="selectedUser">
                  <div class="h2-style mt-1 justify-content-between d-flex">
                    <h3>
                      <b>{{ selectedUser.username }}</b>
                    </h3>
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <p>
                        <strong>Nama Lengkap: </strong>{{ selectedUser.name }}
                      </p>
                      <p><strong>Email: </strong> {{ selectedUser.email }}</p>
                      <p><strong>Alamat: </strong>{{ selectedUser.address }}</p>
                    </div>
                  </div>

                  <div class="justify-content-between d-flex mt-2">
                    <div class="">
                      <b-button
                        class="btn-sm button-primary border-0"
                        v-if="selectedUser.roles == 0"
                        to="/admins"
                        ><b-icon-arrow-left></b-icon-arrow-left>
                        Kembali</b-button
                      >
                      <b-button
                        class="btn-sm button-primary border-0"
                        v-if="selectedUser.roles == 1"
                        to="/operators"
                        ><b-icon-arrow-left></b-icon-arrow-left>
                        Kembali</b-button
                      >
                      <b-button
                        class="btn-sm button-primary border-0"
                        v-if="selectedUser.roles == 2"
                        to="/users"
                        ><b-icon-arrow-left></b-icon-arrow-left>
                        Kembali</b-button
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
      selectedUser: null,
    };
  },

  mounted() {
    this.checkUserLogin();
    this.detailUser();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push("/access-denied");
      }
    },

    setDetail(data) {
      this.selectedUser = data.data;
    },
    detailUser() {
      const id = this.$route.params.id;
      api
        .get(endpoints.getUserById(id))
        .then((response) => {
          this.setDetail(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal get data");
        });
    },
  },
};
</script>