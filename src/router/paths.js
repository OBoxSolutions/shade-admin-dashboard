import store from "@/store"

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
        beforeEnter: (to, from, next) => {
          if(!store.getters['auth/authenticated']){
            return next({
              name: 'Login'
            })
          }
          next()
        }
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
