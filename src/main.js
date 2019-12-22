import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "@/plugins/vuetify"
import axios from "axios"
import VueAxios from "vue-axios"
import moment from "vue-moment"
//import VueMoment from "vue-moment"
//import moment from "moment-timezone"
import "@/assets/scss/custom.scss"
import "@/plugins/validate"
axios.defaults.withCredentials = true
Vue.use(VueAxios, axios)
Vue.use(moment)
Vue.prototype.$Moment = moment
//Vue.use(require("vue-moment"))
//Vue.use(VueMoment, {moment})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
