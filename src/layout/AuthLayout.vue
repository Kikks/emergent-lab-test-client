<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  created() {
    const token = localStorage.getItem("token");
    if (token) {
      this.router.push("/employees");
    }
  },
};
</script>

<template>
  <div class="w-full flex h-[100vh] overflow-y-hidden">
    <div
      class="relative w-5/12 h-full hidden p-10 flex-col justify-end md:flex left-side"
    >
      <div
        class="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/60 to-black/5 z-0"
      />
      <div class="z-20 text-center space-y-5 flex flex-col items-center">
        <span class="text-white text-lg text2xl:text-xl font-bold"
          >No Hazzles</span
        >
        <p class="text-white text-lg 2xl:text-xl max-w-[35ch]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod.
        </p>

        <div class="grid grid-cols-2 gap-5">
          <div
            class="h-3 w-3 bg-primary-500 relative before:absolute before:top-[50%] before:left-[50%] before:translate-x-[-50%] before:translate-y-[-50%] before:h-[200%] before:w-[200%] before:border-[1px] before:border-primary-100 before:rounded-full rounded-full"
          />
          <div class="h-3 w-3 bg-primary-100 rounded-full" />
        </div>
      </div>
    </div>

    <main class="w-full md:w-7/12 h-full overflow-y-auto flex flex-col">
      <div class="w-full flex flex-1 items-center justify-center py-10">
        <slot></slot>
      </div>

      <div
        class="text-xs w-10/12 mx-auto flex flex-col gap-3 text-center lg:flex-row lg:justify-between lg:text-left pb-5 lg:pb-10"
      >
        <span
          >By siging up, you agree to our
          <span class="text-primary-500">Terms</span> and
          <span class="text-primary-500">Privacy Policy</span></span
        >

        <span>© 2019 Tinylabs. All rights reserved.</span>
      </div>
    </main>
  </div>
</template>

<style scoped>
.left-side {
  background: url(../assets/images/auth-bg.png) center center;
  background-size: cover;
}
</style>
