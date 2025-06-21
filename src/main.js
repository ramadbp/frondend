import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS Bootstrap dimain
import "bootstrap"; // (Optional: Import JS Bootstrap, jika butuh komponen interaktif)

createApp(App).use(router).mount("#app");
