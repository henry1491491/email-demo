<template>
  <div>
    <the-navbar />

    <v-content>
      <router-view />
    </v-content>

    <the-footer />
    <the-snackbar />

  </div>
</template>

<script>
import TheFooter from "./TheFooter"
import TheNavbar from "./TheNavbar"
import TheSnackbar from "./TheSnackbar"

export default {
  name: "Dashboard",
  components: {
    TheFooter,
    TheNavbar,
    TheSnackbar
  },
  data() {
    return {}
  }
}
</script>


