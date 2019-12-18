import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("../views/LoginViews.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../views/Dashboard.vue")
  }
]

const router = new VueRouter({
  routes
})

export default router
