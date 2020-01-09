<template>
  <v-list-item-group>
    <v-list-item inactive>
      <v-list-item-icon>
        <v-icon
          class="mr-1"
          @click="onCheckMsgItem(msgItem.isCheckbox)"
          v-text="msgItem.isCheckbox ? 'mdi-check-box-outline' : 'mdi-checkbox-blank-outline'"
        />
        <v-icon
          :color="msgItem.isStar ? 'yellow accent-4' : 'grey'"
          @click="onStarMsgItem(msgItem.isStar)"
          v-text="msgItem.isStar ? 'mdi-star' : 'mdi-star-outline'"
        />
      </v-list-item-icon>
      <slot name="content">
        <v-list-item-content>
          <div class="d-flex justify-between">
            <v-list-item-title v-text="msgItem.sender" />
            <v-list-item-title v-text="msgItem.title" />
            <v-list-item-title v-text="msgItem.content" />
            <v-list-item-title
              class="text-right"
              v-html="moment(msgItem.time).format('MM-DD')"
            />
          </div>
        </v-list-item-content>
      </slot>
      <v-list-item-icon class="message-append-icons">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-1"
              @click="onMessageItemArchive()"
              v-on="on"
              v-text="'mdi-archive-arrow-down-outline'"
            />
          </template>
          <span>封存</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-1"
              @click="onMessageItemDelete()"
              v-on="on"
              v-text="'mdi-delete-outline'"
            />
          </template>
          <span>刪除</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-1"
              @click="onMessageItemRead()"
              v-on="on"
              v-text="'mdi-email-open'"
            />
          </template>
          <span>標示為已讀取</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-1"
              @click="onMessageItemPostpone()"
              v-on="on"
              v-text="'mdi-clock'"
            />
          </template>
          <span>延後</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
  </v-list-item-group>
</template>

<script>
export default {
  name: "VMessageItem",
  props: {
    msgItem: { type: Object }
  },
  data() {
    return {
      propsMsgItem: this.msgItem,
      color: "blue-grey darken-1"
    }
  },
  methods: {
    /**
     * 勾選訊息，並通知各篩選頁面
     * 問題：checkbox 狀態是否需要 call api
     * @param b true, false
     */
    async onCheckMsgItem(b) {
      let status
      if (b === false) {
        this.propsMsgItem.isCheckbox = true
        eventBus.$emit("check-item", { status: b })
      } else {
        this.propsMsgItem.isCheckbox = false
        eventBus.$emit("check-item", { status: b })
      }
    },
    /**
     * 加上星號，並通知各篩選頁面
     * 問題：是否先 call api，然後才改變畫面，這樣一來是否 call 完再通知回此組件去改變畫面
     * @param b true, false
     */
    async onStarMsgItem(b) {
      let status
      if (b === false) {
        this.propsMsgItem.isStar = true
        eventBus.$emit("star-item", { status: b })
      } else {
        this.propsMsgItem.isStar = false
        eventBus.$emit("star-item", { status: b })
      }
    },
    async onMessageItemArchive(b) {},
    async onMessageItemDelete(b) {},
    async onMessageItemRead(b) {},
    async onMessageItemPostpone(b) {}
  }
}
</script>
