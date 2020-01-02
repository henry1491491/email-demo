<template>
  <v-list-item-group>
    <v-list-item inactive>
      <v-list-item-icon>
        <slot name="prepend-icon">
          <v-icon
            @click="selectMessageItem();iconWithSelectMessage = !iconWithSelectMessage"
            v-text="iconWithSelectMessage?'mdi-check-box-outline':'mdi-checkbox-blank-outline'"
            class="mr-1"
          />
          <v-icon
            :color="iconWithStarMessage?'yellow accent-4':'grey'"
            @click="starMessageItem();iconWithStarMessage =!iconWithStarMessage"
            v-text="iconWithStarMessage?'mdi-star':'mdi-star-outline'"
          />
        </slot>
      </v-list-item-icon>

      <v-list-item-content>
        <div class="d-flex justify-between">
          <v-list-item-title v-text="itemSender" />
          <v-list-item-title v-text="itemTitle" />
          <v-list-item-title v-text="itemContent" />
          <v-list-item-title
            v-html="moment(itemTime).format('MM-DD')"
            class="text-right"
          />
        </div>
      </v-list-item-content>

      <v-list-item-icon class="message-append-icons">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              @click="archiveMessageItem"
              v-on="on"
              v-text="'mdi-archive-arrow-down-outline'"
              class="mr-1"
            />
          </template>
          <span>封存</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              @click="deleteMessageItem"
              v-on="on"
              v-text="'mdi-delete-outline'"
              class="mr-1"
            />
          </template>
          <span>刪除</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              @click="readMessageItem"
              v-on="on"
              v-text="'mdi-email-open'"
              class="mr-1"
            />
          </template>
          <span>標示為已讀取</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              @click="postponeMessageItem"
              v-on="on"
              v-text="'mdi-clock'"
              class="mr-1"
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
    item: { type: Object },
    itemSender: { type: String },
    itemTitle: { type: String },
    itemContent: { type: String },
    itemTime: { type: String }
  },
  data() {
    return {
      color: "blue-grey darken-1",
      iconWithSelectMessage: false,
      iconWithStarMessage: false
    }
  },
  methods: {
    async selectMessageItem() {
      if (this.iconWithSelectMessage === false) {
        this.$emit("isSelected", { status: true })
      } else if (this.iconWithSelectMessage === true) {
        this.$emit("isSelected", { status: false })
      }
    },
    async starMessageItem() {},
    async archiveMessageItem() {
      let result
      this.item.isArchive = true
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      // 這邊把 { isArchive : true } put 出去
      if (!result) {
        return
      }
    },
    async deleteMessageItem() {
      let result
      this.item.isDelete = true
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      if (!result) {
        return
      }
    },
    async readMessageItem() {},
    async postponeMessageItem() {}
  }
}
</script>
<style lang="scss">
</style>
