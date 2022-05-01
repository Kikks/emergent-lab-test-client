<script>
export default {
  props: ["setRole", "activeRole", "changeRole", "isLoading"],
  data() {
    return {
      open: false,
      roles: ["admin", "staff"],
    };
  },
  methods: {
    setActiveRole(text) {
      this.setRole(text);
      this.open = false;
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>

<template>
  <div class="flex gap-2">
    <div
      class="p-2 border border-[#6A7E8A66] bg-white flex items-center justify-between relative w-[15vw] min-w-[150px] max-w-[250px]."
    >
      <button
        class="w-full flex items-center justify-between"
        @click="toggleOpen"
      >
        <span class="text-xs md:text-sm capitalize">{{
          activeRole === "" ? "Change role" : activeRole
        }}</span>

        <span class="material-symbols-outlined"> unfold_more </span>
      </button>

      <div
        v-show="open"
        class="absolute w-full top-[100%] left-0 bg-white border-t"
      >
        <button
          class="w-full p-2 text-xs md:text-sm border-b capitalize text-left"
          v-for="role of roles"
          :key="role"
          @click="setActiveRole(role)"
        >
          {{ role }}
        </button>
      </div>
    </div>

    <button
      :disabled="isLoading"
      @click="changeRole"
      class="py-2 text-xs md:text-sm md:py-3 px-10 rounded-md bg-primary-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-medium"
    >
      {{ isLoading ? "Loading" : "Change" }}
    </button>
  </div>
</template>
