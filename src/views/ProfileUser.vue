<template>
  <div class="about-page">
    <MainNavbar />
    <div class="container mt-5 pt-5">
      <div class="row pb-5 justify-content-center d-flex">
        <div class="col-8 ">
          <b-card>
            <div class="container p-4">
              <div class="row">
                <div class="col-4 p-2 align-items-center d-flex">
                  <b-avatar
                    variant="primary"
                    class="text-white bg-tosca mx-2"
                    style="margin-left: 40px !important; margin-bottom: 40px;"
                    size="145px"
                  ></b-avatar>
                </div>
                <div class="col-8 px-3" v-for="(us, index) in users" :key="index">
                  <div class="h2-style mt-1 justify-content-between d-flex">
                    <h3>
                      <b>{{ us.username}}</b>
                    </h3>
                    
                  </div>
                  <div class="mt-3">
                    <div class="font-size-p">
                      <p>
                        <strong>Nama Lengkap: </strong
                        >{{us.name}}
                        
                      </p>
                      <p>
                        <strong>Email: </strong> {{ us.email }}
                      </p>
                      <p>
                        <strong>Alamat: </strong 
                        >{{ us.address }}
                      </p>
                     
                    </div>
                  </div>
                </div>
                <div class="justify-content-start d-flex mt-2">
                  <b-button class="btn-sm button-primary" to="/dashboard"
                    ><b-icon-arrow-left></b-icon-arrow-left> Kembali</b-button
                  >
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
      users: null,
      user_logged: localStorage.getItem("user_id"),
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
  },
};
</script>