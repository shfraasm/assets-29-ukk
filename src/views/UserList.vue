<template>
  <div class="pb-4" style="background-color: #dcf2f1">
    <OperatorNavbarVue />
    <div class="container my-5">
      <div class="p-3 alert-custom rounded-3 mb-3">
        <div class="justify-content-between d-flex">
          <p class="mx-2">
            <b-icon-people></b-icon-people><strong> DATA PENGGUNA</strong>
          </p>
          
          <b-button
            class="rounded-3 gradient-btn mx-2"
            @click="showAddModal = true"
            ><b-icon-plus></b-icon-plus> Tambah</b-button
          >
        </div>
      </div>
      
      <div class="justify-content-end d-flex">
        <div class="">

          <b-input-group class="mb-2">
            <b-form-input
              class="font-nunito mb-2"
              prepend="cari"
              style="max-width: 300px"
              placeholder="Masukkan Kata Kunci"
              v-model="keyword"
              @input="searchUser(keyword)"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                class="gradient-btn border-0"
                style="border-bottom-left-radius: 0%; border-top-left-radius: 0%"
              >
                <b-icon icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <b-table
        bordered
        hover
        class="custom-table rounded-3"
        :items="users"
        :fields="fields"
        :per-page="perPage"
      :current-page="currentPage"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(actions)="data">
          <div class="my-1">
            <!-- <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailUser(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button> -->
            <b-button
              class="m-1 btn-sm outline-primary-custom"
              :to="{
                name: 'detail-user',
                params: {
                  id: data.item.id
                }
              }"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button
              @click="openEditModal(data.item)"
              class="m-1 btn-sm outline-secondary-custom"
              ><b-icon-pen></b-icon-pen
            ></b-button>
            <b-button
              class="m-1 btn-sm outline-danger-custom"
              @click="deleteUser(data.item.id)"
              ><b-icon-trash></b-icon-trash
            ></b-button>
          </div>
        </template>
      </b-table>

      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="users.length"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>

    <!-- modal detail -->
    <b-modal id="modal-1" v-model="showDetailModal" title="Detail pengguna" hide-header-close>
      <div v-if="selectedUser">
        <p><strong>Nama Lengkap:</strong> {{ selectedUser.name }}</p>
        <p><strong>Nama Pengguna:</strong> {{ selectedUser.username }}</p>
        <p><strong>Email:</strong> {{ selectedUser.email }}</p>
        <p><strong>Alamat:</strong> {{ selectedUser.address }}</p>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Pengguna"
      hide-footer
      hide-header-close
    >
      <b-form
        @submit.prevent="addUser"
        class="p-3"
        enctype="multipart/form-data"
        style="font-size: 15px"
      >
        <b-form-group
          class="font-nunito mb-3"
          label="Nama lengkap"
          
        >
          <b-form-input
            id="input-1"
            placeholder="Masukkan nama lengkap"
            class="font-nunito"
            
            v-model="newUser.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="font-nunito mb-3"
          label="Nama pengguna"
          
        >
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama pengguna"
            class="font-nunito"
            
            v-model="newUser.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="font-nunito mb-3"
          label="Email"
          
        >
          <b-form-input
            type="email"
            id="input-3"
            
            v-model="newUser.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="font-nunito mb-3" label="Kata sandi">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Masukkan kata sandi"
            class="font-nunito"
            v-model="newUser.password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="font-nunito mb-3"
          label="Alamat"
          
        >
          <b-form-textarea
            id="textarea-2"
            
            v-model="newUser.address"
            class="font-nunito"
            placeholder="Masukkan alamat"
            required
          ></b-form-textarea>
        </b-form-group>
        <div class="justify-content-between d-flex pt-2">
          <b-button
            class="button-secondary border-0"
            @click="showAddModal = false"
            >Cancel</b-button
          >
          <b-button type="submit" class="button-primary border-0"
            >Simpan</b-button
          >
        </div>
      </b-form>
    </b-modal>

    <!-- modal edit -->
    <b-modal
      id="modal-1"
      v-model="showEditModal"
      title="Tambah Pengguna"
      hide-footer
      hide-header-close
      
    >
      <b-form
        @submit.prevent="editUser"
        class="p-3"
        enctype="multipart/form-data"
        style="font-size: 15px"
      >
        <b-form-group
          class="font-nunito mb-3"
          label="Nama lengkap"
          
        >
          <b-form-input
            id="input-1"
            placeholder="Masukkan nama lengkap"
            class="font-nunito"
            v-model="newUser.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="font-nunito mb-3"
          label="Nama pengguna"
          
        >
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama pengguna"
            class="font-nunito"
            v-model="newUser.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="font-nunito mb-3"
          label="Email"
          
        >
          <b-form-input
            type="email"
            id="input-3"
            v-model="newUser.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="font-nunito mb-3"
          label="Alamat"
          
        >
          <b-form-textarea
            id="textarea-2"
            v-model="newUser.address"
            class="font-nunito"
            placeholder="Masukkan alamat"
            required
          ></b-form-textarea>
        </b-form-group>
        <div class="justify-content-between d-flex pt-2">
          <b-button
            class="button-secondary border-0"
            @click="showEditModal = false"
            >Cancel</b-button
          >
          <b-button type="submit" class="button-primary border-0"
            >Simpan</b-button
          >
        </div>
      </b-form>
    </b-modal>
    <FooterBottom />
  </div>
