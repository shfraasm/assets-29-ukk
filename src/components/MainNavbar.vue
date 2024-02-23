<template>
  <div class="">
    <b-navbar
      toggleable="sm"
      style="background-color: white; height: 65px"
    >
      <div class="container mt-2">
        <div class="col-md-4">
          <b-navbar-brand href="#">
            <div class="align-items-center mt-3">
              <img src="@/assets/logo-3.png" alt="" style="width: 170px" />
            </div>
          </b-navbar-brand>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        </div>

        <div class="col-md-4">
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="navbar-font ml-auto">
              <b-nav-item href="/dashboard"
                ><h6 class="navbar-font mx-1">Beranda</h6>
              </b-nav-item>
              <b-nav-item href="/booklist"
                ><h6 class="navbar-font mx-4">Daftar Buku</h6></b-nav-item
              >
              <b-nav-item href="/about"
                ><h6 class="navbar-font mx-1">Tentang Kami</h6></b-nav-item
              >
            </b-navbar-nav>
          </b-collapse>
        </div>
        <div class="col-4 justify-content-end d-flex">
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <h6 class="navbar-font mt-2">{{username}}</h6>
            <b-avatar
              variant="primary"
              class="text-white bg-tosca mx-2"
              size="40px"
              v-b-toggle.sidebar-1
            ></b-avatar>
            <div>
              <!-- perubahan -->
              <b-sidebar id="sidebar-1" title="PustakaPlus" shadow no-header>
                <div class="px-3 py-2">
                  <div class="align-items-center mt-3 mb-5 mx-2">
                    <img
                      src="@/assets/logo-3.png"
                      alt=""
                      style="width: 180px"
                    />
                  </div>
                  <!-- end prubahan -->
                  <nav class="mb-3 mx-3">
                    <b-nav vertical>
                      <b-nav vertical class="sidebar-menu">
                        <!-- h5 brubah -->
                        <h5>
                          <b-icon-person-fill></b-icon-person-fill> Akun saya
                        </h5>
                        <b-nav-item active to="/profile"
                          ><b-icon-person></b-icon-person> Profil saya</b-nav-item
                        >
                        <b-nav-item active to="/bookmark"
                          ><b-icon-bookmark></b-icon-bookmark> Koleksi
                          pribadi</b-nav-item
                        >

                        <br />
                        <!-- h5 brubah -->
                        <h5><b-icon-gear></b-icon-gear> Pengaturan</h5>
                        <b-nav-item active @click="showLogoutModal = true"
                          ><b-icon-box-arrow-right></b-icon-box-arrow-right>
                          Logout</b-nav-item
                        >
                      </b-nav>
                    </b-nav>
                  </nav>
                </div>
              </b-sidebar>
            </div>
          </b-navbar-nav>
        </div>
      </div>
    </b-navbar>

    <!-- modal logout -->
    <b-modal id="modal-1" v-model="showLogoutModal" hide-footer hide-header>
      <div class="justify-content-end d-flex">
        <b-button class="btn-close" @click="showLogoutModal = false"></b-button>
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
          @click="showLogoutModal = false"
          >Batal</b-button
        >
        <b-button variant="danger" class="mt-3" @click="logoutUser"
          >Logout</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
  
  <script>
export default {
  name: "MainNavbar",
  data() {
    return {
      username: "",
      user_role: "",
      showLogoutModal: false,
    };
  },

  methods: {
    logoutUser() {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");
      localStorage.removeItem("username");
      localStorage.removeItem("roles");
      localStorage.removeItem("user_role");
      this.$router.push("/");
    },
  },

  mounted() {
    this.username = localStorage.getItem("username")
  },
};
</script>
  
  <style>
</style>