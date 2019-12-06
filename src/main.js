import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../src/assets/scss/custom.scss'
Vue.use(BootstrapVue)
// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
Vue.component('font-awesome-icon', FontAwesomeIcon)
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons' // import all fas prefix icons
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas, far)
// Vee-Validate
import { extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules' // import all rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import local language dictionary
import { localize } from 'vee-validate'
import zh_TW from 'vee-validate/dist/locale/zh_TW.json'
localize('zh_TW', zh_TW) // don't know what it's means ?
// Register it globally
// main.js or any entry file.
Vue.component('ValidationProvider', ValidationProvider) // don't know what it's means ?
Vue.component('ValidationObserver', ValidationObserver)
// Datepicker
// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//axios.defaults.withCredentials = true

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
