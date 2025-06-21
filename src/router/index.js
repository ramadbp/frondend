import { createRouter, createWebHistory } from "vue-router";
import DaftarAlatView from "@/views/DaftarAlatView.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/alat", component: DaftarAlatView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
