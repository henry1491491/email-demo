<template>
  <v-snackbar v-model="snackbar">
    {{ text }}
    <v-btn
      color="pink"
      text
      @click="snackbar = false"
      v-text="'關閉'"
    />
  </v-snackbar>
</template>

<script>
export default {
  name: "TheSnackbar",
  data() {
    return {
      snackbar: false,
      text: "this is a test"
    }
  }
}
</script>
