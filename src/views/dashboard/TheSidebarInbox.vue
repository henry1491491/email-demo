<template>
  <div>
    <v-message-toolbar
      :msgItems="showMsgInboxItems"
      v-on:on-tag-multiple-item-handler="tagMultipleItemHandler"
      v-on:get-page-msg-data="getPageMsgData"
      v-on:choose-check-items="chooseCheckItems"
    />

    <v-tabs grow>
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
    <v-list
      dense
      flat
    >
      <v-message-item
        v-for="(item,key) in showMsgInboxItems"
        :key="key"
        :msgItem="item"
        v-on:on-tag-item-handler="tagItemHandler"
        v-on:on-read-item="openItem"
      />
    </v-list>
  </div>
</template>

<script>
import { apiGetMsgData, apiPutMsgTag } from "../../plugins/api"
export default {
  name: "TheSidebarInbox",
  data() {
    return {
      msgInboxData: [] // call api data
    }
  },
  watch: {},
  computed: {
    showMsgInboxItems: {
      get() {
        return this.msgInboxData
      },
      set(val) {
        this.msgInboxData = val
      }
    }
  },
  created() {
    this.getMsgData()
  },
  methods: {
    tagMultipleItemHandler(tagName) {
      if (tagName === "none" || tagName === "all" || tagName === "part") {
        return this.checkAll(tagName)
      }
      if (tagName === "archive") {
        return this.archiveItem("multiple")
      }
      if (tagName === "deletemail") {
        return this.deleteMailItem("multiple")
      }
      if (tagName === "delete") {
        return this.deleteItem("multiple")
      }
      if (tagName === "read") {
        return this.readItem("multiple")
      }
      if (tagName === "postpone") {
        return this.postponeItem("multiple")
      }
      return
    },
    tagItemHandler(s) {
      if (s.tagName === "check") {
        return this.checkInboxItem(s)
      }
      if (s.tagName === "star") {
        return this.starItem(s)
      }
      if (s.tagName === "archive") {
        return this.archiveItem(s)
      }
      if (s.tagName === "delete") {
        return this.deleteItem(s)
      }
      if (s.tagName === "read") {
        return this.readItem(s)
      }
      if (s.tagName === "postpone") {
        return this.postponeItem(s)
      }
      return
    },
    checkInboxItem(s) {
      function tagToggle(el) {
        if (el.id === s.id) {
          el.isCheckbox = !s.isTag
        }
        return el
      }
      this.msgInboxData = _.map(this.msgInboxData, tagToggle)
    },
    checkAll(tagName) {
      function checks(el) {
        if (tagName === "none") {
          el.isCheckbox = true
        } else if (tagName === "all" || tagName === "part") {
          el.isCheckbox = false
        }
        return el
      }
      this.msgInboxData = _.map(this.msgInboxData, checks)
    },
    async starItem(s) {
      let result = await apiPutMsgTag()
      if (!result.status === 200) {
        return
      } else {
        this.msgInboxData = this.msgInboxData.map(el => {
          if (el.id === s.id) {
            el.isStar = !s.isTag
          }
          return el
        })
        //this.getMsgData()
      }
    },
    async archiveItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isCheckbox === true) {
              el.isArchive = true
            }
            return el
          })
          //this.getMsgData()
        }
      } else {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.id === s.id) {
              el.isArchive = !s.isTag
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async deleteMailItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isCheckbox === true) {
              el.isDeleteMail = true
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async deleteItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isCheckbox === true) {
              el.isDelete = true
            }
            return el
          })
          //this.getMsgData()
        }
      } else {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.id === s.id) {
              el.isDelete = !s.isTag
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async readItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isCheckbox === true) {
              el.isRead = true
            }
            return el
          })
          //this.getMsgData()
        }
      } else {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.id === s.id) {
              el.isRead = !s.isTag
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async postponeItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isCheckbox === true) {
              el.isPostpone = true
            }
            return el
          })
          //this.getMsgData()
        }
      } else {
        let result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.id === s.id) {
              el.isPostpone = !s.isTag
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async chooseCheckItems(title) {
      if (title === "全選") {
        this.checkAll("none")
        return
      }
      if (title === "全不選") {
        this.checkAll("all")
        return
      }
      if (title === "已讀郵件") {
        let result = await this.removeAllCheckItems()
        if (!result) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isRead === true) {
              el.isCheckbox = true
            }
            return el
          })
        }
        return
      }
      if (title === "未讀郵件") {
        let result = await this.removeAllCheckItems()
        if (!result) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isRead === false) {
              el.isCheckbox = true
            }
            return el
          })
        }
        return
      }
      if (title === "已加星號") {
        let result = await this.removeAllCheckItems()
        if (!result) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isStar === true) {
              el.isCheckbox = true
            }
            return el
          })
        }
        return
      }
      if (title === "未加星號") {
        let result = await this.removeAllCheckItems()
        if (!result) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.isStar === false) {
              el.isCheckbox = true
            }
            return el
          })
        }
        return
      }
    },
    async openItem(s) {
      let result = await this.$router.push({
        name: "inboxMsg",
        params: { msgId: s.id }
      })
      if (!result) {
        return
      } else {
        result = await apiPutMsgTag()
        if (!result.status === 200) {
          return
        } else {
          this.msgInboxData = this.msgInboxData.map(el => {
            if (el.id === s.id) {
              el.isRead = !s.isTag
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async removeAllCheckItems() {
      this.msgInboxData = this.msgInboxData.map(el => {
        el.isCheckbox = false
        return el
      })
      return this.msgInboxData
    },
    async getMsgData() {
      let result = await apiGetMsgData()
      if (result) {
        this.msgInboxData = result.data
      }
    },
    async getPageMsgData(page) {}
  }
}
</script>
