<script>
import { useRouter, RouterLink } from "vue-router";

export default {
  components: {
    RouterLink,
  },
  props: ["open"],
  setup() {
    const { currentRoute } = useRouter();
    return { activeRoutePath: currentRoute.value.fullPath };
  },
  data() {
    return {
      routes: [
        {
          name: "Dashboard",
          icon: "grid_view",
          route: "/",
        },
        {
          name: "Employees",
          icon: "group",
          route: "/employees",
        },
        {
          name: "Payment",
          icon: "credit_card",
          route: "/payment",
        },
      ],
    };
  },
};
</script>

<template>
  <div
    :class="`z-20 absolute top-0 left-0 h-full md:static bg-white py-12 flex flex-col items-center gap-10 overflow-y-auto transition-all duration-200 -translate-x-20 ${
      open ? '!translate-x-0' : ''
    }`"
  >
    <template v-for="route of routes" :key="route.name">
      <RouterLink
        :to="route.route"
        :class="`border-l-4 p-4 border-transparent ${
          route.route === activeRoutePath && 'border-primary-500'
        }`"
      >
        <span
          :class="`material-symbols-outlined flex items-center justify-center h-10 w-10 ${
            route.route === activeRoutePath && 'text-primary-500'
          }`"
        >
          {{ route.icon }}
        </span>
      </RouterLink>
    </template>

    <div class="flex flex-1 flex-col justify-end md:hidden">
      <span
        class="material-symbols-outlined flex items-center justify-center h-10 w-10"
      >
        account_circle_full
      </span>
    </div>
  </div>
</template>
