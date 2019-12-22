<template>
  <v-list-item
    @click="listItemHandler(titlename)"
    :class="itemlistclass"
  >
    <v-list-item-action>
      <v-icon :iconname="iconname">
        mdi-{{iconname}}
      </v-icon>
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title :titlename="titlename">
        {{titlename}}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-action>
      <v-btn
        v-show="badgenum>0"
        :badgenum="badgenum"
        :color="badgecolor"
        x-small
        dark
      >
        {{badgenum}}
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
export default {
  name: "VListItemWithBtn",
  props: {
    iconname: { type: String, default: "" },
    titlename: { type: String, default: "" },
    badgenum: { type: String, default: "0" },
    badgecolor: { type: String, default: "primary" },
    itemlistclass: { type: String, default: "" }
  },
  methods: {
    listItemHandler(item) {
      if (item == "更多" || item == "更少") {
        this.$emit("more")
      } else if (item == "類別") {
        this.$emit("category")
      }
    }
  }
}
</script>
