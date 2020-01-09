<template>
  <div>
    <v-toolbar
      dense
      flat
    >
      <v-toolbar-items>
        <v-icon
          v-show="checkStatus === 'none'"
          @click="onCheckAll('none')"
          v-text="'mdi-checkbox-blank-outline'"
        />
        <v-icon
          v-show="checkStatus === 'all'"
          @click="onCheckAll('all')"
          v-text="'mdi-check-box-outline'"
        />
        <v-icon
          v-show="checkStatus === 'part'"
          @click="onCheckAll('part')"
          v-text="'mdi-minus-box'"
        />
        <!--divider-->
        <!--menu of menudown-->

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
              @click=""
            >
              <v-list-item-title v-text="item.title" />
            </v-list-item>
          </v-list>
        </v-menu>

        <div
          v-if="checkStatus === 'none'"
          class="d-flex align-center"
        >
          <v-icon
            class="mr-2"
            v-text="'mdi-reload'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-dots-vertical'"
          />
        </div>
        <div
          v-if="checkStatus === 'all' || checkStatus === 'part'"
          class="d-flex align-center"
        >
          <v-icon
            class="mr-2"
            v-text="'mdi-archive-arrow-down-outline'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-delete-outline'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-delete'"
          />
          <v-divider
            vertical
            class="mr-2"
            inset
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-email-open-multiple'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-clock'"
          />
          <v-divider
            vertical
            class="mr-2"
            inset
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-folder-move'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-tag'"
          />
          <v-icon
            class="mr-2"
            v-text="'mdi-dots-vertical'"
          />
        </div>
      </v-toolbar-items>

      <v-spacer />

      <span
        class="caption"
        v-text="showPageStatus"
      ></span>

      <v-icon
        class="mr-4"
        @click="getPageMsgData('left')"
        v-text="'mdi-chevron-left'"
      />
      <v-icon
        class="mr-2"
        @click="getPageMsgData('right')"
        v-text="'mdi-chevron-right'"
      />

      <v-icon v-text="'mdi-keyboard'" />
      <v-icon
        class="check-menu-down mr-2"
        v-text="'mdi-menu-down'"
      />
      <v-icon
        class="mr-2"
        v-text="'mdi-settings'"
      />
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "VMessageToolbar",
  props: {
    msgItems: { type: Array }
  },
  data() {
    return {
      propsItem: this.msgItems,
      checkStatus: "none",
      checkboxList: [
        { title: "全選" },
        { title: "全不選" },
        { title: "已讀郵件" },
        { title: "未讀郵件" },
        { title: "已加星號" },
        { title: "已加星號" }
      ],
      startPageRow: 1
    }
  },
  computed: {
    showPageStatus() {
      let start = this.startPageRow
      let len = this.msgItems.length
      if (start + 9 < len) {
        return `${start} - ${start + 9} 列（ 共 ${len} 列 ）`
      } else if (start < len && start + 9 > len) {
        return `${start} - ${len} 列（ 共 ${len} 列 ）`
      }
    }
  },
  created() {
    eventBus.$on("check-status", this.onCheckStatus)
  },
  beforeDestroy() {
    eventBus.$on("check-status", this.onCheckStatus)
  },
  methods: {
    /**
     * 選擇分頁，並通知篩選頁面發出該頁面訊息列請求
     * @param {string} d 選擇分頁
     */
    async getPageMsgData(d) {
      let start = this.startPageRow
      let len = this.msgItems.length
      if (d === "left" && start > 1) {
        eventBus.$emit("get-page", { start })
        start = start - 10
      } else if (d === "right" && start + 9 < len) {
        eventBus.$emit("get-page", { start })
        this.startPageRow = this.startPageRow + 10
      }
    },
    /**
     * 勾選全部訊息、取消勾選訊息
     * @param {string} s none, part, all
     */
    async onCheckAll(s) {
      if (s === "none") {
        this.checkStatus = "all"
        eventBus.$emit("check-all-items", { s })
      } else if (s === "all") {
        this.checkStatus = "none"
        eventBus.$emit("check-all-items", { s })
      } else if (s === "part") {
        this.checkStatus = "none"
        eventBus.$emit("check-all-items", { s })
      }
    },
    /**
     * 接收各篩選頁面的 checkbox 統計，判斷是否全選、部分或是全部選
     * @param t [0]:勾選數、[1]:訊息總數
     */
    async onCheckStatus(t) {
      if (t[0] === 0) {
        this.checkStatus = "none"
      } else if (t[0] !== t[1]) {
        this.checkStatus = "part"
      } else if (t[0] === t[1] && t[0] !== 0) {
        this.checkStatus = "all"
      }
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
