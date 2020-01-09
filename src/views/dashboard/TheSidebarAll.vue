<template>
  <div>
    <v-list dense>
      <v-message-item
        v-for="(item,key) in messageItems[0]"
        :key="key"
        :msgItem="item"
      />
    </v-list>
  </div>
</template>

<script>
export default {
  name: "TheSidebarInbox",
  data() {
    return {
      messageItems: []
    }
  },
  computed: {},
  created() {
    this.getMessageData()
  },
  methods: {
    async getMessageData() {
      let result
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      if (!result) {
        return
      }
      result = JSON.parse(JSON.stringify(result.data))
      this.messageItems.push(result)
    },
    async onMessageItemCheckbox(item) {
      if (item.status === true) {
        this.isSelect.push(item)
      } else {
        this.isSelect.splice(0, 1)
      }
    }
  }
}
</script>
