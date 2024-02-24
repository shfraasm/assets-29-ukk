<template>
  <div class="background-tc">
    <div class="row d-flex justify-content-center align-items-center">
      <div class="col-5 bg-white text-center vh-100">
        <h1 class="navbar-font logo-login">
          <div class="align-items-center mt-3">
            <img src="@/assets/logo-3.png" alt="" style="width: 270px" />
          </div>
        </h1>
      </div>
      <div class="col-7 px-2 my-4">
        <div class="container">
          <div class="text-center justify-content-center d-flex">
            <b-card class="pb-5 pt-5 rounded-5 card-size">
              <h3><b>Sign In</b></h3>
              <b-form class="pt-3" @submit.prevent="loginUser">
                <b-form-group id="input-group-1">
                  <b-form-input
                    id="input-1"
                    type="email"
                    placeholder="Email"
                    class="mb-2 font-nunito"
                    v-model="email"
                    required
                  ></b-form-input>
                  <b-form-input
                    id="input-2"
                    type="password"
                    class="font-nunito"
                    v-model="password"
                    placeholder="Password"
                    required
                  ></b-form-input>
                  <p class="text-end link-register m-2">
                    belum punya akun? <a href="/register">Buat Akun</a>
                  </p>
                </b-form-group>
                <b-button
                  type="submit"
                  style="width: 300px"
                  class="mt-1 gradient-btn"
                  >Masuk</b-button
                >
              </b-form>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { endpoints, api } from "../api.js";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    loginUser() {
      const loginData = {
        email: this.email,
        password: this.password,
      };

      api
        .post(endpoints.login, loginData)
        .then((response) => {
          let role = response.data.user.roles;
          const token = response.data.token;

          localStorage.setItem("user_id", response.data.user.id);
          localStorage.setItem("user_name", response.data.user.name);
          localStorage.setItem("username", response.data.user.username);
          localStorage.setItem("user_role", role);
          localStorage.setItem("token", token);
          
          if (role == 0) {
            this.$router.push("/dashboard-admin");
          } else if (role == 1) {
            this.$router.push("/dashboard-operator");
          } else if (role == 2) {
            this.$router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.error(error);
          alert("Nama pengguna/Kata sandi tidak valid");
        });

    },
  },
};
</script>

<style>
</style>