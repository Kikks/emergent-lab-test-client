<script>
export default {
  props: ["page", "noOfPages", "setPage"],
  methods: {
    handleNext() {
      if (this.page + 1 > this.noOfPages) {
        return;
      } else {
        this.setPage(this.page + 1);
      }
    },
    handlePrevious() {
      if (this.page - 1 < 1) {
        return;
      } else {
        this.setPage(this.page - 1);
      }
    },
    debounceInput(event) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        if (
          isNaN(Number(event.target.value)) ||
          Number(event.target.value) < 1 ||
          event.target.value > this.noOfPages
        ) {
          return;
        } else {
          this.setPage(Number(event.target.value));
        }
      }, 1500);
    },
  },
};
</script>

<template>
  <div class="flex items-center gap-3">
    <div class="flex items-center gap-2">
      <input
        class="border rounded-md p-2 w-10 h-10 bg-transparent"
        :value="page"
        @input="debounceInput"
      />
      <span>of {{ noOfPages }}</span>
    </div>

    <div class="flex gap-2">
      <button
        @click="handlePrevious"
        :disabled="page < 2"
        :class="`bg-primary-500 rounded-full h-7 w-7 flex items-center justify-center ${
          page < 2 && 'disabled:bg-gray-200'
        }`"
      >
        <span class="material-symbols-outlined text-white font-[.4rem]">
          chevron_left
        </span>
      </button>

      <button
        @click="handleNext"
        :disabled="page > noOfPages - 1"
        :class="`bg-primary-500 rounded-full h-7 w-7 flex items-center justify-center ${
          page > noOfPages - 1 && 'disabled:bg-gray-200'
        }`"
      >
        <span class="material-symbols-outlined text-white font-[.4rem]">
          chevron_right
        </span>
      </button>
    </div>
  </div>
</template>
