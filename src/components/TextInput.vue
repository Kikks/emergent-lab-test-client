<script>
export default {
  props: [
    "name",
    "label",
    "value",
    "onChange",
    "className",
    "placeholder",
    "icon",
    "error",
    "helperText",
    "type",
  ],
  data() {
    return {
      showPassword: false,
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
  },
};
</script>

<template>
  <div class="w-full" :class="className">
    <span
      :class="`font-light text-[#6A7E8A] ${error && 'text-red-500'}`"
      v-show="label"
      >{{ label }}</span
    >
    <div
      :class="` group flex items-center justify-between border-b border-[#E6E7EB] ${
        error && 'border-red-500'
      } focus-within:border-primary-500 ${
        error && 'focus-within:border-red-500'
      } transition-all duration-200 gap-2`"
    >
      <input
        class="flex-1 py-3 focus:outline-none"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :type="
          type === 'password' ? (showPassword ? 'text' : 'password') : 'text'
        "
        @change="(event) => onChange(event)"
      />

      <span
        v-show="icon"
        @click="type === 'password' && togglePasswordVisibility()"
        :class="`material-symbols-outlined
          group-focus-within:text-primary-500
          ${error && 'group-focus-within:text-red-500'}
          ${type === 'password' && 'cursor-pointer'}
          transition-all duration-200`"
      >
        {{ icon }}
      </span>
    </div>

    <span
      v-show="helperText && helperText.trim() !== ''"
      :class="`text-xs ${error && 'text-red-500'}`"
    >
      {{ helperText }}
    </span>
  </div>
</template>
