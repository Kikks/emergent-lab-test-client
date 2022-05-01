<script>
import { useMutation } from "vue-query";
import { postRequest } from "../utils/api/calls";
import { CREATE_EMPLOYEE } from "../utils/api/urls";
import { validateCreateEmployeeInputs } from "../utils/validators";
import TextInput from "./TextInput.vue";
export default {
  components: {
    TextInput,
  },
  props: ["refetch", "open", "setOpen"],
  setup() {
    const { mutate, isLoading, isError, isSuccess, error } =
      useMutation(postRequest);
    return { mutate, isLoading, isError, isSuccess, error };
  },
  data() {
    return {
      payload: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        role: "staff",
      },
      errors: { firstName: "", lastName: "", email: "", phoneNumber: "" },
    };
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
      this.errors = { firstName: "", lastName: "", email: "", phoneNumber: "" };
      const { valid, errors } = validateCreateEmployeeInputs(this.payload);

      if (valid) {
        this.mutate({ url: CREATE_EMPLOYEE, data: this.payload });
      } else {
        this.errors = errors;
      }
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
        Add Employee
      </h3>

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
        <TextInput
          :value="payload.firstName"
          :onChange="handleChange"
          className="col-span-2 md:col-span-1"
          label="First Name"
          placeholder="First Name"
          name="firstName"
          icon="person"
          :error="!isEmpty(errors.firstName)"
          :helperText="errors.firstName"
        />
        <TextInput
          :value="payload.lastName"
          :onChange="handleChange"
          className="col-span-2 md:col-span-1"
          label="Last Name"
          placeholder="Last Name"
          name="lastName"
          icon="person"
          :error="!isEmpty(errors.lastName)"
          :helperText="errors.lastName"
        />
        <TextInput
          :value="payload.email"
          :onChange="handleChange"
          className="col-span-2"
          label="Email"
          placeholder="example@gmail.com"
          name="email"
          icon="alternate_email"
          :error="!isEmpty(errors.email)"
          :helperText="errors.email"
        />
        <TextInput
          :value="payload.phoneNumber"
          :onChange="handleChange"
          className="col-span-2"
          label="Password"
          placeholder="080XXXXXXXX"
          name="phoneNumber"
          icon="visibility"
          :error="!isEmpty(errors.phoneNumber)"
          :helperText="errors.phoneNumber"
        />

        <div class="col-span-2">
          <span class="font-light text-[#6A7E8A]">Role</span>

          <div class="flex items-center mt-3">
            <div class="flex items-center gap-3 flex-1">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  :checked="payload.role === 'admin'"
                  @change="setRole('admin')"
                  class="opacity-0 absolute h-8 w-8"
                />
                <div
                  class="bg-white border-2 border-gray-400 w-5 h-5 rounded-full flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary-500"
                >
                  <div
                    :class="`${
                      payload.role === 'admin' ? 'block' : 'hidden'
                    } h-[90%] w-[90%] bg-primary-500 rounded-full`"
                  />
                </div>
              </div>

              <span>Admin</span>
            </div>

            <div class="flex items-center gap-3 flex-1">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  :checked="payload.role === 'staff'"
                  @change="setRole('staff')"
                  class="opacity-0 absolute h-8 w-8"
                />
                <div
                  class="bg-white border-2 border-gray-400 w-5 h-5 rounded-full flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-primary-500"
                >
                  <div
                    :class="`${
                      payload.role === 'staff' ? 'block' : 'hidden'
                    } h-[90%] w-[90%] bg-primary-500 rounded-full`"
                  />
                </div>
              </div>

              <span>Staff</span>
            </div>
          </div>
        </div>

        <button
          @click="handleSubmit"
          :disabled="isLoading"
          :class="`py-3 px-5 rounded-md bg-primary-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-bold`"
        >
          {{ isLoading ? "Loading" : "Add" }}
        </button>
      </div>
    </div>
  </div>
</template>
