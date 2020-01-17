<template>
  <div>
    <v-message-toolbar-item
      :msgItem="inboxMsgData"
      v-on:get-item-msg-data="getItemMsgData"
    />

    <v-card
      class="ma-2"
      outlined
    >
      <v-card-title>
        <v-row
          d-flex
          justify-center
          class="mx-3"
        >
          <div
            class="headline mb-1 mr-2"
            v-text="inboxMsgData.title"
          ></div>
          <div>
            <v-btn
              depressed
              x-small
              color="primary"
            >收件夾</v-btn>
          </div>
        </v-row>

        <v-spacer />
        <v-btn
          icon
          small
        >
          <v-icon v-text="'mdi-printer'" />
        </v-btn>
        <v-btn
          icon
          small
        >
          <v-icon v-text="'mdi-arrow-top-right'" />
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-row
          d-flex
          justify-center
          class="mx-3"
        >
          <div
            class="subtitle-2 black--text mr-2"
            v-text="inboxMsgData.sender"
          >
          </div>
          <div v-text="'<kawasakininja@gmail.com>'">
          </div>
          <v-spacer />
          <div
            class="mr-2"
            v-text="showDate"
          ></div>
          <div>
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon v-text="'mdi-star-outline'" />
            </v-btn>
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon v-text="'mdi-reply'" />
            </v-btn>
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon v-text="'mdi-dots-vertical'" />
            </v-btn>
          </div>
        </v-row>

        <div
          class="caption mx-3"
          v-text="showSubtitle"
        >
        </div>
      </v-card-text>

      <v-card-text
        class="headline font-weight-bold mx-3"
        v-text="inboxMsgData.content"
      >

      </v-card-text>

      <v-card-actions class="mx-3">
        <v-btn
          outlined
          small
        >
          <v-icon
            left
            v-text="'mdi-reply'"
          />
          回覆
        </v-btn>

        <v-btn
          outlined
          small
        >
          <v-icon
            left
            v-text="'mdi-arrow-right-bold'"
          />
          轉寄
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
/**
 * api 丟參數部分還沒寫
 */
import { apiGetMsgPageData } from "../../../plugins/api"
export default {
  name: "TheInboxMessage",
  data() {
    return {
      inboxMsgData: {}
    }
  },
  computed: {
    showSubtitle() {
      return `寄給 ${this.inboxMsgData.recipient}`
    },
    showDate() {
      let data = this.moment(this.inboxMsgData.time).format(
        `YYYY年M月D日 AHH:mm`
      )
      let dateFromNow = this.moment(this.inboxMsgData.time).fromNow()
      return `${data}  ${dateFromNow}`
    }
  },
  created() {
    this.getInboxMsgData()
  },
  methods: {
    async getInboxMsgData() {
      let result
      result = await apiGetMsgPageData()
      if (result.status !== 200) {
        return
      } else {
        this.inboxMsgData = result.data[0]
      }
    },
    async getItemMsgData() {
      this.getInboxMsgData()
    }
  }
}
</script>
