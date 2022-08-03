export default [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "Dashboard" },
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashboardView.vue"),
      },
      {
        path: "/login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/NotFoundView.vue"),
  },
];