</template>
  
  <script>
import OperatorNavbarVue from "../components/OperatorNavbar.vue";
import FooterBottom from "../components/FooterBottom.vue";
import { endpoints, api } from "../api.js";
export default {
  components: {
    FooterBottom,
    OperatorNavbarVue,
  },
  data() {
    return {
      role: localStorage.getItem("user_role"),
      user_logged: localStorage.getItem("user_id"),
      users: [],
      keyword: "",
      perPage: 5,
      currentPage: 3,
      fields: [
        { key: "id", label: "NO", sortable: true },
        { key: "username", label: "Nama Pengguna" },
        { key: "email", label: "Email", sortable: true },
        { key: "actions", label: "AKSI" },
      ],
      showDetailModal: false,
      selectedUser: null,
      showAddModal: false,
      showEditModal: false,
      newUser: {},
    };
  },
  mounted() {
    this.fetchUsers();
    this.checkRole();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {
      if (this.user_logged == null) {
        this.$router.push("/access-denied");
      }
    },
    checkRole() {
      if (this.role == 2) {
        this.$router.push("/access-denied");
      }
    },
    // fetch data
    setUsers(data) {
      this.users = data.data;
    },
    fetchUsers() {
      api
        .get(endpoints.getUser2)
        .then((response) => {
          this.setUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    searchUser(keyword) {
        api
          .get(endpoints.searchUser, { params: { keyword: keyword } })
          .then((response) => {
            this.setUsers(response.data);
          }).catch(error => {
            console.error(error);
            alert('pencarian tidak ditemukan')
          });
      },

    // detail data
    setDetail(data) {
      this.selectedUser = data.data;
    },
    detailUser(id) {
      api
        .get(endpoints.getUserById(id))
        .then((response) => {
          this.setDetail(response.data);
          this.showDetailModal = true;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal get data");
        });
    },

    addUser() {
      let formData = new FormData();
      for (let key in this.newUser) {
        formData.append(key, this.newUser[key]);
      }
      api
        .post(endpoints.addUser2, formData)
        .then((response) => {
          console.log(response.data);
          this.fetchUsers();
          this.showAddModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal add data");
        });
    },

    openEditModal(user) {
      this.newUser = { ...user };
      this.showEditModal = true;
    },

    editUser() {
      let formData = new FormData();
      for (let key in this.newUser) {
        formData.append(key, this.newUser[key]);
      }
      formData.append("_method", "PUT");
      api
        .post(endpoints.editUser(this.newUser.id), formData)
        .then((response) => {
          console.log(response.data);
          this.fetchUsers();
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal edit data");
        });
    },

    // hapus data
    deleteUser(id) {
      api
        .delete(endpoints.deleteUser(id))
        .then((response) => {
          this.fetchUsers();
        })
        .catch((error) => {
          console.error(error);
          alert("gagal delete data");
        });
    },
  },
};
</script>