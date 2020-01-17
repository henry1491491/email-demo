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
                block
                color="blue"
                dark
                text
                v-on="on"
              >
                撰寫
              </v-btn>
            </template>

            <v-card>
              <v-toolbar
                color="blue"
                dark
                dense
                flat
              >
                <v-toolbar-title class="text-left">
                  新郵件
                </v-toolbar-title>

                <v-spacer />

                <v-icon
                  @click="onCloseDialog"
                  class="mr-1"
                  v-text="'mdi-close-circle-outline'"
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
                  <v-textarea
                    v-model="message.content"
                    outlined
                  />
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-btn
                    @click.prevent="handleSubmit(postSendEmailData)"
                    color="blue"
                    v-text="'傳送'"
                  />

                  <v-spacer />
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-link'" />
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-emoticon-excited-outline'" />
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-google-drive'" />
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-image'" />
                  </v-btn>
                  <v-divider
                    vertical
                    class="mr-1"
                  />
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-dots-vertical'" />
                  </v-btn>
                  <v-btn
                    icon
                    small
                    class="mr-1"
                  >
                    <v-icon v-text="'mdi-delete'" />
                  </v-btn>
                </v-card-actions>
              </validation-observer>
            </v-card>
          </v-dialog>
        </div>
      </v-list>

      <v-divider />

      <v-list dense>
        <v-list-group
          v-for="item in showSidebarItems"
          v-model="item.active"
          :key="item.title"
          :prepend-icon="item.action"
          :append-icon="item.title === '類別' ? 'mdi-chevron-down' : ''"
          no-action
          @click="onSidebarItemHandler(item)"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title v-text="item.title" />
                <v-list-item-title
                  v-show="item.number > 0"
                  class="text-right"
                  v-text="item.number"
                />
              </div>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="subItem in item.items"
            :key="subItem.title"
            @click="onSidebarItemHandler(subItem)"
          >
            <v-list-item-content>
              <div class="d-flex">
                <v-list-item-title v-text="subItem.title" />
                <v-list-item-title
                  v-show="subItem.number > 0"
                  class="text-right"
                  v-text="subItem.number"
                />
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import {
  apiGetSidebarData,
  apiPostMsg,
  apiPostDraftData
} from "../../plugins/api"

export default {
  name: "TheNavbar",
  data() {
    return {
      drawer: null,
      dialog: false,
      message: {
        id: "",
        recipient: "",
        title: "",
        content: ""
      },
      userName: "小明",
      active: [],
      sidebarData: []
    }
  },
  computed: {
    showSidebarItems() {
      let sidebar_items = []
      let sidebar_items_sub = []
      let sidebarItem = {}
      let sidebarItemSub = {}

      this.sidebarData.forEach(el => {
        if (el.parent === "tags") {
          sidebarItemSub = {
            id: el.id,
            name: el.name,
            action: el.action,
            title: el.title,
            number: el.number,
            parent: el.parent
          }
          sidebar_items_sub.push(sidebarItemSub)
        } else if (el.children === "tags") {
          sidebarItem = {
            id: el.id,
            name: el.name,
            action: el.action,
            title: el.title,
            number: el.number,
            children: el.children,
            items: sidebar_items_sub
          }
          sidebar_items.push(sidebarItem)
        } else {
          sidebarItem = {
            id: el.id,
            name: el.name,
            action: el.action,
            title: el.title,
            number: el.number
          }
          sidebar_items.push(sidebarItem)
        }
      })
      return sidebar_items
    }
  },
  created() {
    this.getSidebarData()
    this.getMomentTime()
  },
  methods: {
    async onCloseDialog() {
      this.dialog = false

      let result = await this.postDraftData()
      if (result) {
        this.dialog = false
      }
    },
    async postDraftData() {
      let draftData = {
        id: this.message.id,
        recipient: this.message.recipient,
        title: this.message.title,
        content: this.message.content
      }
      apiPostDraftData()
    },
    async onSidebarItemHandler(item) {
      if (item.name === "inbox") {
        this.$router.push("/dashboard")
      } else if (item.name === "category") {
        return
      } else if (
        item.name === "social" ||
        item.name === "forum" ||
        item.name === "sales" ||
        item.name === "news"
      ) {
        this.$router.push(`/category/${item.name}`)
      } else {
        this.$router.push(`/${item.name}`)
      }
    },
    async getMomentTime() {
      let now = new Date().getTime()
      this.footerTime = this.moment(now).format("YYYY-MM-DD")
    },
    async getSidebarData() {
      let result = await apiGetSidebarData()
      this.sidebarData = result.data
    },
    async creatId() {
      let dateTime = new Date()
      const timestamp = Math.floor(dateTime / 1000)
      this.message.id = timestamp
      return this.message.id
    },
    async postSendEmailData() {
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
      let result
      result = await apiPostMsg()
      if (!result) {
        this.dialog = false
        return
      }
      this.dialog = false
    }
  }
}
</script>
