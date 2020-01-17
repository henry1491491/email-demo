<template>
  <div :class="{
    'listitems_vmessageitem-check' : msgItem.isCheckbox,
    'listitems_vmessageitem-read' : msgItem.isRead
    }">
    <v-list-item @click="onReadItem(msgItem.id,msgItem.isRead,'read')">
      <v-list-item-icon>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon
            @click.stop="onTagItemHandler(msgItem.id,msgItem.isCheckbox,'check')"
            v-text="msgItem.isCheckbox ?
          'mdi-check-box-outline' :
          'mdi-checkbox-blank-outline'"
          />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon
            :color="msgItem.isStar ? 'yellow accent-4' : 'grey'"
            @click.stop="onTagItemHandler(msgItem.id,msgItem.isStar,'star')"
            v-text="msgItem.isStar ? 'mdi-star' : 'mdi-star-outline'"
          />
        </v-btn>
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
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon
                @click.stop="onTagItemHandler(msgItem.id,msgItem.isArchive,'archive')"
                v-on="on"
                v-text="'mdi-archive-arrow-down-outline'"
              />
            </v-btn>
          </template>
          <span>封存</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon
                @click.stop="onTagItemHandler(msgItem.id,msgItem.isDelete,'delete')"
                v-on="on"
                v-text="'mdi-delete-outline'"
              />
            </v-btn>
          </template>
          <span>刪除</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon
                @click.stop="onTagItemHandler(msgItem.id,msgItem.isRead,'read')"
                v-on="on"
                v-text="msgItem.isRead ? 'mdi-email-open' : 'mdi-email'"
              />
            </v-btn>
          </template>
          <span>標示為已讀取</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              small
              class="mr-1"
            >
              <v-icon
                @click.stop="onTagItemHandler(msgItem.id,msgItem.isPostpone,'postpone')"
                v-on="on"
                v-text="'mdi-clock'"
              />
            </v-btn>
          </template>
          <span>延後</span>
        </v-tooltip>
      </v-list-item-icon>
    </v-list-item>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: "VMessageItem",
  props: {
    msgItem: { type: Object }
  },
  data() {
    return {
      color: "blue-grey darken-1"
    }
  },
  methods: {
    onTagItemHandler(id, isTag, tagName) {
      let status = {
        id,
        isTag,
        tagName
      }
      this.$emit("on-tag-item-handler", status)
    },
    onReadItem(id, isTag, tagName) {
      let status = {
        id,
        isTag,
        tagName
      }
      this.$emit("on-read-item", status)
    }
  }
}
</script>
<style lang="scss">
.listitems_vmessageitem-check {
  background-color: lightgrey;
}
.listitems_vmessageitem-read {
  background-color: lightgrey;
}
</style>
