<script>
import { useMutation } from "vue-query";
import { deleteRequest } from "../../utils/api/calls";
import { DELETE_EMPLOYEE } from "../../utils/api/urls";

export default {
  props: ["refetch", "open", "setOpen", "employee"],
  setup() {
    const { mutate, isLoading, isError, isSuccess, error } =
      useMutation(deleteRequest);
    return { mutate, isLoading, isError, isSuccess, error };
  },
  data() {
    return {};
  },
  watch: {
    isSuccess: function () {
      this.refetch();
      this.setOpen(false);
    },
  },
  methods: {
    handleChange(event) {
      this.payload[event.target.name] = event.target.value;
    },
    isEmpty(string) {
      return string.trim() === "" ? true : false;
    },
    setRole(role) {
      this.payload.role = role;
    },
    handleSubmit() {
      this.mutate({ url: DELETE_EMPLOYEE(this.employee.id) });
    },
  },
};
</script>

<template>
  <div
    v-show="open"
    class="h-[100vh] w-[100vw] fixed top-0 left-0 flex items-center justify-center bg-black/60 z-50"
  >
    <div
      class="bg-white w-[90%] max-w-[600px] rounded-md flex flex-col p-5 md:p-10 gap-5"
    >
      <div class="w-full flex justify-end">
        <span
          class="material-symbols-outlined"
          role="button"
          @click="setOpen(false)"
        >
          close
        </span>
      </div>

      <h3 class="text-xl md:text-3xl font-bold text-center md:text-left">
        Delete Employe
      </h3>

      <span
        >Are you sure you want to delete {{ employee?.firstName || "" }}
        {{ employee?.lastName || "" }}'s data?</span
      >

      <div class="grid grid-cols-2 gap-6">
        <div
          class="p-3 flex items-center justify-center rounded-md col-span-2 bg-red-300"
          v-show="isError"
        >
          <span class="text-white">{{
            error?.response?.data?.message ||
            "Something went wrong. Try again later"
          }}</span>
        </div>

        <button
          @click="setOpen(false)"
          :disabled="isLoading"
          :class="`py-3 px-5 rounded-md bg-red-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-1 md:col-end-2 flex items-center justify-center text-white font-bold`"
        >
          No
        </button>

        <button
          @click="handleSubmit"
          :disabled="isLoading"
          :class="`py-3 px-5 rounded-md bg-primary-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-bold`"
        >
          {{ isLoading ? "Loading" : "Yes" }}
        </button>
      </div>
    </div>
  </div>
</template>
