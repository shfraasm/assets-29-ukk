<template>
  <div class="pb-4" style="background-color: #dcf2f1">
    <OperatorNavbarVue />
    <div class="container my-5">
      <div class="p-3 alert-custom rounded-3 mb-3">
        <div class="justify-content-between d-flex">
          <p class="mx-2">
            <b-icon-table></b-icon-table><strong> DATA PETUGAS</strong>
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
        :items="operators"
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
              @click="detailOperator(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button
              @click="openEditModal(data.item)"
              class="m-1 btn-sm outline-secondary-custom"
              ><b-icon-pen></b-icon-pen
            ></b-button>
            <b-button
              class="m-1 btn-sm outline-danger-custom"
              @click="deleteOperator(data.item.id)"
              ><b-icon-trash></b-icon-trash
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>

    <!-- modal detail -->
    <b-modal id="modal-1" v-model="showDetailModal" title="Detail petugas">
      <div v-if="selectedOperator">
        <p><strong>Nama Lengkap:</strong> {{ selectedOperator.name }}</p>
        <p><strong>Nama Pengguna:</strong> {{ selectedOperator.username }}</p>
        <p><strong>Email:</strong> {{ selectedOperator.email }}</p>
        <p><strong>Alamat:</strong> {{ selectedOperator.address }}</p>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Petugas"
      hide-footer
    >
      <b-form
        @submit.prevent="addOperator"
        class="p-3"
        enctype="multipart/form-data"
      >
        <b-form-group class="mb-2">
          <b-form-input
            id="input-1"
            placeholder="Masukkan nama lengkap"
            class="font-nunito"
            v-model="newOp.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama pengguna"
            class="font-nunito"
            v-model="newOp.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-2">
          <b-form-input
            type="email"
            id="input-3"
            v-model="newOp.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-2">
          <b-form-input
            id="input-4"
            type="password"
            v-model="newOp.password"
            class="font-nunito"
            placeholder="Masukkan password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-2">
          <b-form-textarea
            id="textarea-2"
            v-model="newOp.address"
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
      title="Edit Petugas"
      hide-footer
    >
      <b-form
        @submit.prevent="editOperator"
        class="p-3"
        enctype="multipart/form-data"
      >
        <b-form-group class="mb-2">
          <b-form-input
            id="input-1"
            class="font-nunito"
            
            placeholder="Masukkan nama lengkap"
            v-model="newOp.name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama pengguna"
            class="font-nunito"
            v-model="newOp.username"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group class="mb-2">
          <b-form-input
            type="email"
            id="input-3"
            v-model="newOp.email"
            class="font-nunito"
            placeholder="Masukkan email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group class="mb-2">
          <b-form-textarea
            id="textarea-2"
            v-model="newOp.address"
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
      operators: [],
      fields: [
        { key: "id", label: "NO", sortable: true },
        { key: "username", label: "Nama Petugas" },
        { key: "email", label: "Email", sortable: true },
        { key: "actions", label: "AKSI" },
      ],
      showDetailModal: false,
      showEditModal: false,
      selectedOperator: null,
      showAddModal: false,
      newOp: {
       
      },
    };
  },
  mounted() {
    this.fetchOperators();
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
    setOperators(data) {
      this.operators = data.data
    },
    fetchOperators() {
      api
        .get(endpoints.getUser1)
        .then((response) => {
          this.setOperators(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    // detail data
    setDetail(data) {
      this.selectedOperator = data.data
    },
    detailOperator(id) {
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

    addOperator() {
      let formData = new FormData();
      for (let key in this.newOp) {
        formData.append(key, this.newOp[key]);
      }
      api
        .post(endpoints.addUser1, formData)
        .then((response) => {
          console.log(response.data);
          this.fetchOperators();
          this.showAddModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal add data");
        });
    },

    openEditModal(op){
      this.newOp = {...op}
      this.showEditModal = true
    },

    editOperator() {
      let formData = new FormData();
      for (let key in this.newOp) {
        formData.append(key, this.newOp[key]);
      }
      formData.append("_method", "PUT")
      api
        .post(endpoints.editUser(this.newOp.id), formData)
        .then((response) => {
          console.log(response.data);
          this.fetchOperators();
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal edit data");
        });
    },

    // hapus data
    deleteOperator(id) {
      api
        .delete(endpoints.deleteUser(id))
        .then((response) => {
          this.fetchOperators();
        })
        .catch((error) => {
          console.error(error);
          alert("gagal delete data");
        });
    },
  },
};
</script>