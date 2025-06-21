<template>
  <div>
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import Navbar from "./components/AppNavbar.vue";
import Footer from "./components/AppFooter.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
