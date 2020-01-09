import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/dashboard/Index.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
