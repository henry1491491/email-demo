<template>
  <v-footer>
    <v-spacer />
    <div> &copy;{{ footerTime  }}</div>
  </v-footer>
</template>
<script>
export default {
  name: "TheFooter",
  data() {
    return {
      footerTime: ""
    }
  },
  created() {
    this.getMomentTime()
  },
  methods: {
    async getMomentTime() {
      let now = new Date().getTime()
      this.footerTime = this.moment(now).format("YYYY-MM-DD")
    }
  }
}
</script>
