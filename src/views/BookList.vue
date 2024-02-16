<template>
  <div class="pb-4" style="background-color: #dcf2f1">
    <OperatorNavbarVue />
    <div class="container my-5">
      <div class="p-3 alert-custom rounded-3 mb-3">
        <div class="justify-content-between d-flex">
          <p class="mx-2">
            <b-icon-table></b-icon-table><strong> DATA BUKU</strong>
          </p>
          <b-button
            class="rounded-3 gradient-btn mx-2"
            @click="showAddModal = true"
            ><b-icon-plus></b-icon-plus> Tambah</b-button
          >
        </div>
      </div>
      <b-table
        class="custom-table"
        :items="books"
        hover
        bordered
        :fields="fields"
        label-sort-asc=""
        label-sort-desc=""
        label-sort-clear=""
      >
        <template #cell(id)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(photo)="data">
          <img
            :src="data.item.photo"
            alt="book"
            style="max-width: 120px; max-height: 170px"
            class="w-100"
          />
        </template>

        <template #cell(actions)="data">
          <div class="my-1">
            <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailBook(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button class="m-1 btn-sm outline-secondary-custom"
              ><b-icon-pen></b-icon-pen
            ></b-button>
            <b-button
              class="m-1 btn-sm outline-danger-custom"
              @click="deleteBook(data.item.id)"
              ><b-icon-trash></b-icon-trash
            ></b-button>
          </div>
        </template>
      </b-table>
    </div>

    <!-- modal detail -->
    <b-modal id="modal-1" v-model="showDetailModal" title="Detail Buku">
      <div v-if="selectedBook">
        <p><strong>Nama:</strong> nama buku</p>
        <p>
          <strong>Sinopsis:</strong> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Reiciendis, expedita?
        </p>
        <p><strong>Rating:</strong> 4.6</p>
        <p><strong>Stok:</strong> 20</p>
        <p><strong>Genre:</strong> nonfiksi</p>
        <p><strong>Penulis:</strong> shafira</p>
        <p><strong>Penerbit:</strong> Gramedia</p>
        <p><strong>Tahun Rilis:</strong> 2023</p>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Buku"
      hide-footer
    >
      <b-form
        @submit.prevent="addBook"
        class="p-3"
        enctype="multipart/form-data"
      >
        <!-- name -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama buku"
            v-model="newBook.name"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- description -->
        <b-form-group class="mb-2">
          <b-form-textarea
            id="input-2"
            placeholder="Masukkan sinopsis"
            v-model="newBook.description"
            class="font-nunito"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- book_category_id -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            placeholder="Masukkan genre"
            v-model="newBook.book_category_id"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- photo -->
        <b-form-file
          v-model="newBook.photo"
          class="mb-2"
          drop-placeholder="Drop file here..."
          @change="handleFileChange"
        ></b-form-file>

        <!-- remaining_stok -->
        <b-form-group class="mb-2">
          <b-form-input
            type="number"
            id="input-2"
            v-model="newBook.remaining_stock"
            class="font-nunito"
            placeholder="Masukkan jumlah stok"
            required
          ></b-form-input>
        </b-form-group>

        <!-- author -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            v-model="newBook.author"
            class="font-nunito"
            placeholder="Masukkan nama penulis"
            required
          ></b-form-input>
        </b-form-group>

        <!-- publisher -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            v-model="newBook.publisher"
            class="font-nunito"
            placeholder="Masukkan nama penerbit"
            required
          ></b-form-input>
        </b-form-group>
        <!-- published_year -->
        <b-form-group class="mb-2">
          <b-form-input
            id="input-2"
            v-model="newBook.published_year"
            class="font-nunito"
            placeholder="Masukkan tahun rilis"
            type="number"
            min="1990"
            max="2024"
            required
          ></b-form-input>
        </b-form-group>
        <div class="justify-content-between d-flex">
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
    <div class="mt-5"></div>
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
      books: [],
      role: "",
      fields: [
        { key: "id", label: "NO", sortable: true },
        { key: "name", label: "Nama buku", sortable: true },
        { key: "photo", label: "Cover Buku" },
        { key: "category", label: "Genre", sortable: true },
        { key: "remaining_stock", label: "Stok", sortable: true },
        { key: "actions", label: "AKSI" },
      ],
      showDetailModal: false,
      selectedBook: null,
      showAddModal: false,
      newBook: {
      },
      user_logged: "",
    };
  },
  mounted() {
    this.fetchBooks();
    this.checkRole();
    this.checkUserLogin();
  },

  methods: {
    checkUserLogin() {},

    checkRole() {},
    
    // fetch data
    setBooks(data) {},
    fetchBooks() {},

    // detail data
    setDetail(data) {},
    detailBook(id) {},

    // tambah data
    handleFileChange(event) {},

    addBook() {},

    // hapus data
    deleteBook(id) {},
  },
};
</script>