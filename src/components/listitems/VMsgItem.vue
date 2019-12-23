<template>
  <v-banner
    single-line
    tile
  >
    <div class="d-flex align-center">
      <v-btn
        icon
        :color="color"
      >
        <v-icon>
          mdi-square-outline
        </v-icon>
      </v-btn>
      <v-btn
        icon
        :color="color"
        class="mr-2"
      >
        <v-icon>
          mdi-star-outline
        </v-icon>
      </v-btn>
      <span
        class="mr-2"
        style="min-width: 150px;"
      >
        這是寄件者
      </span>
      <strong
        class="mr-2 text-truncate"
        style="min-width: 150px;"
      >
        這是標題
      </strong>
      <span class="text-truncate">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas dolore cupiditate minima laudantium explicabo est reiciendis cum tenetur suscipit quo a, facere labore. Voluptas error dolor provident cumque. Neque, tenetur?
      </span>
    </div>
    <template v-slot:actions>
      <v-btn
        icon
        :color="color"
      >
        <v-icon>mdi-archive-arrow-down-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        :color="color"
      >
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
      <v-btn
        icon
        :color="color"
      >
        <v-icon>mdi-email-open</v-icon>
      </v-btn>
      <v-btn
        icon
        :color="color"
      >
        <v-icon>mdi-clock</v-icon>
      </v-btn>
    </template>
  </v-banner>
</template>

<script>
export default {
  name: "VMsgItem",
  data() {
    return {
      color: "blue-grey darken-1"
    }
  }
}
</script>

<style lang="scss">
.v-banner__wrapper {
  border-top: 0.5px solid#F5F5F5 !important;
  border-bottom: 0.5px solid#F5F5F5 !important;
  padding: 0 5px !important;
}
.text-truncate {
  display: inline-block;
}
</style>
