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
      <div class="col-7 px-5 py-2 my-4">
        <div class="container">
          <div class="text-center justify-content-center d-flex">
            <b-card class="pb-5 pt-5 rounded-5 card-size">
              <h3><b>Sign Up</b></h3>
              <b-form class="pt-3" @submit.prevent="registerUser">
                <b-form-group id="input-group-1">
                  <b-form-input
                    id="input-3"
                    type="text"
                    placeholder="nama lengkap"
                    class="mb-2 font-nunito"
                    v-model="name"
                    required
                  ></b-form-input>
                  <b-form-input
                    id="input-4"
                    type="text"
                    placeholder="nama pengguna"
                    class="mb-2 font-nunito"
                    v-model="username"
                    required
                  ></b-form-input>

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
                    class="mb-2 font-nunito"
                    v-model="password"
                    placeholder="Password"
                    required
                  ></b-form-input>
                  <b-form-textarea
                    id="input-6"
                    class="mb-2 font-nunito"
                    v-model="address"
                    placeholder="Alamat"
                    required
                  ></b-form-textarea>
                </b-form-group>
                <b-button
                  type="submit"
                  style="width: 300px"
                  class="mt-3 gradient-btn"
                  >Simpan</b-button
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
      name: "",
      username: "",
      email: "",
      roles: 2,
      password: "",
      address: "",
    };
  },
  methods: {
    registerUser() {
      const userData = {
        name: this.name,
        username: this.username,
        email: this.email,
        roles: this.roles,
        password: this.password,
        address: this.address,
      };

      api
        .post(endpoints.register, userData)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.error(error);
          alert("Data tidak valid, harap coba lagi");
        });
    },
  },
};
</script>
  
  <style>
</style>