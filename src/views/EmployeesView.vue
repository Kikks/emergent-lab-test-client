<script>
import UserLayout from "../layout/UserLayout.vue";
import RoleSelect from "../components/RoleSelect.vue";
import SearchBar from "../components/icons/SearchBar.vue";
import TablePagination from "../components/icons/TablePagination.vue";
import EmployeeTable from "../components/Table/EmployeeTable.vue";
import { useMutation } from "vue-query";
import { getRequest, patchRequest } from "../utils/api/calls";
import { GET_EMPLOYEES, UPDATE_EMPLOYEE } from "../utils/api/urls";
import EmployeeModal from "../components/EmployeeModal.vue";

export default {
  components: {
    UserLayout,
    RoleSelect,
    SearchBar,
    TablePagination,
    EmployeeTable,
    EmployeeModal,
  },
  setup() {
    const { mutate, isLoading, isError, isSuccess, data, error } =
      useMutation(getRequest);

    const {
      mutate: updateEmployee,
      isLoading: updateEmployeeIsLoading,
      isError: updateEmployeeIsError,
      isSuccess: updateEmployeeIsSuccess,
      data: updateEmployeeData,
      error: updateEmployeeError,
    } = useMutation(patchRequest);
    return {
      mutate,
      isLoading,
      isError,
      isSuccess,
      data,
      error,
      updateEmployee,
      updateEmployeeIsLoading,
      updateEmployeeIsError,
      updateEmployeeIsSuccess,
      updateEmployeeData,
      updateEmployeeError,
    };
  },
  data() {
    return {
      open: false,
      search: "",
      role: "",
      page: 1,
      noOfPages: 5,
      limit: 10,
      employees: [],
      selectedEmployees: [],
      serverError: "",
    };
  },
  mounted() {
    this.mutate({ url: GET_EMPLOYEES(this.search, this.limit, this.page) });
  },
  watch: {
    isSuccess: function () {
      if (this.data?.data?.employees) {
        this.employees = this.data.data.employees;
      }

      if (this.data?.data?.total) {
        this.noOfPages = Math.ceil(this.data.data.total / this.limit);
      }
    },
    updateEmployeeIsSuccess: function () {
      this.selectedEmployees = [];
      this.refetch();
    },
    updateEmployeeIsError: function () {
      console.log(this.updateEmployeeError);
    },
    isError: function () {
      this.serverError = this.error?.response?.data?.message;
    },
    page: function (value) {
      this.mutate({ url: GET_EMPLOYEES(this.search, this.limit, value) });
    },
    search: function (value) {
      this.mutate({ url: GET_EMPLOYEES(value, this.limit, this.page) });
    },
  },
  methods: {
    setPage(text) {
      this.page = Number(text);
    },
    setSearch(text) {
      this.search = text;
    },
    setOpen(boolean) {
      this.open = boolean;
    },
    setSelectedEmployees(employees) {
      this.selectedEmployees = employees;
    },
    setRole(role) {
      this.role = role;
    },
    changeRole() {
      if (this.role.trim() === "") {
        return;
      }

      if (this.selectedEmployees.length === 0) {
        return;
      }

      for (let i = 0; i < this.selectedEmployees.length; i++) {
        this.updateEmployee({
          url: UPDATE_EMPLOYEE(this.selectedEmployees[i].id),
          data: {
            ...this.selectedEmployees[i],
            role: this.role,
          },
        });
      }
    },
    refetch() {
      this.mutate({ url: GET_EMPLOYEES(this.search, this.limit, this.page) });
    },
  },
};
</script>

<template>
  <UserLayout>
    <div
      class="w-full p-5 pb-20 md:p-10 md:pb-20 lg:p-20 lg:pb-40 flex flex-col gap-5 lg:gap-10"
    >
      <div class="flex gap-5 flex-wrap items-center justify-between">
        <span class="text-xl md:text-2xl font-medium">Employees</span>

        <button
          @click="setOpen(true)"
          class="py-2 md:py-3 px-10 lg:px-20 rounded-md bg-primary-500 col-start-1 col-end-3 md:col-start-2 md:col-end-3 flex items-center justify-center text-white font-medium"
        >
          Add New
        </button>
      </div>

      <div
        class="bg-white p-5 flex flex-wrap md:gap-3 items-center justify-between"
      >
        <span class="text-2xl md:text-3xl font-medium gap-2"
          >Josh Bakery Ventures</span
        >

        <span class="text-base lg:text-lg"
          >62, Bode Thomas, Surulere, Lagos</span
        >
      </div>

      <div class="w-full flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-5 flex-wrap w-full md:w-auto">
          <RoleSelect
            :setRole="setRole"
            :activeRole="role"
            :changeRole="changeRole"
            :isLoading="updateEmployeeIsLoading"
          />
          <SearchBar
            :value="search"
            placeholder="Enter staff name here..."
            :setSearch="setSearch"
          />
        </div>

        <TablePagination
          :page="page"
          :setPage="setPage"
          :noOfPages="noOfPages"
        />
      </div>

      <div
        v-if="isLoading"
        class="w-full flex flex-col gap-5 items-center justify-center py-32"
      >
        <span class="material-symbols-outlined text-5xl animate-spin">
          hourglass_bottom
        </span>
      </div>

      <template v-else-if="employees.length !== 0">
        <EmployeeTable
          :list="employees"
          :selected="selectedEmployees"
          :setSelected="setSelectedEmployees"
          :refetch="refetch"
        />
      </template>

      <div
        v-else
        class="w-full flex flex-col gap-5 items-center justify-center py-32"
      >
        <span class="material-symbols-outlined text-5xl">
          sentiment_dissatisfied
        </span>

        <span class="text-center max-w-[50ch]"
          >There are no employees to display</span
        >
      </div>
    </div>

    <EmployeeModal :open="open" :setOpen="setOpen" :refetch="refetch" />
  </UserLayout>
</template>
