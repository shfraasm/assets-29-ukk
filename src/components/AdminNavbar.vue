<template>
    <div class="">
      <b-navbar
        toggleable="sm"
        variant="light"
        style="background-color: white; height: 65px"
      >
        <div class="container mt-2">
          <div class="col-4">
            <b-navbar-brand href="#"
              ><h4 class="navbar-font mt-4">LOGO</h4>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
          </div>
          <div class="col-4"></div>
          <div class="col-4 justify-content-end d-flex">
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <h6 class="navbar-font mt-2">{{ username }}</h6>
              <b-avatar
                variant="primary"
                class="text-white bg-tosca mx-2"
                size="40px"
                v-b-toggle.sidebar-1
              ></b-avatar>
              <div>
                <b-sidebar id="sidebar-1" title="PustakaPlus" shadow>
                  <div class="px-3 py-2">
                    <nav class="mb-3">
                      <b-nav vertical>
                        <b-nav vertical class="sidebar-menu">
                          <b-nav-item active to="/dashboard-admin"
                            > <h6><b-icon-house></b-icon-house> Beranda</h6></b-nav-item
                          >
                          <h6><b-icon-braces></b-icon-braces> Master data</h6>
                          <b-nav-item active to="/borrows"
                            ><b-icon-table></b-icon-table> Data
                            Peminjaman</b-nav-item
                          >
                          <b-nav-item active to="/books"
                            ><b-icon-table></b-icon-table> Data Buku</b-nav-item
                          >
                          <b-nav-item active to="/users"
                            ><b-icon-table></b-icon-table> Data
                            Pengguna</b-nav-item
                          >
                          <b-nav-item active to="/operators"
                            ><b-icon-table></b-icon-table> Data
                            Petugas</b-nav-item
                          >
                          <br />
                          <h6><b-icon-gear></b-icon-gear> Pengaturan</h6>
                          <b-nav-item active @click="logoutUser"
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
    </div>
  </template>
    
    <script>
  export default {
    name: "MainNavbar",
    data() {
      return {
        username: "",
      };
    },
  
    methods: {
      logoutUser() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_role");
        this.$router.push("/");
      },
    },
  
    mounted() {
      this.username = localStorage.getItem("user_name");
    },
  };
  </script>
    
    <style>
  </style>