import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../views/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
    },
    {
      path: "/employees",
      name: "Employees",
      component: () => import("../views/EmployeesView.vue"),
    },
    {
      path: "/payment",
      name: "Payment",
      component: () => import("../views/PaymentView.vue"),
    },
    {
      path: "/auth/register",
      name: "Register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/auth/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/:catchAll(.*)*",
      name: "PageNotFound",
      component: NotFound,
    },
  ],
});

export default router;
