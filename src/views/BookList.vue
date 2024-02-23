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

      <div class="justify-content-end d-flex">
        <div class="">
          <b-input-group class="mb-2">
            <b-form-input
              class="font-nunito mb-2"
              prepend="cari"
              style="max-width: 300px"
              placeholder="Masukkan Kata Kunci"
              v-model="keyword"
              @input="searchBooks(keyword)"
            ></b-form-input>
            <b-input-group-append>
              <b-button
                class="gradient-btn border-0"
                style="
                  border-bottom-left-radius: 0%;
                  border-top-left-radius: 0%;
                "
              >
                <b-icon icon="search" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>

      <b-table
        class="custom-table"
        :items="books"
        hover
        :per-page="perPage"
      :current-page="currentPage"
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
            <!-- <b-button
              class="m-1 btn-sm outline-primary-custom"
              @click="detailBook(data.item.id)"
              ><b-icon-eye></b-icon-eye
            ></b-button> -->
            <b-button
              class="m-1 btn-sm outline-primary-custom"
              :to="{
                name: 'detail-book',
                params: { id: data.item.id },
              }"
              ><b-icon-eye></b-icon-eye
            ></b-button>
            <b-button
              class="m-1 btn-sm outline-secondary-custom"
              @click="openEditModal(data.item)"
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

      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>

    <!-- modal detail -->
    <b-modal
      id="modal-1"
      v-model="showDetailModal"
      title="Detail Buku"
      hide-header-close
      scrollable
    >
      <div v-if="selectedBook">
        <p><strong>Nama:</strong> {{ selectedBook.name }}</p>
        <p><strong>Sinopsis:</strong> {{ selectedBook.description }}</p>
        <p><strong>Rating:</strong> {{ selectedBook.total_rating }}</p>
        <p><strong>Stok:</strong> {{ selectedBook.remaining_stock }}</p>
        <p><strong>Genre:</strong> {{ selectedBook.category }}</p>
        <p><strong>Penulis:</strong> {{ selectedBook.author }}</p>
        <p><strong>Penerbit:</strong> {{ selectedBook.publisher }}</p>
        <p><strong>Tahun Rilis:</strong> {{ selectedBook.published_year }}</p>
      </div>
    </b-modal>

    <!-- modal tambah -->
    <b-modal
      id="modal-1"
      v-model="showAddModal"
      title="Tambah Buku"
      hide-footer
      size="lg"
      hide-header-close
    >
      <b-form
        @submit.prevent="addBook"
        class="p-3"
        enctype="multipart/form-data"
        style="font-size: 15px"
      >
        <!-- name -->
        <b-form-group
          class="font-nunito mb-3"
          label="Judul"
          
        >
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama buku"
            v-model="newBook.name"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- description -->
        <b-form-group
          class="font-nunito mb-3"
          label="Sinopsis"
          
        >
          <b-form-textarea
            id="input-2"
            rows="6"
            max-rows="9"
            placeholder="Masukkan sinopsis"
            v-model="newBook.description"
            class="font-nunito"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- photo -->
        <label for="" class="font-nunito mb-1" 
          >Cover buku</label
        >
        <div class="mb-3">
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="handleFileChange"
          />
        </div>

        <b-form-group
          v-slot="{ ariaDescribedby }"
          class="font-nunito mb-3"
          label="Kategori"
          
        >
          <b-form-radio
            v-model="newBook.category"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
            size="sm"
            value="Fiksi"
            class="font-nunito"
            >Fiksi</b-form-radio
          >
          <b-form-radio
            v-model="newBook.category"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
            class="font-nunito mb-2"
            size="sm"
            value="Nonfiksi"
            >Nonfiksi</b-form-radio
          >
        </b-form-group>

        <!-- remaining_stok -->
        <b-form-group
          class="font-nunito mb-3"
          label="Jumlah stok"
          
        >
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
        <b-form-group
          class="font-nunito mb-3"
          label="Penulis"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.author"
            class="font-nunito"
            placeholder="Masukkan nama penulis"
            required
          ></b-form-input>
        </b-form-group>

        <!-- publisher -->
        <b-form-group
          class="font-nunito mb-3"
          label="Penerbit"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.publisher"
            class="font-nunito"
            placeholder="Masukkan nama penerbit"
            required
          ></b-form-input>
        </b-form-group>

        <!-- published_year -->
        <b-form-group
          class="font-nunito mb-3"
          label="Tahun terbit"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.published_year"
            class="font-nunito"
            placeholder="Masukkan tahun terbit"
            type="number"
            min="1990"
            max="2024"
            required
          ></b-form-input>
        </b-form-group>
        <div class="justify-content-between d-flex">
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
      title="Tambah Buku"
      hide-footer
      size="lg"
      hide-header-close
    >
      <b-form
        @submit.prevent="editBook"
        class="p-3"
        enctype="multipart/form-data"
        style="font-size: 15px"
      >
        <!-- name -->
        <b-form-group
          class="font-nunito mb-3"
          label="Judul"
          
        >
          <b-form-input
            id="input-2"
            placeholder="Masukkan nama buku"
            v-model="newBook.name"
            class="font-nunito"
            required
          ></b-form-input>
        </b-form-group>

        <!-- description -->
        <b-form-group
          class="font-nunito mb-3"
          label="Sinopsis"
          
        >
          <b-form-textarea
            id="input-2"
            rows="6"
            max-rows="9"
            placeholder="Masukkan sinopsis"
            v-model="newBook.description"
            class="font-nunito"
            required
          ></b-form-textarea>
        </b-form-group>

        <!-- photo -->
        <label for="" class="font-nunito mb-1" 
          >Cover buku</label
        >
        <div class="mb-3">
          <input
            class="form-control"
            type="file"
            id="formFile"
            @change="handleFileChange"
          />
        </div>

        <b-form-group
          v-slot="{ ariaDescribedby }"
          class="font-nunito mb-3"
          label="Kategori"
          
        >
          <b-form-radio
            v-model="newBook.category"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
            size="sm"
            value="Fiksi"
            class="font-nunito"
            >Fiksi</b-form-radio
          >
          <b-form-radio
            v-model="newBook.category"
            :aria-describedby="ariaDescribedby"
            name="radio-inline"
            class="font-nunito mb-2"
            size="sm"
            value="Nonfiksi"
            >Nonfiksi</b-form-radio
          >
        </b-form-group>

        <!-- remaining_stok -->
        <b-form-group
          class="font-nunito mb-3"
          label="Jumlah stok"
          
        >
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
        <b-form-group
          class="font-nunito mb-3"
          label="Penulis"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.author"
            class="font-nunito"
            placeholder="Masukkan nama penulis"
            required
          ></b-form-input>
        </b-form-group>

        <!-- publisher -->
        <b-form-group
          class="font-nunito mb-3"
          label="Penerbit"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.publisher"
            class="font-nunito"
            placeholder="Masukkan nama penerbit"
            required
          ></b-form-input>
        </b-form-group>

        <!-- published_year -->
        <b-form-group
          class="font-nunito mb-3"
          label="Tahun terbit"
          
        >
          <b-form-input
            id="input-2"
            v-model="newBook.published_year"
            class="font-nunito"
            placeholder="Masukkan tahun terbit"
            type="number"
            min="1990"
            max="2024"
            required
          ></b-form-input>
        </b-form-group>
        <div class="justify-content-between d-flex">
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
    <div class="mt-5"></div>
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
      books: [],
      role: localStorage.getItem("user_role"),
      fields: [
        { key: "id", label: "NO", sortable: true },
        { key: "photo", label: "Cover Buku" },
        { key: "name", label: "Nama buku", sortable: true },
        { key: "category", label: "Kategori", sortable: true },
        { key: "remaining_stock", label: "Stok", sortable: true },
        { key: "actions", label: "AKSI" },
      ],
      showDetailModal: false,
      selectedBook: null,
      showAddModal: false,
      showEditModal: false,
      keyword: "",
      perPage: 3,
      currentPage: 1,
      newBook: {},
      user_logged: localStorage.getItem("user_id"),
    };
  },
  mounted() {
    this.fetchBooks();
    this.checkRole();
    this.checkUserLogin();
  },

  computed: {
      rows() {
        return this.books.length
      }
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
    setBooks(data) {
      this.books = data.data;
    },
    fetchBooks() {
      api
        .get(endpoints.getBooks)
        .then((response) => {
          this.setBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    searchBooks(keyword) {
      api
        .get(endpoints.searchBook, { params: { keyword: keyword } })
        .then((response) => {
          this.setBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
          alert("pencarian tidak ditemukan");
        });
    },

    // detail data
    setDetail(data) {
      this.selectedBook = data.data;
    },
    detailBook(id) {
      api
        .get(endpoints.getBookById(id))
        .then((response) => {
          console.log(response);
          this.setDetail(response.data);
          this.showDetailModal = true;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    // tambah data
    handleFileChange(event) {
      const selectedFile = event.target.files[0];
      this.newBook.photo = selectedFile;
    },

    addBook() {
      let formData = new FormData();
      for (let key in this.newBook) {
        formData.append(key, this.newBook[key]);
      }
      api
        .post(endpoints.addBook, formData)
        .then((response) => {
          console.log(response.data);
          this.fetchBooks();
          this.showAddModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    openEditModal(book) {
      this.newBook = { ...book };
      this.showEditModal = true;
    },

    editBook() {
      let formData = new FormData();
      for (let key in this.newBook) {
        formData.append(key, this.newBook[key]);
      }

      formData.append("_method", "PUT");
      api
        .post(endpoints.editBook(this.newBook.id), formData)
        .then((response) => {
          console.log(response.data);
          this.fetchBooks();
          this.showEditModal = false;
        })
        .catch((error) => {
          console.error(error);
          alert("gagal fetch data");
        });
    },

    // hapus data
    deleteBook(id) {
      api
        .delete(endpoints.deleteBook(id))
        .then((response) => {
          this.fetchBooks();
        })
        .catch((error) => {
          console.error(error);
          alert("gagal delete data");
        });
    },
  },
};
</script>