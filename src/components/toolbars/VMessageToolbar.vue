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
        >
          <v-icon
            @click="onTagMultipleItemHandler(showCheckStatus)"
            v-text="showIcons"
          />
        </v-btn>
        <v-menu
          bottom
          offset-x
          dense
        >
          <template v-slot:activator="{ on }">
            <v-icon
              class="check-menu-down mr-2"
              v-on="on"
              v-text="'mdi-menu-down'"
            />
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in checkboxList"
              :key="i"
              @click="onChooseCheckItems(item.title)"
            >
              <v-list-item-title v-text="item.title" />
            </v-list-item>
          </v-list>
        </v-menu>

        <div
          v-if="showCheckStatus === 'none'"
          class="d-flex align-center"
        >
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon v-text="'mdi-reload'" />
          </v-btn>
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon v-text="'mdi-dots-vertical'" />
          </v-btn>
        </div>
        <div
          v-if="showCheckStatus === 'all' || showCheckStatus === 'part'"
          class="d-flex align-center"
        >
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon
              @click="onTagMultipleItemHandler('archive')"
              v-text="'mdi-archive-arrow-down-outline'"
            />
          </v-btn>
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon
              @click="onTagMultipleItemHandler('deletemail')"
              v-text="'mdi-alert-circle'"
            />
          </v-btn>
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon
              @click="onTagMultipleItemHandler('delete')"
              v-text="'mdi-delete'"
            />
          </v-btn>
          <v-divider
            vertical
            class="mr-1"
            inset
          />
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon
              @click="onTagMultipleItemHandler('read')"
              v-text="'mdi-email-open-multiple'"
            />
          </v-btn>
          <v-btn
            icon
            small
            class="mr-1"
          >
            <v-icon
              @click="onTagMultipleItemHandler('postpone')"
              v-text="'mdi-clock'"
            />
          </v-btn>
          <v-divider
            vertical
            class="mr-1"
            inset
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
        </div>
      </v-toolbar-items>

      <v-spacer />

      <span
        class="caption"
        v-text="showPageStatus"
      ></span>
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon
          @click="getMsgData(-1)"
          v-text="'mdi-chevron-left'"
        />
      </v-btn>
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon
          @click="getMsgData(1)"
          v-text="'mdi-chevron-right'"
        />
      </v-btn>
      <!--
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon v-text="'mdi-keyboard'" />
      </v-btn>
      <v-btn
        icon
        small
        class="mr-1"
      >
        <v-icon
          class="check-menu-down mr-2"
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
  name: "VMessageToolbar",
  props: {
    msgItems: { type: Array },
    msgItem: { type: Object }
  },
  data() {
    return {
      checkboxList: [
        { title: "全選" },
        { title: "全不選" },
        { title: "已讀郵件" },
        { title: "未讀郵件" },
        { title: "已加星號" },
        { title: "未加星號" }
      ],
      rowNumber: 5,
      rowStart: 1
    }
  },
  computed: {
    showPageStatus() {
      let len = this.msgItems.length
      if (!len) {
        return
      } else if (len < this.rowNumber && len !== 0) {
        return `${this.rowStart} - ${len} 列 (共 ${len} 列)`
      } else if (len > this.rowNumber) {
        return `${this.rowStart} - ${this.rowNumber} 列 (共 ${len} 列)`
      }
    },
    showIcons() {
      if (this.showCheckStatus === "none") {
        return "mdi-checkbox-blank-outline"
      } else if (this.showCheckStatus === "all") {
        return "mdi-check-box-outline"
      } else if (this.showCheckStatus === "part") {
        return "mdi-minus-box"
      }
    },
    showCheckStatus: {
      get() {
        let isNone = this.msgItems.every(el => el.isCheckbox === false)
        let isAll = this.msgItems.every(el => el.isCheckbox === true)
        if (isAll) {
          return "all"
        } else if (isNone) {
          return "none"
        } else if (!isAll && !isNone) {
          return "part"
        }
      },
      set() {}
    }
  },
  methods: {
    onTagMultipleItemHandler(tagName) {
      this.$emit("on-tag-multiple-item-handler", tagName)
    },
    getMsgData(page) {
      if (page === -1 && this.rowStart > 1) {
        this.$emit("get-page-msg-data", page)
        return
      }
      if (page === 1 && this.rowNumber < this.msgItems.length) {
        this.$emit("get-page-msg-data", page)
        return
      }
      return
    },
    onChooseCheckItems(title) {
      this.$emit("choose-check-items", title)
    }
  }
}
</script>

<style lang="scss">
.check-menu-down {
  //border: 1px solid green;
  width: 12px;
}
</style>
