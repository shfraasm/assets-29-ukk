<template>
  <div class="vh-100">
    <div class="container py-5 px-5 justify-content-center d-flex">
      <div
        class="container px-2 py-3 mt-5"
        style="width: 600px"
        v-if="selectedBorrow"
      >
        <div class="">
          <div class="align-items-center">
            <img src="@/assets/logo-3.png" alt="" style="width: 170px" />
          </div>
          <hr />
        </div>
        <div class="mx-2 mt-3 justify-content-between d-flex">
          <h6>Peminjaman atas nama:</h6>
          <p>{{selectedBorrow.user_name}}</p>
        </div>
        <div class="mx-2 justify-content-between d-flex">
          <h6>Nama Buku:</h6>
          <p>{{selectedBorrow.book_name}}</p>
        </div>
        <div class="mx-2 justify-content-between d-flex">
          <h6>Jumlah:</h6>
          <p>{{selectedBorrow.quantity}}x</p>
        </div>
        <hr />
        <div class="mx-2 justify-content-between d-flex">
          <h6>Tanggal pinjam:</h6>
          <p>{{selectedBorrow.start_date}}</p>
        </div>
        <div class="mx-2 justify-content-between d-flex">
          <h6>Tanggal kembali:</h6>
          <p>{{selectedBorrow.end_date}}</p>
        </div>
        <div class="mx-2 mt-5 justify-content-end d-flex">
          <b-button class="gradient-btn" @click="printBorrow">
            <b-icon-download></b-icon-download>
          </b-button>
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
      selectedBorrow: null,
    };
  },

  mounted() {
    this.detailBorrow();
  },

  methods: {
    setDetail(data) {
      this.selectedBorrow = data.data;
    },

    detailBorrow() {
      const id = this.$route.params.id
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

    printBorrow(){
      window.print()
    }
  },
};
</script>

<style scoped>
h6 {
  font-family: "Jost", sans-serif !important;
  color: #2b3a55 !important;
}

p {
  font-size: 15px;
}
</style>