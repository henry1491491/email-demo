import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "@/plugins/vuetify"
import axios from "axios"
import VueAxios from "vue-axios"
import moment from "moment"
import VMessageItem from "@/components/listitems/VMessageItem"
import VMessageToolbar from "@/components/toolbars/VMessageToolbar"

import "@/assets/scss/custom.scss"
import "@/plugins/validate"

axios.defaults.withCredentials = false

Vue.use(VueAxios, axios)
Vue.use(moment)

window.eventBus = new Vue()

Vue.config.productionTip = false

Vue.component("VMessageItem", VMessageItem)
Vue.component("VMessageToolbar", VMessageToolbar)

Vue.prototype.moment = moment

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
