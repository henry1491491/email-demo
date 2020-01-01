<template>
  <div>
    <v-app-bar
      app
      color="blue"
      dark
      clipped-left
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <img
        class="mr-2"
        height="28px"
        src="https://image.flaticon.com/icons/png/512/624/624497.png"
        width="28px"
      >
      <span class="title font-weight-light mr-2">榖鴿郵箱</span>

      <v-spacer />

      <v-text-field
        append-icon="mdi-chevron-down"
        dense
        dark
        flat
        hide-details
        label="搜尋郵件"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      />

      <v-spacer />

      <v-btn icon>
        <v-icon v-text="'mdi-help-circle-outline'" />
      </v-btn>
      <v-btn icon>
        <v-avatar size="34px">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      flat
      clipped
    >
      <v-list dense>
        <div>
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                block
                color="primary"
                dark
                text
              >
                撰寫
              </v-btn>
            </template>

            <v-card>
              <v-toolbar
                color="blue-grey"
                dark
                dense
                flat
              >
                <v-toolbar-title class="text-left">新郵件</v-toolbar-title>

                <v-spacer />

                <v-icon
                  v-text="'mdi-minus-circle-outline'"
                  class="mr-1"
                />
                <v-icon
                  v-text="'mdi-arrow-expand'"
                  class="mr-1"
                />
                <v-icon
                  v-text="'mdi-close-circle-outline'"
                  class="mr-1"
                />
              </v-toolbar>

              <v-spacer />

              <validation-observer v-slot="{ handleSubmit }">
                <v-card-text>
                  <v-text-field-with-validation
                    v-model="message.recipient"
                    rules="required|email"
                    label="收件人"
                    outlined
                    dense
                  />
                  <v-text-field-with-validation
                    v-model="message.title"
                    rules="max:40"
                    label="主旨"
                    outlined
                    dense
                  />
                  <v-textarea v-model="message.content" />
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-btn
                    @click.prevent="handleSubmit(sendEmail)"
                    v-text="'傳送'"
                    color="primary"
                  />

                  <v-spacer />

                  <v-icon
                    v-text="'mdi-link'"
                    class="mr-1"
                  />
                  <v-icon
                    v-text="'mdi-emoticon-excited-outline'"
                    class="mr-1"
                  />
                  <v-icon
                    v-text="'mdi-google-drive'"
                    class="mr-1"
                  />
                  <v-icon
                    v-text="'mdi-image'"
                    class="mr-1"
                  />

                  <v-spacer />

                  <v-icon
                    v-text="'mdi-dots-vertical'"
                    class="mr-1"
                  />
                  <v-icon
                    v-text="'mdi-delete'"
                    class="mr-1"
                  />
                </v-card-actions>
              </validation-observer>
            </v-card>
          </v-dialog>
        </div>
      </v-list>

      <v-divider />
      <!-- sidebar -->
      <v-list dense>
        <v-list-group
          v-for="item in sidebarItems[0]"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          :append-icon="item.title == '類別'?'mdi-chevron-down':''"
          @click="sidebarItemHandler(item)"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title v-text="item.title" />
                <v-list-item-title
                  v-show="item.number > 0"
                  v-text="item.number"
                  class="text-right"
                />
              </div>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="sidebarItemHandler(item)"
          >
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title v-text="subItem.title" />
                <v-list-item-title
                  v-show="subItem.number > 0"
                  v-text="subItem.number"
                  class="text-right"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>

    </v-navigation-drawer>

    <v-content>
      <div v-if="filterItem ==='管理標籤'">
        this is messagemanagement.
      </div>
      <div v-else>
        <v-toolbar dense>
          <v-toolbar-items v-if="showSelectBar">
            <v-icon
              @click="iconsToolbar.checkbox = !iconsToolbar.checkbox"
              v-text="iconsToolbar.checkbox?'mdi-check-box-outline':'mdi-checkbox-blank-outline'"
              class="mr-1"
            />
            <v-icon v-text="'mdi-menu-down'" />
            <v-icon v-text="'mdi-reload'" />
            <v-icon v-text="'mdi-dots-vertical'" />
          </v-toolbar-items>

          <v-toolbar-items v-else>
            <v-icon
              @click="selectedAllItem();iconsToolbar.checkbox = !iconsToolbar.checkbox"
              v-text="iconsToolbar.checkbox?'mdi-checkbox-blank-outline':'mdi-minus-box'"
            />
            <v-icon v-text="'mdi-menu-down'" />
            <v-icon
              v-text="'mdi-archive-arrow-down-outline'"
              class="mr-1"
            />
            <v-icon
              v-text="'mdi-delete-outline'"
              class="mr-1"
            />
            <v-icon
              v-text="'mdi-delete'"
              class="mr-1"
            />
            <v-divider
              vertical
              class="mr-2"
              inset
            />
            <v-icon
              v-text="'mdi-email-open-multiple'"
              class="mr-1"
            />
            <v-icon
              v-text="'mdi-clock'"
              class="mr-1"
            />
            <v-divider
              vertical
              class="mr-2"
              inset
            />
            <v-icon
              v-text="'mdi-folder-move'"
              class="mr-1"
            />
            <v-icon
              v-text="'mdi-tag'"
              class="mr-1"
            />
            <v-icon
              v-text="'mdi-dots-vertical'"
              class="mr-1"
            />
          </v-toolbar-items>

          <v-spacer />

          <span class="caption">1-50 列(共 1,884 列)</span>
          <v-icon
            v-text="'mdi-chevron-left'"
            class="mr-1"
          />
          <v-icon
            v-text="'mdi-chevron-right'"
            class="mr-1"
          />
          <v-icon
            v-text="'mdi-keyboard'"
            class="mr-1"
          />
          <v-icon
            v-text="'mdi-menu-down'"
            class="mr-1"
          />
          <v-icon
            v-text="'mdi-settings'"
            class="mr-1"
          />
        </v-toolbar>
        <!-- tabs -->
        <v-tabs>
          <v-tab>
            <v-icon
              v-text="'mdi-inbox'"
              class="mr-2"
            />
            <span>主要</span>
          </v-tab>
          <v-tab>
            <v-icon
              v-text="'mdi-account-multiple-outline'"
              class="mr-2"
            />
            <span>社交網路</span>
          </v-tab>
          <v-tab>
            <v-icon
              v-text="'mdi-tag'"
              class="mr-2"
            />
            <span>促銷內容</span>
          </v-tab>
        </v-tabs>
        <!-- 訊息列 -->
        <v-list dense>
          <v-message-item
            v-for="(item,key) in filterMessageItems"
            :key="key"
            :item="item"
            :item-sender="item.sender"
            :item-title="item.title"
            :item-content="item.content"
            :item-time="item.time"
            v-on:isSelected="selectedItem($event)"
          />
        </v-list>
      </div>
    </v-content>

    <v-footer>
      <v-spacer></v-spacer>
      <div> &copy;{{ moment(new Date()).format('YYYY-MM-DD')  }}</div>

    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Dahboard",
  data() {
    return {
      drawer: null,
      dialog: false,
      showMoreItems: false,
      footerYear: "",
      iconsToolbar: {
        checkbox: false
      },
      iconStatus: false,
      sidebarItems: [],
      messageItems: [],
      filterItem: "",
      message: {
        id: "",
        recipient: "",
        title: "",
        content: ""
      },
      userName: "小明",
      active: [],
      sidebarItems: [],
      isSelect: []
    }
  },
  computed: {
    showSelectBar() {
      let allFalse = item => item.status === false
      let result = this.isSelect.every(allFalse)
      if (result === true) {
        return result
      }
    },
    filterMessageItems() {
      let item = this.filterItem
      if (item == "全部" || item == "所有郵件") {
        return this.messageItems[0]
      }

      if (item == "收件夾") {
        return this.messageItems[0].filter(i => i.isArchive === false)
      } else if (item == "已加星號") {
        return this.messageItems[0].filter(i => i.isStar === true)
      } else if (item == "已延後") {
        return this.messageItems[0].filter(i => i.isPostpone === true)
      } else if (item == "寄件備份") {
        return this.messageItems[0].filter(i => i.isSend === true)
      } else if (item == "草稿") {
        return this.messageItems[0].filter(i => i.isDraft === true)
      } else if (item == "重要郵件") {
        return this.messageItems[0].filter(i => i.isImportant === true)
      } else if (item == "已排定時間") {
        return this.messageItems[0].filter(i => i.isSetTime === true)
      } else if (item == "所有郵件") {
        return this.messageItems[0].filter(i => i.isAll === true)
      } else if (item == "垃圾郵件") {
        return this.messageItems[0].filter(i => i.isDraft === true)
      }
      return this.messageItems[0]
    }
  },
  methods: {
    async selectedItem(e) {
      if (e.status === true) {
        this.isSelect.push(e)
      } else {
        this.isSelect.splice(0, 1)
      }
      console.log(this.isSelect)
    },
    async sidebarItemHandler(item) {
      this.filterItem = item.title
    },
    async creatId() {
      let dateTime = new Date()
      const timestamp = Math.floor(dateTime / 1000)
      this.message.id = timestamp
      return this.message.id
    },
    async sendEmail() {
      let id = this.creatId()
      let data = {
        id: id,
        isArchive: false,
        isCheck: false,
        isPostpone: false,
        isRead: false,
        isStar: false,
        tag: "",
        sender: this.userName,
        recipient: this.message.recipient,
        title: this.message.title,
        content: this.message.content,
        time: time
      }
      console.log(data)
      let result
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      if (!result) {
        return
      }
      this.getMessageItems()
    },
    async getSidebarItems() {
      let result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Nk6iFFry_"
      )
      if (!result) {
        return
      }
      result = JSON.parse(JSON.stringify(result.data))
      this.sidebarItems.push(result)
    },
    async getMessageItems() {
      let result
      result = await this.axios.get(
        "https://next.json-generator.com/api/json/get/Vyc5O-JkO"
      )
      if (!result) {
        return
      }
      result = JSON.parse(JSON.stringify(result.data))
      this.messageItems.push(result)
    }
  },
  created() {
    this.getSidebarItems()
    this.getMessageItems()
    let now = new Date().getTime()
    let m = this.moment(now).format("YYYY")
    this.footerYear = m
  }
}
</script>


