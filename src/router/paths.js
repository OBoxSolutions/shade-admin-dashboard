export default [
  {
    path: "/",
    component: () => import("@/layouts/DefaultLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/HomeView.vue"),
      },
    ],
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/NotFoundView.vue"),
  },
];
