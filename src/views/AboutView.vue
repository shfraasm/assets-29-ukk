<template>
  <div class="about-page">
    <MainNavbar />
    <div class="container mt-5 pt-5">
      <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <h2 class="text-center mb-4">Tentang Kami</h2>
          <p>
            Selamat datang di <strong>PustakaPlus</strong>, tempat di mana setiap halaman adalah
            pintu gerbang menuju dunia pengetahuan yang tak terbatas! Kami
            dengan bangga membawa Anda pengalaman membaca online yang
            revolusioner, merangkul Anda dalam petualangan tak terlupakan
            melintasi buku-buku berkualitas tinggi dan sumber daya edukatif.
          </p>
          <p>
            <strong>Kenali Fitur Unggulan Kami:</strong>
          </p>
          <ul>
            <li>
              Pencarian Intuitif: Dengan fitur pencarian yang canggih, temukan
              buku favorit Anda dengan cepat dan mudah. Sinopsis, ulasan, dan
              informasi penting lainnya hanya sejauh genggaman.
            </li>
            <li>
              Koleksi Pribadi: Bangun koleksi pribadi Anda dan jelajahi dunia
              buku yang sesuai dengan minat dan preferensi Anda. Kami memahami
              keunikan setiap pembaca, dan <strong>PustakaPlus</strong> dirancang untuk
              mengakomodasi itu.
            </li>
          </ul>
          <p>
            Mari bergabung bersama kami di <strong>PustakaPlus</strong> untuk menjelajahi dunia
            ilmu, mengeksplorasi kisah-kisah yang menakjubkan, dan memperkaya
            diri Anda melalui bacaan berkualitas.Buka buku, temukan dunia, di <strong>PustakaPlus</strong> - tempatnya
            para pencinta ilmu berkumpul!
          </p>
          <div class="justify-content-center d-flex pb-5">
            <b-button
              href="/dashboard"
              class="btn gradient-btn text-white rounded-4 mb-5 px-5 py-2 mt-3"
              >Mulai Jelajahi</b-button
            >
          </div>
        </div>
      </div>
    </div>
    <MainFooterVue />
  </div>
</template>

<script>
import MainNavbar from "../components/MainNavbar.vue";
import MainFooterVue from "../components/MainFooter.vue";

export default {
  components: {
    MainNavbar,
    MainFooterVue,
  },
};
</script>