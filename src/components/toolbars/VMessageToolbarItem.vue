<template>
  <div>
    <v-toolbar
      dense
      flat
    >
      <v-toolbar-items>
        <v-btn
          icon
          small
          class="mr-1"
          @click="onGoBack"
        >
          <v-icon v-text="'mdi-arrow-left-bold'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-archive-arrow-down-outline'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-alert-octagon'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-delete'" />
        </v-btn>
        <v-divider
          vertical
          inset
          class="mr-1"
        />
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-email-open-multiple-outline'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-clock'" />
        </v-btn>
        <v-divider
          vertical
          inset
          class="mr-1"
        />
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-folder-move'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-tag'" />
        </v-btn>
        <v-btn
          icon
          small
          class="mr-1"
        >
          <v-icon v-text="'mdi-dots-vertical'" />
        </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <span
        class="caption"
        v-text="showItemStatus"
      ></span>

      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon
          @click="getMsgItemData(-1)"
          v-text="'mdi-chevron-left'"
        />
      </v-btn>
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon
          @click="getMsgItemData(1)"
          v-text="'mdi-chevron-right'"
        />
      </v-btn>
      <!--
      <v-btn icon>
        <v-icon v-text="'mdi-keyboard'" />
      </v-btn>
      <v-btn icon>
        <v-icon
          class="check-menu-down"
          v-text="'mdi-menu-down'"
        />
      </v-btn>
      -->
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon v-text="'mdi-settings'" />
      </v-btn>
    </v-toolbar>
    <v-divider />
  </div>
</template>

<script>
export default {
  name: "VMessageToolbarItem",
  props: {
    msgItem: { type: Object }
  },
  data() {
    return {
      itemStart: 1
    }
  },
  computed: {
    showItemStatus() {
      // let len = this.msgItems.length
      let len = 6
      if (!len) {
        return
      } else {
        return `第 ${this.itemStart} 個，共 ${len} 個`
      }
    }
  },
  methods: {
    getMsgItemData(item) {
      if (item === -1 && this.itemStart > 1) {
        this.$emit("get-item-msg-data", item)
        return
      }
      if (item === 1 && this.itemStart < 6) {
        this.$emit("get-item-msg-data", item)
        return
      }
      return
    },
    onGoBack() {
      this.$router.go(-1)
    }
  }
}
</script>

