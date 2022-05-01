<script>
export default {
  props: ["value", "setSearch", "className", "placeholder"],
  data() {
    return {
      showPassword: true,
    };
  },
  created() {
    if (this.props?.type && this.props.type === "password") {
      this.showPassword(false);
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    debounceInput(event) {
      this.setSearch(event.target.value);
    },
  },
};
</script>

<template>
  <div class="w-full md:w-auto" :class="className">
    <div
      class="p-2 group flex items-center justify-between border-b border focus-within:border-primary-500 transition-all duration-200 gap-2 w-full md:w-[25vw] md:min-w-[250px] md:max-w-[400px] bg-white"
    >
      <input
        class="flex-1 focus:outline-none"
        :value="value"
        :placeholder="placeholder"
        @change="(event) => debounceInput(event)"
      />

      <span
        class="material-symbols-outlined group-focus-within:text-primary-500 transition-all duration-200 text-[#6A7E8A]"
      >
        search
      </span>
    </div>
  </div>
</template>
