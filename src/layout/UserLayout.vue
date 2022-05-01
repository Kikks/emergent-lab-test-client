<script>
import { useRouter } from "vue-router";
import SideNav from "../components/SideNav.vue";
import TopNav from "../components/TopNav.vue";
import jwtDecode from "jwt-decode";

export default {
  components: {
    TopNav,
    SideNav,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();

    const token = localStorage.getItem("token");

    if (!token) {
      this.router.push("/auth/login");
    }
    const decodedToken = jwtDecode(token);

    if (!decodedToken?.exp) {
      this.router.push("/auth/login");
    }

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.router.push("/auth/login");
    }
  },
  data() {
    return {
      sideNav: false,
    };
  },
  methods: {
    toggleSideNav() {
      this.sideNav = !this.sideNav;
    },
    checkScreen() {
      if (window.innerWidth > 768) {
        this.sideNav = true;
      } else {
        this.sideNav = false;
      }
    },
  },
};
</script>

<template>
  <div class="w-full flex flex-col h-[100vh] overflow-y-hidden">
    <TopNav :toggleSideNav="toggleSideNav" />

    <div class="flex-1 h-full flex relative">
      <div
        :class="`z-10 top-0 left-0 absolute h-full w-full bg-black/20 ${
          sideNav ? 'block' : 'hidden'
        }
        transition-all duration-200 md:hidden`"
      />
      <SideNav :open="sideNav" />

      <main class="w-full h-full overflow-y-auto flex flex-col bg-[#f6f8f8]">
        <slot></slot>
      </main>
    </div>
  </div>
</template>

<style scoped>
.left-side {
  background: url(../assets/images/auth-bg.png) center center;
  background-size: cover;
}
</style>
