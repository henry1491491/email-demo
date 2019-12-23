<template>
  <v-app id="email">
    <v-app-bar
      app
      flat
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <span class="font-weight-light mr-2">榖鴿郵箱</span>
      <v-text-field
        flat
        hide-details
        label="搜尋郵件"
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-chevron-down"
        @click:append="$router.push('/')"
        solo-inverted
      >
      </v-text-field>
      <v-spacer />
      <v-btn icon>
        <v-avatar size="34px">
          <img
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          >
        </v-avatar>
      </v-btn>
      <!--
            <v-btn
            icon
          >
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-btn>
        -->
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
                text
                block
                color="red lighten-2"
                dark
                v-on="on"
              >
                撰寫
              </v-btn>
            </template>

            <v-card>
              <v-toolbar
                dense
                flat
                color="blue-grey"
                dark
              >
                <v-toolbar-title class="text-left">新郵件</v-toolbar-title>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-minus-circle-outline</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-arrow-expand</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-close-circle-outline</v-icon>
                </v-btn>
              </v-toolbar>

              <v-card-text>
                <v-text-field
                  label="收件人"
                  dense
                ></v-text-field>
                <v-text-field
                  label="主旨"
                  dense
                ></v-text-field>
                <v-textarea></v-textarea>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn
                  tile
                  color="primary"
                  outlined
                >傳送</v-btn>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      icon
                      v-on="on"
                      color="primary"
                      max-width="30"
                      outlined
                      dark
                      tile
                      class="btn-append"
                    >
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-icon
                        color="primary"
                        class="mr-1"
                      >mdi-send-clock</v-icon>
                      <v-list-item-title>排定傳送時間</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <v-btn icon>
                  <v-icon>mdi-format-coor-text</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-paper-clip</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-link</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-emoticon-excited-outline</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-google-drive</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-image</v-icon>
                </v-btn>
                <v-spacer />
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <v-divider />
        <v-sidebar-item
          iconname="inbox"
          titlename="收件夾"
          num="12"
        />
        <v-sidebar-item
          iconname="star"
          titlename="已加星號"
          num="12"
        />
        <v-sidebar-item
          iconname="clock-outline"
          titlename="已延後"
          num="12"
        />
        <v-sidebar-item
          iconname="send"
          titlename="寄件備份"
          num="12"
        />
        <v-sidebar-item
          iconname="file"
          titlename="草稿"
          num="12"
        />
        <v-sidebar-item
          v-on:showmore="showMoreItems"
          :iconname="showMoreIcon?'chevron-down':'chevron-up'"
          :titlename="showMoreIcon?'更多':'更少'"
        />
        <v-sidebar-item
          iconname="star-circle-outline"
          titlename="重要郵件"
          num="12"
        />
        <v-sidebar-item
          iconname="send-clock"
          titlename="已排定時間"
          num="12"
        />
        <v-sidebar-item
          iconname="email"
          titlename="所有郵件"
          num="12"
        />
        <v-sidebar-item
          iconname="alert-circle-outline"
          titlename="垃圾郵件"
          num="12"
        />
        <v-sidebar-item
          iconname="delete"
          titlename="垃圾桶"
          num="12"
        />
        <v-sidebar-item
          iconname="tag"
          titlename="類別"
          num="12"
        />
        <v-sidebar-item
          iconname="settings"
          titlename="管理標籤"
          num="12"
        />
        <v-sidebar-item
          iconname="plus"
          titlename="建立新標籤"
          num="12"
        />
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-banner
        single-line
        tile
      >
        <div class="d-flex align-center">
          <v-btn
            icon
            :color="color"
          >
            <v-icon>
              mdi-square-outline
            </v-icon>
          </v-btn>
          <v-btn
            icon
            :color="color"
            class="mr-2"
          >
            <v-icon>
              mdi-menu-down
            </v-icon>
          </v-btn>
          <v-btn
            icon
            :color="color"
            class="mr-2"
          >
            <v-icon>
              mdi-reload
            </v-icon>
          </v-btn>
          <v-btn
            icon
            :color="color"
            class="mr-2"
          >
            <v-icon>
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </div>
        <template v-slot:actions>
          <v-btn text>
            <span>1-50 列(共 1,884 列)</span>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-keyboard</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-menu-down</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-settings</v-icon>
          </v-btn>
        </template>
      </v-banner>

      <v-tabs>
        <v-tab>
          <v-icon class="mr-2">mdi-inbox</v-icon>
          <span>主要</span>
        </v-tab>
        <v-tab>
          <v-icon class="mr-2">mdi-account-multiple-outline</v-icon>
          <span>社交網路</span>
        </v-tab>
        <v-tab>
          <v-icon class="mr-2">mdi-tag</v-icon>
          <span>促銷內容</span>
        </v-tab>
      </v-tabs>
      <v-msg-item
        v-for="i in 30"
        :key="i"
      />
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      showMoreIcon: true
    }
  },
  methods: {
    showMoreItems(t) {
      if (t.icon == "更多") {
        this.showMoreIcon = false
      } else if (t.icon == "更少") {
        this.showMoreIcon = true
      }
    }
  }
}
</script>

<style lang="scss">
</style>

