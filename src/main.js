import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "@/plugins/vuetify"
import moment from "moment"
import VueLodash from "vue-lodash"
import VMessageItem from "@/components/listitems/VMessageItem"
import VMessageToolbar from "@/components/toolbars/VMessageToolbar"
import VMessageToolbarItem from "@/components/toolbars/VMessageToolbarItem"
import "@/assets/scss/custom.scss"
import "@/plugins/validate"
import "@/plugins/api"

Vue.use(moment)
Vue.use(VueLodash)

window.eventBus = new Vue()

Vue.config.productionTip = false

Vue.component("VMessageItem", VMessageItem)
Vue.component("VMessageToolbar", VMessageToolbar)
Vue.component("VMessageToolbarItem", VMessageToolbarItem)

Vue.prototype.moment = moment

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
