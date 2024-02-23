<template>
  <div
    class="pb-5 vh-100"
    style="background-color: #dcf2f1; height: fit-content !important"
  >
    <operatorNavbarVue />
    <div class="container my-5">
      <div class="p-3 alert-custom rounded-3 mb-3">
        <div class="justify-content-between d-flex">
          <p class="mx-2">
            <b-icon-table></b-icon-table><strong> DATA PEMINJAMAN</strong>
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
              @input="searchBorrow(keyword)"
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
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        hover
        bordered
        :per-page="perPage"
      :current-page="currentPage"
        class="custom-table"
        :items="borrows"
        :fields="fields"
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(book_photo)="data">
          <img
            :src="data.item.book_photo"
            alt="book"
            style="max-width: 120px; max-height: 170px"
            class="w-100"
          />
        </template>

        <template #cell(actions)="data">
          <div class="">
            <!-- <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailBorrow(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button> -->
            <b-button
            v-if="data.item.status == 'Dipinjam'"
              class="m-1 btn-sm outline-primary-custom"
              :to="{
                name: 'borrows-print',
                params: { id: data.item.id },
              }"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button
              v-if="data.item.status == 'Dipinjam'"
              class="m-1 btn-sm outline-secondary-custom"
              @click="openEditModal(data.item)"
              ><b-icon-pen></b-icon-pen
            ></b-button>
            <b-button
              class="m-1 btn-sm outline-danger-custom"
              @click="deleteBorrow(data.item.id)"
              ><b-icon-trash></b-icon-trash
            ></b-button>
          </div>
        </template>

        <template #cell(status)="data">
          <span
            class="badge badge-status rounded-4 px-3 py-2 mb-3 mx-3"
            v-if="data.item.status === 'Dipinjam'"
            >Sedang Dipinjam</span
          >
          <span
            class="badge badge-status-2 rounded-4 px-3 py-2 mb-3 mx-3"
            v-if="data.item.status === 'Dikembalikan'"
            >Sudah Dikembalikan</span
          >
        </template>
      </b-table>
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="borrows.length"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>

    <!-- modal detail -->
    <b-modal
      id="modal-1"
      v-model="showDetailModal"
      title="Detail Peminjaman"
      hide-footer
      hide-header-close
    >
      <div v-if="selectedBorrow">
        <p class="my-4">
          <strong>Nama Peminjam: </strong>{{ selectedBorrow.user_name }}
        </p>
        <p class="my-4">
          <strong>Buku yang dipinjam: </strong>{{ selectedBorrow.book_name }}
        </p>
        <p class="my-4">
          <strong>Jumlah: </strong>{{ selectedBorrow.quantity }}
        </p>
        <p class="my-4">
          <strong>Alamat Peminjam: </strong>{{ selectedBorrow.user_address }}
        </p>
        <p class="my-4">
          <strong>Tanggal pinjam: </strong>{{ selectedBorrow.start_date }}
        </p>
        <p class="my-4">
          <strong>Tanggal pengembalian: </strong>{{ selectedBorrow.end_date }}
        </p>
        <div class="justify-content-end d-flex">
          <b-button
            class="rounded-3 gradient-btn mx-2"
            :to="{
              name: 'borrows-print',
              params: { id: selectedBorrow.id },
            }"
            ><b-icon-download></b-icon-download> Print</b-button
          >
        </div>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Peminjaman"
      hide-footer
      hide-header-close
    >
      <b-form @submit.prevent="addBorrow" class="mx-3">
        <!-- name -->
        <label for="" class="font-nunito mb-2" style="font-size: 15px"
          >Pilih nama peminjam</label
        >
        <select
          style="font-size: 15px"
          class="form-select mb-3 font-nunito"
          v-model="newBorrow.user_id"
          aria-label="Default select example"
          placeholder="Pilih nama peminjam"
        >
          <option selected>Pilih nama peminjam</option>
          <option v-for="user in users" :value="user.id">
            {{ user.name }}
          </option>
        </select>

        <!-- book -->
        <label for="" class="font-nunito mb-2" style="font-size: 15px"
          >Pilih buku</label
        >
        <select
          class="form-select mb-3 font-nunito"
          style="font-size: 15px"
          v-model="newBorrow.book_id"
          aria-label="Default select example"
          placeholder="Pilih nama peminjam"
        >
          <option selected>Pilih buku</option>
          <option v-for="book in books" :value="book.id">
            {{ book.name }}
          </option>
        </select>

        <!-- quantity -->
        <b-form-group
          class="font-nunito mb-2"
          label="Jumlah"
          style="font-size: 15px"
        >
          <b-form-input
            type="number"
            min="1"
            max="10"
            v-model="newBorrow.quantity"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="font-nunito mb-2"
          label="Tanggal pinjam"
          style="font-size: 15px"
        >
          <b-form-input
            placeholder="Jumlah Buku"
            type="date"
            v-model="newBorrow.start_date"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="font-nunito mb-"
          label="Tanggal kembali"
          style="font-size: 15px"
        >
          <b-form-input
            placeholder="Jumlah Buku"
            type="date"
            v-model="newBorrow.end_date"
            required
          ></b-form-input>
        </b-form-group>
        <div class="justify-content-between d-flex mt-4">
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
      title="Edit Peminjaman"
      hide-footer
      hide-header-close
    >
      <b-form @submit.prevent="editBorrow" class="mx-3">
        <label for="" class="font-nunito mb-2" style="font-size: 15px"
          >Pilih nama peminjam</label
        >
        <select
          class="form-select mb-3 font-nunito"
          v-model="newBorrow.user_id"
          aria-label="Default select example"
          style="font-size: 15px"
        >
          <option v-for="user in users" :value="user.id">
            {{ user.name }}
          </option>
        </select>


        <label for="" class="font-nunito mb-2" style="font-size: 15px"
          >Pilih buku</label
        >
        <select
          class="form-select mb-3 font-nunito"
          v-model="newBorrow.book_id"
          aria-label="Default select example"
          style="font-size: 15px"
        >
          <option v-for="book in books" :value="book.id">
            {{ book.name }}
          </option>
        </select>
        <b-form-group class="mb-2 font-nunito" label="Jumlah" style="font-size: 15px">
          <b-form-input
            style="font-size: 15px"
            type="number"
            class="font-nunito"
            min="1"
            max="10"
            v-model="newBorrow.quantity"
            
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="font-nunito mb-2 mt-3"
          label="Tanggal pinjam"
          style="font-size: 15px"
        >
          <b-form-input
            type="date"
            class="font-nunito"
            v-model="newBorrow.start_date"
            placeholder="Jumlah Buku"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          class="font-nunito mb-2 mt-3"
          label="Tanggal kembali"
          style="font-size: 15px"
        >
          <b-form-input
            type="date"
            class="font-nunito"
            v-model="newBorrow.end_date"
            placeholder="Jumlah Buku"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          v-slot="{ ariaDescribedby }"
          class="mt-3"
          style="font-size: 15px"
        >
          <b-form-radio
            v-model="newBorrow.status"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            class="font-nunito"
            value="Dipinjam"
            >Dipinjam</b-form-radio
          >
          <b-form-radio
            class="font-nunito"
            v-model="newBorrow.status"
            :aria-describedby="ariaDescribedby"
            name="some-radios"
            value="Dikembalikan"
            >Dikembalikan</b-form-radio
          >
        </b-form-group>
        <div class="justify-content-between d-flex mt-4">
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

    <FooterBottom />
  </div>
