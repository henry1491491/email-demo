import axios from "axios"
import VueAxios from "vue-axios"
import Vue from "vue"

axios.defaults.withCredentials = false

Vue.use(VueAxios, axios)

const sidebarRequest = axios.create({
  baseURL: "https://next.json-generator.com/api/json/get/"
})

const msgRequest = axios.create({
  baseURL: "https://next.json-generator.com/api/json/get/"
})

export const apiGetSidebarData = data => sidebarRequest.get("/Nk6iFFry_", data)
export const apiGetMsgData = data => msgRequest.get("/Vyc5O-JkO", data)
export const apiPutMsgTag = data => msgRequest.get("/Vyc5O-JkO", data)

export const apiGetMsgStarTag = data => msgRequest.get("/E1F2qgOlO", data)
export const apiPostMsg = data => msgRequest.get("/E1F2qgOlO", data)

export const apiGetMsgPageData = data => msgRequest.get("/Vyvs_vtld", data)

export const apiPostDraftData = data => msgRequest.get("/Vyvs_vtld", data)

/*
export const apiPutIsArchive = data => msgRequest.get("/Vyc5O-JkO", data)
export const apiPutIsDelete = data => msgRequest.get("/Vyc5O-JkO", data)
export const apiPutIsRead = data => msgRequest.get("/Vyc5O-JkO", data)
export const apiPutIsPostpone = data => msgRequest.get("/Vyc5O-JkO", data)
*/
