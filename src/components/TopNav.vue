<script>
import { useRouter } from "vue-router";

export default {
  props: ["toggleSideNav"],
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggleOpen() {
      this.open = !this.open;
    },
    logout() {
      localStorage.clear("token");
      localStorage.clear("user");
      this.router.push("/auth/login");
    },
  },
  setup() {
    const router = useRouter();
    const userData = localStorage.getItem("user");
    return { router, userData: JSON.parse(userData) };
  },
};
</script>

<template>
  <nav class="bg-white p-3 flex items-center justify-between">
    <figure class="aspect-[38/11] w-[12vw] min-w-[120px] max-w-[250px]">
      <img src="../assets/images/logo.png" class="h-full w-full object-cover" />
    </figure>

    <div class="hidden md:block mr-5 relative">
      <div
        class="w-full flex items-center gap-3"
        role="button"
        @click="toggleOpen()"
      >
        <div class="h-10 w-10 rounded-full bg-[#6A7E8A]" />

        <span>{{ `Hi, ${userData?.fullName || ""}` }}</span>

        <span class="material-symbols-outlined"> arrow_drop_down </span>
      </div>

      <div
        role="button"
        @click="logout()"
        v-show="open"
        class="z-20 absolute top-[100%] right-0 w-full flex items-center gap-3 bg-white border p-3"
      >
        <span class="material-symbols-outlined text-red-500"> logout </span>

        <span class="text-red-500">Logout</span>
      </div>
    </div>

    <span
      class="material-symbols-outlined md:hidden"
      role="button"
      @click="toggleSideNav"
    >
      menu
    </span>
  </nav>
</template>
