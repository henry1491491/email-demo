<template>
  <v-list dense>
    <v-message-item
      v-for="(item,key) in showMsgStarItems"
      :key="key"
      :msgItem="item"
    >
    </v-message-item>
  </v-list>
</template>

<script>
export default {
  name: "TheSidebarDraft",
  data() {
    return {
      msgStarData: []
    }
  },
  computed: {
    showMsgStarItems() {
      let show_star_items
      ;[...show_star_items] = this.msgStarData
      return show_star_items
    }
  },
  created() {
    this.getMsgStarData()
  },
  methods: {
    async getMsgStarData() {
      let result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/VJ8ZrV6JO"
      )
      if (!result) {
        return
      }
      this.msgStarData = JSON.parse(JSON.stringify(result.data))
    }
  }
}
</script>
