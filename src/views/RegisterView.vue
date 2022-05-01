<script>
import { RouterLink } from "vue-router";
import AuthLayout from "../layout/AuthLayout.vue";
import TextInput from "../components/TextInput.vue";
import { useMutation } from "vue-query";
import { postRequest } from "../utils/api/calls";
import { REGISTER } from "../utils/api/urls";
import { validateRegisterInputs } from "../utils/validators";

export default {
  components: {
    RouterLink,
    AuthLayout,
    TextInput,
  },
  setup() {
    let serverError = "";

    const { mutate, isLoading, isError, isSuccess, error } =
      useMutation(postRequest);
    return { mutate, isLoading, serverError, isError, isSuccess, error };
  },
  data() {
    return {
      payload: { firstName: "", lastName: "", email: "", password: "" },
      errors: { firstName: "", lastName: "", email: "", password: "" },
    };
  },
  methods: {
    handleChange(event) {
      this.payload[event.target.name] = event.target.value;
    },
    isEmpty(string) {
      return string.trim() === "" ? true : false;
    },
    handleSubmit() {
      this.errors = { firstName: "", lastName: "", email: "", password: "" };
      const { valid, errors } = validateRegisterInputs(this.payload);

      if (valid) {
        this.mutate({ url: REGISTER, data: this.payload });
      } else {
        this.errors = errors;
      }
    },
  },
};
</script>

<template>
  <AuthLayout>
    <div
      v-if="!isSuccess"
      class="w-11/12 md:w-9/12 flex flex-col gap-3 mx-auto max-w-[900px]"
    >
      <h3 class="text-2xl md:text-4xl font-bold text-center md:text-left">
        Create your free account
      </h3>
      <span class="text-center md:text-left"
        >Already registered?
        <RouterLink :to="{ name: 'Login' }" class="text-primary-500"
          >Sign in</RouterLink
        ></span
      >
      <div
        class="bg-white shadow-xl shadow-black/5 rounded-lg p-5 md:p-10 grid grid-cols-2 gap-6"
      >
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
          :value="payload.password"
          :onChange="handleChange"
          className="col-span-2"
          label="Password"
          placeholder="********"
          name="password"
          icon="visibility"
          type="password"
          :error="!isEmpty(errors.password)"
          :helperText="errors.password"
        />

        <button
          @click="handleSubmit"
          :disabled="isLoading"
          :class="`py-3 px-5 rounded-md bg-primary-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-bold`"
        >
          {{ isLoading ? "Loading" : "Continue" }}
        </button>
      </div>
    </div>

    <div
      v-else
      class="w-11/12 md:w-9/12 flex flex-col items-center justify-center gap-3 mx-auto max-w-[900px]"
    >
      <span class="material-symbols-outlined text-5xl text-primary-500">
        task_alt
      </span>
      <span class="text-center max-w-[50ch]"
        >Your account has been created successfully. You can now proceed to
        login!</span
      >
      <RouterLink
        to="/auth/login"
        :class="`py-3 px-5 rounded-md bg-primary-500 disabled:bg-gray-200 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-bold`"
      >
        Continue
      </RouterLink>
    </div>
  </AuthLayout>
</template>