</template>

<script>
import operatorNavbarVue from "../components/OperatorNavbar.vue";
import FooterBottom from "../components/FooterBottom.vue";
import { endpoints, api } from "../api.js";
export default {
  components: {
    FooterBottom,
    operatorNavbarVue,
  },
  data() {
    return {
      role: localStorage.getItem("user_role"),
      user_logged: localStorage.getItem("user_id"),
      fields: [
        {
          key: "id",
          label: "NO",
          sortable: true,
        },
        {
          key: "user_name",
          label: "Nama peminjam",
          sortable: true,
        },
        {
          key: "book_photo",
          label: "Buku",
          sortable: true,
        },
        {
          key: "quantity",
          label: "Jumlah",
          sortable: true,
        },
        {
          key: "status",
          label: "Status",
          sortable: true,
        },
        {
          key: "actions",
          label: "Aksi",
        },
      ],
      borrows: [],
      users: [],
      books: [],
      keyword: "",
      perPage: 3,
      currentPage: 3,
      showDetailModal: false,
      showAddModal: false,
      showEditModal: false,
      selectedBorrow: null,

      newBorrow: {},
    };
  },

  mounted() {
    this.fetchBorrow();
    this.fetchBookOption();
    this.fetchUserOption();
    this.checkUserLogin();
    this.checkRole();
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

    setBorrow(data) {
      this.borrows = data.data;
    },
    fetchBorrow() {
      api
        .get(endpoints.getBorrows)
        .then((response) => {
          this.setBorrow(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    searchBorrow(keyword) {
      api
        .get(endpoints.searchBorrow, { params: { keyword: keyword } })
        .then((response) => {
          this.setBorrow(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("pencarian tidak ditemukan");
        });
    },

    addBorrow() {
      let formData = new FormData();
      for (let key in this.newBorrow) {
        formData.append(key, this.newBorrow[key]);
      }
      api
        .post(endpoints.addBorrow, formData)
        .then((response) => {
          console.log(response.data);
          this.fetchBorrow();
          this.showAddModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    fetchBookOption() {
      api
        .get(endpoints.getBooks)
        .then((response) => {
          this.books = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    fetchUserOption() {
      api
        .get(endpoints.getUser2)
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    setDetail(data) {
      this.selectedBorrow = data.data;
    },

    detailBorrow(id) {
      api
        .get(endpoints.getBorrowById(id))
        .then((response) => {
          this.setDetail(response.data);
          this.showDetailModal = true;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal get data");
        });
    },

    openEditModal(borrow) {
      this.newBorrow = { ...borrow };
      this.showEditModal = true;
    },

    editBorrow() {
      let formData = new FormData();
      for (let key in this.newBorrow) {
        formData.append(key, this.newBorrow[key]);
      }
      formData.append("_method", "PUT");
      api
        .post(endpoints.editBorrow(this.newBorrow.id), formData)
        .then((response) => {
          console.log(response.data);
          this.fetchBorrow();
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal edit data");
        });
    },

    deleteBorrow(id) {
      api
        .delete(endpoints.deleteBorrow(id))
        .then((response) => {
          this.fetchBorrow();
        })
        .catch((error) => {
          console.error(error);
          alert("gagal delete data");
        });
    },
  },
};
</script>