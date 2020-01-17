<template>
  <div>
    <v-message-toolbar
      :msgItems="showMsgStarItems"
      v-on:on-tag-multiple-item-handler="tagMultipleItemHandler"
    />
    <v-list
      dense
      flat
    >
      <v-message-item
        v-for="(item,key) in showMsgStarItems"
        :key="key"
        :msgItem="item"
        v-on:on-tag-item-handler="tagItemHandler"
      />
    </v-list>
  </div>
</template>

<script>
import {
  apiGetMsgData,
  apiPutMsgTag,
  apiGetMsgStarTag
} from "../../plugins/api"

export default {
  name: "TheSidebarStar",
  data() {
    return {
      msgStarData: [] // call api data
    }
  },
  computed: {
    showMsgStarItems: {
      get() {
        return this.msgStarData
      },
      set(val) {
        this.msgStarData = val
      }
    }
  },
  created() {
    this.getMsgStarData()
  },
  beforeDestroy() {},
  methods: {
    tagMultipleItemHandler(s) {
      if (s === "none" || s === "all" || s === "part") {
        this.checkAll(s)
      } else if (s === "archive") {
        this.archiveItem("multiple")
      } else if (s === "deletemail") {
        this.deleteMailItem("multiple")
      } else if (s === "delete") {
        this.deleteItem("multiple")
      } else if (s === "read") {
        this.readItem("multiple")
      } else if (s === "postpone") {
        this.postponeItem("multiple")
      }
    },
    tagItemHandler(s) {
      if (s.tag === "check") {
        this.checkInboxItem(s)
      } else if (s.tag === "star") {
        this.starItem(s)
      } else if (s.tag === "archive") {
        this.archiveItem(s)
      } else if (s.tag === "delete") {
        this.deleteItem(s)
      } else if (s.tag === "read") {
        this.readItem(s)
      } else if (s.tag === "postpone") {
        this.postponeItem(s)
      }
    },
    checkInboxItem(s) {
      this.msgStarData = this.msgStarData.map(el => {
        if (el.id === s.id) {
          el.isCheckbox = !s.b
        }
        return el
      })
    },
    checkAll(s) {
      if (s === "none") {
        this.msgStarData = this.msgStarData.map(el => {
          el.isCheckbox = true
          return el
        })
      } else if (s === "all" || s === "part") {
        this.msgStarData = this.msgStarData.map(el => {
          el.isCheckbox = false
          return el
        })
      }
    },
    async starItem(s) {
      let result = await apiPutMsgTag()
      if (result.status === 200) {
        this.msgStarData = this.msgStarData.map(el => {
          if (el.id === s.id) {
            el.isStar = !s.b
          }
          return el
        })
        //this.getMsgData()
      }
    },
    async archiveItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.isCheckbox === true) {
              el.isArchive = true
            }
            return el
          })
        }
        //this.getMsgData()
      } else {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.id === s.id) {
              el.isArchive = !s.b
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
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.isCheckbox === true) {
              el.isDeleteMail = true
            }
            return el
          })
        }
        //this.getMsgData()
      }
    },
    async deleteItem(s) {
      if (s === "multiple") {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.isCheckbox === true) {
              el.isDelete = true
            }
            return el
          })
        }
        //this.getMsgData()
      } else {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.id === s.id) {
              el.isDelete = !s.b
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
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.isCheckbox === true) {
              el.isRead = true
            }
            return el
          })
        }
        //this.getMsgData()
      } else {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.id === s.id) {
              el.isRead = !s.b
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
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.isCheckbox === true) {
              el.isPostpone = true
            }
            return el
          })
        }
        //this.getMsgData()
      } else {
        let result = await apiPutMsgTag()
        if (result.status === 200) {
          this.msgStarData = this.msgStarData.map(el => {
            if (el.id === s.id) {
              el.isPostpone = !s.b
            }
            return el
          })
          //this.getMsgData()
        }
      }
    },
    async getMsgStarData() {
      let result = await apiGetMsgStarTag()
      this.msgStarData = result.data
    }
  }
}
</script>
