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
      <b-table
        bordered
        hover
        class="custom-table rounded-3"
        :items="users"
        :fields="fields"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(actions)="data">
          <div class="my-1">
            <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailUser(data.item.id)"
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
    </div>

    <!-- modal detail -->
    <b-modal id="modal-1" v-model="showDetailModal" title="Detail pengguna">
      <div v-if="selectedUser">
        <p><strong>Nama Lengkap:</strong> shafira maudyna</p>
        <p><strong>Nama Pengguna:</strong> peminjam_1</p>
        <p><strong>Email:</strong> shafira@gmail.com</p>
        <p>
          <strong>Alamat:</strong> Lorem ipsum dolor sit amet consectetur
          adipisicing.
        </p>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Pengguna"
      hide-footer
    >
      <b-form
        @submit.prevent="addUser"
        class="p-3"
        enctype="multipart/form-data"
      >
        <!-- name -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama lengkap"
            v-model="newUser.name"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- description -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan pengguna"
            v-model="newUser.username"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- remaining_stok -->
        <b-form-group class="mb-2">
          <b-form-input
            type="email"
            id="input-2"
            v-model="newUser.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- author -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            type="password"
            v-model="newUser.password"
            class="font-nunito"
            placeholder="Masukkan password"
            required
          ></b-form-input>
        </b-form-group>

        <!-- publisher -->
        <b-form-group class="mb-2">
          <b-form-textarea
            id="textarea-2"
            v-model="newUser.address"
            class="font-nunito"
            placeholder="Masukkan alamat"
            required
          ></b-form-textarea>
        </b-form-group>
        <!-- published_year -->
        <div class="justify-content-between d-flex pt-2">
          <b-button
            type="reset"
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
      title="Edit Pengguna"
      hide-footer
    >
      <b-form
        @submit.prevent="editUser"
        class="p-3"
        enctype="multipart/form-data"
      >
        <!-- name -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama lengkap"
            v-model="newUser.name"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>
        <!-- description -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan pengguna"
            v-model="newUser.username"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- remaining_stok -->
        <b-form-group class="mb-2">
          <b-form-input
            type="email"
            id="input-2"
            v-model="newUser.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <!-- publisher -->
        <b-form-group class="mb-2">
          <b-form-textarea
            id="textarea-2"
            v-model="newUser.address"
            class="font-nunito"
            placeholder="Masukkan alamat"
            required
          ></b-form-textarea>
        </b-form-group>
        <!-- published_year -->
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
export default {
  components: {
    FooterBottom,
    OperatorNavbarVue,
  },
  data() {
    return {
      role: "",
      users: [],
      fields: [
        { key: "id", label: "NO", sortable: true },
        { key: "username", label: "Nama Pengguna" },
        { key: "email", label: "Email", sortable: true },
        { key: "actions", label: "AKSI" },
      ],
      showDetailModal: false,
      selectedUser: null,
      showAddModal: false,
      newUser: {
        name: "",
        username: "",
        email: "",
        roles: 2,
        password: "",
        address: "",
      },
      user_logged: "",
    };
  },
  mounted() {
    this.fetchUsers();
    this.checkRole();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},
    checkRole() {},
    // fetch data
    setUsers(data) {},
    fetchUsers() {},

    // detail data
    setDetail(data) {},
    detailUser(id) {},

    addUser() {},

    openEditModal(user) {
      this.newUser = { ...user };
      this.showEditModal = true;
    },

    editUser() {},

    // hapus data
    deleteUser(id) {},
  },
};
</script>