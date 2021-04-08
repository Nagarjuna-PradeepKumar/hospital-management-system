import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    meta: { title: "Login | HMS" },
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../views/Admin.vue"),
    meta: { title: "Admin | HMS" },
  },
  {
    path: "/reception",
    name: "reception",
    component: () => import("../views/Reception.vue"),
    meta: { title: "Reception | HMS" },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/Logout.vue"),
    meta: { title: "Logout | HMS" },
  },
  {
    path: "/doctor",
    name: "doctor",
    component: () => import("../views/Doctor.vue"),
    meta: { title: "Doctor | HMS" },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
