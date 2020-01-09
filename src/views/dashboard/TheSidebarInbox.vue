<template>
  <div>
    <v-message-toolbar :msgItems="showMsgInboxItems" />
    <v-tabs>
      <v-tab>
        <v-icon
          class="mr-2"
          v-text="'mdi-inbox'"
        />
        <span>主要</span>
      </v-tab>
      <v-tab>
        <v-icon
          class="mr-2"
          v-text="'mdi-account-multiple-outline'"
        />
        <span>社交網路</span>
      </v-tab>
      <v-tab>
        <v-icon
          class="mr-2"
          v-text="'mdi-tag'"
        />
        <span>促銷內容</span>
      </v-tab>
    </v-tabs>

    <v-list dense>
      <v-message-item
        v-for="(item,key) in showMsgInboxItems"
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
      msgInboxData: [],
      isCheckStatus: "none",
      isCheckLen: 0,
      inboxItemsLen: 0
    }
  },
  computed: {
    showMsgInboxItems: {
      get() {
        let msg_inbox_items = []
        msg_inbox_items = this.msgInboxData.filter(el => !el.isArchive) // 不確定是否 api call 到的資料是否就會是專屬「收件夾」的資料？如果是就不需要進行 filter 過濾到已封存的訊息
        this.inboxItemsLen = msg_inbox_items.length
        return msg_inbox_items
      },
      set(val) {
        this.msg_inbox_items = val
      }
    }
  },
  async created() {
    this.getMsgInboxData()
    eventBus.$on("check-item", this.onCheckMsgItem)
    eventBus.$on("check-all-items", this.onCheckAll)
    eventBus.$on("get-page", this.getMsgPageData)
  },
  beforeDestroy() {
    eventBus.$off("check-item", this.onCheckMsgItem)
    eventBus.$on("check-all-items", this.onCheckAll)
    eventBus.$off("get-page", this.getMsgData)
  },
  methods: {
    /**
     * 接受 msg-toolbar 的事件，將所有訊息迭代操作
     * @param s none, all, part
     */
    async onCheckAll(s) {
      s = s.s
      if (s === "none") {
        this.showMsgInboxItems = this.showMsgInboxItems.map(el => {
          el.isCheckbox = true
          return el
        })
        this.isCheckLen = this.showMsgInboxItems.length
      } else if (s === "all") {
        this.showMsgInboxItems = this.showMsgInboxItems.map(el => {
          el.isCheckbox = false
          return el
        })
        this.isCheckLen = 0
      } else if (s === "part") {
        this.showMsgInboxItems = this.showMsgInboxItems.map(el => {
          el.isCheckbox = false
          return el
        })
        this.isCheckLen = 0
      }
    },
    /**
     * 接收 msg 組件發出的事件，通知 msg-toolbar 組件以判斷是否全部勾選、部分勾選或是全部沒勾選
     * @param b true, false
     */
    async onCheckMsgItem(b) {
      if (b.status === false) {
        this.isCheckLen++
        eventBus.$emit("check-status", {
          0: this.isCheckLen,
          1: this.inboxItemsLen
        })
      } else if (b.status === true) {
        this.isCheckLen--
        eventBus.$emit("check-status", {
          0: this.isCheckLen,
          1: this.inboxItemsLen
        })
      }
    },
    async getMsgInboxData() {
      let result
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      if (!result) {
        return
      }
      this.msgInboxData = JSON.parse(JSON.stringify(result.data))
    },
    /**
     * 拿分頁訊息
     * @param p 起始頁
     */
    async getMsgPageData(p) {
      let result
      result = await this.getMsgInboxData()
      if (!result) {
        return
      }
      result = this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      ) // 帶參數拿分頁訊息
    }
  }
}
</script>
