<script>
import { RouterLink, useRouter } from "vue-router";
import AuthLayout from "../layout/AuthLayout.vue";
import TextInput from "../components/TextInput.vue";
import { useMutation } from "vue-query";
import { postRequest } from "../utils/api/calls";
import { LOGIN } from "../utils/api/urls";
import { validateLoginInputs } from "../utils/validators";

export default {
  components: {
    RouterLink,
    AuthLayout,
    TextInput,
  },
  setup() {
    const router = useRouter();
    let serverError = "";

    const { mutate, isLoading, isError, error } = useMutation(postRequest, {
      onSuccess(data) {
        if (data?.data) {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", JSON.stringify(data.data.user));
          router.push("/employees");
        }
      },
    });
    return { mutate, isLoading, serverError, isError, error };
  },
  data() {
    return {
      payload: { email: "", password: "" },
      errors: { email: "", password: "" },
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
      this.errors = { email: "", password: "" };
      const { valid, errors } = validateLoginInputs(this.payload);

      if (valid) {
        this.mutate({ url: LOGIN, data: this.payload });
      } else {
        this.errors = errors;
      }
    },
  },
};
</script>

<template>
  <AuthLayout>
    <div class="w-11/12 md:w-9/12 flex flex-col gap-3 mx-auto max-w-[900px]">
      <h3 class="text-2xl md:text-4xl font-bold text-center md:text-left">
        Welcome
      </h3>
      <span class="text-center md:text-left"
        >Don't have an account?
        <RouterLink :to="{ name: 'Register' }" class="text-primary-500"
          >Sign up</RouterLink
        ></span
      >
      <div
        class="bg-white shadow-xl shadow-black/5 rounded-lg p-5 md:p-10 grid grid-cols-2 gap-10"
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
          {{ isLoading ? "Loading" : "Login" }}
        </button>
      </div>
    </div>
  </AuthLayout>
</template>
