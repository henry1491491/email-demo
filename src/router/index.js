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
    component: () => import("../views/dashboard/Index.vue"),
    children: [
      {
        path: "",
        name: "inbox",
        component: () => import("../views/dashboard/TheSidebarInbox.vue")
      },
      {
        path: "inbox/:msgId",
        name: "inboxMsg",
        component: () =>
          import("../views/dashboard/messages/TheInboxMessage.vue")
      },
      {
        path: "/star",
        name: "star",
        component: () => import("../views/dashboard/TheSidebarStar.vue")
      },
      {
        path: "/postpone",
        name: "postpone",
        component: () => import("../views/dashboard/TheSidebarPostpone.vue")
      },
      {
        path: "/send",
        name: "send",
        component: () => import("../views/dashboard/TheSidebarSend.vue")
      },
      {
        path: "/drafts",
        name: "drafts",
        component: () => import("../views/dashboard/TheSidebarDraft.vue")
      },
      {
        path: "/important",
        name: "important",
        component: () => import("../views/dashboard/TheSidebarImportant.vue")
      },
      {
        path: "/sendclock",
        name: "sendclock",
        component: () => import("../views/dashboard/TheSidebarArrangement.vue")
      },
      {
        path: "/all",
        name: "all",
        component: () => import("../views/dashboard/TheSidebarAll.vue")
      },
      {
        path: "/deletemail",
        name: "deletemail",
        component: () => import("../views/dashboard/TheSidebarTrashEmail.vue")
      },
      {
        path: "/delete",
        name: "delete",
        component: () => import("../views/dashboard/TheSidebarTrashCan.vue")
      },
      {
        path: "/category/social",
        name: "social",
        component: () => import("../views/dashboard/TheSidebarCateSocial.vue")
      },
      {
        path: "/category/news",
        name: "news",
        component: () => import("../views/dashboard/TheSidebarCateNews.vue")
      },
      {
        path: "/category/forum",
        name: "forum",
        component: () => import("../views/dashboard/TheSidebarCateForum.vue")
      },
      {
        path: "/category/sales",
        name: "sales",
        component: () => import("../views/dashboard/TheSidebarCateSales.vue")
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
