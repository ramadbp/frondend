import { createRouter, createWebHistory } from "vue-router";
import DaftarAlatView from "@/views/DaftarAlatView.vue";
import HomeView from "../views/HomeView.vue";
import pemesanan from "../views/pemesanan.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/alat", component: DaftarAlatView },
  { path: "/pesan", component: pemesanan },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
