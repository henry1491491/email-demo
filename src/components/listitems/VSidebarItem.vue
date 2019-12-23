<template>
  <v-list-item
    @click="itemHandler(titlename)"
    :class="itemlistclass"
  >
    <v-list-item-action>
      <v-icon
        :iconname="iconname"
        :color="iconcolor"
      >
        mdi-{{iconname}}
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title :titlename="titlename">
        {{titlename}}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <span v-show="num>0">{{num}}</span>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "VSidebarItem",
  props: {
    iconcolor: { type: String, default: "secondary" },
    iconname: { type: String },
    titlename: { type: String },
    num: { type: String, default: "0" },
    itemlistclass: { type: String }
  },
  data() {
    return {}
  },
  methods: {
    itemHandler(t) {
      let status
      if (t == "更多") {
        status = { icon: "更多" }
        this.$emit("showmore", status)
      } else if (t == "更少") {
        status = { icon: "更少" }
        this.$emit("showmore", status)
      }
    }
  }
}
</script>
