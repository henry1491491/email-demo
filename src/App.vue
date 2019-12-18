<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import LoginViews from "./views/LoginViews.vue"
import Dashboard from "./views/Dashboard.vue"
export default {
  name: "App",

  components: {
    LoginViews,
    Dashboard
  },

  data: () => ({
    //
  })
}
</script>
