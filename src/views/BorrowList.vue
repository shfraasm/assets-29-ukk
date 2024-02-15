<template>
  <div class="pb-5 vh-100" style="background-color: #dcf2f1">
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
      <b-table
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
        hover
        bordered
        class="custom-table"
        :items="borrows"
        :fields="fields"
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(actions)="data">
          <div class="">
            <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailBorrow(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button class="m-1 btn-sm outline-secondary-custom"
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
            v-if="data.item.status === 'dipinjam'"
            >Sedang Dipinjam</span
          >
          <span
            class="badge badge-status-2 rounded-4 px-3 py-2 mb-3 mx-3"
            v-if="data.item.status === 'dikembalikan'"
            >Sudah Dikembalikan</span
          >
        </template>
      </b-table>
    </div>
    <b-modal id="modal-1" v-model="showDetailModal" title="Detail Peminjaman" hide-footer hide-header-close>
      <div v-if="selectedBorrow">
        <p class="my-4"><strong>Nama Peminjam: </strong>peminjam_1</p>
        <p class="my-4"><strong>Buku yang dipinjam: </strong>Nama Buku</p>
        <p class="my-4"><strong>Jumlah: </strong>4</p>
        <p class="my-4">
          <strong>Alamat Peminjam: </strong>Lorem ipsum dolor, sit amet
          consectetur adipisicing.
        </p>
        <p class="my-4"><strong>Tanggal pinjam: </strong>2023-12-10</p>
        <p class="my-4"><strong>Tanggal pengembalian: </strong>2023-12-12</p>
        <div class="justify-content-end d-flex">
          <b-button class="rounded-3 gradient-btn mx-2" @click="printData"
            ><b-icon-download></b-icon-download> Print</b-button
          >
        </div>
      </div>
    </b-modal>
    <b-modal id="modal-1" v-model="showAddModal" title="Tambah Peminjaman">
      <b-form @submit.prevent="addBorrow">
        <b-form-group class="mb-2">
          <b-form-textarea
            id="textarea-2"
            v-model="newBorrow.user_id"
            placeholder="Pilihlah nama pengguna"
            required
          ></b-form-textarea>
        </b-form-group>
      </b-form>
    </b-modal>
    <FooterBottom />
  </div>
</template>

<script>
import operatorNavbarVue from "../components/OperatorNavbar.vue";
import FooterBottom from "../components/FooterBottom.vue";
export default {
  components: {
    FooterBottom,
    operatorNavbarVue,
  },
  data() {
    return {
      role: "",
      user_logged: "",
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
          key: "book_name",
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
      showDetailModal: false,
      showAddModal: false,
      selectedBorrow: null,

      newBorrow: {
        user_id: "",
        book_id: "",
        quantity: "",
        start_date: "",
        end_date: "",
        status: "dipinjam",
      },
    };
  },

  mounted() {
    this.fetchBorrow();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},

    printData() {},

    setBorrow(data) {},
    fetchBorrow() {},

    addBorrow() {},

    setDetail(data) {},

    detailBorrow(id) {},

    deleteBorrow(id) {},
  },
};
</script>