<template>
  <v-list dense>
    <v-message-item
      v-for="(item,key) in showMsgDraftItems"
      :key="key"
      :msgItem="item"
    >
      <template slot="content">
        <v-list-item-content>
          <div class="d-flex justify-between">
            <v-list-item-title
              class="red--text text--lighten-1"
              v-text="msgDraftTitle"
            />
            <v-list-item-title v-text="item.title" />
            <v-list-item-title v-text="item.content" />
            <v-list-item-title
              class="text-right"
              v-html="moment(item.time).format('MM-DD')"
            />
          </div>
        </v-list-item-content>
      </template>
    </v-message-item>
  </v-list>
</template>

<script>
export default {
  name: "TheSidebarDraft",
  data() {
    return {
      msgDraftData: [],
      msgDraftTitle: "草稿"
    }
  },
  computed: {
    showMsgDraftItems() {
      let show_draft_items
      ;[...show_draft_items] = this.msgDraftData
      return show_draft_items
    }
  },
  created() {
    this.getMsgDraftData()
  },
  methods: {
    async getMsgDraftData() {
      let result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/EJguuGayu"
      )
      if (!result) {
        return
      }
      this.msgDraftData = JSON.parse(JSON.stringify(result.data))
    }
  }
}
</script>
