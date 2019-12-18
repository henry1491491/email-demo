<template>
  <v-app>
    <v-container>
      <v-row>
        <v-card
          :max-width="changeStyle"
          class="mx-auto"
          outlined
        >
          <v-card-title class="d-flex justify-center">
            <img
              src="https://image.flaticon.com/icons/png/512/624/624497.png"
              height="35px"
              width="35px"
              class="mr-1"
            >
            <span class="title font-weight-light">
              榖鴿郵箱
            </span>
          </v-card-title>
          <v-list-item align="center">
            <v-list-item-content>
              <v-list-item-title
                v-show="show.card=='login'"
                class="headline mb-3"
              >
                登入
              </v-list-item-title>
              <v-list-item-title
                v-show="show.card=='register'"
                class="headline mb-3"
              >
                建立榖鴿帳戶
              </v-list-item-title>
              <v-list-item-subtitle
                v-show="show.card=='login'"
                class="py-2"
              >
                使用你的榖鴿帳戶登入
              </v-list-item-subtitle>
              <!-- login-Content -->
              <div v-show="show.card=='login'">
                <validation-observer v-slot="{
                      invalid,
                      validated,
                      passes
                      }">
                  <v-form>
                    <v-text-field-with-validation
                      v-model="userLogin.email"
                      rules="required|email"
                      label="信箱"
                      outlined
                      dense
                    />
                    <v-text-field-with-validation
                      v-model="userLogin.password"
                      :append-icon="show.icon.eye ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show.icon.eye ? 'text' : 'password'"
                      @click:append="show.icon.eye = !show.icon.eye"
                      rules="required|minmax:6,12"
                      label="密碼"
                      outlined
                      dense
                    />
                    <v-btn
                      @click.prevent="clear('login')"
                      text
                      color="blue darken-1"
                      class="float-left"
                    >
                      清空
                    </v-btn>
                    <v-btn
                      @click.prevent="show.card='register'"
                      text
                      color="blue darken-1"
                      class="float-left"
                    >
                      註冊
                    </v-btn>
                    <v-btn
                      @click.prevent="passes(loginHandler)"
                      :disabled="invalid || !validated"
                      color="primary"
                      class="float-right"
                    >
                      登入
                    </v-btn>
                  </v-form>
                </validation-observer>
              </div>
              <!--register-Content-->
              <div v-show="show.card=='register'">
                <validation-observer
                  ref="obs"
                  v-slot="{
                      invalid,
                      validated,
                      passes,
                      validate
                      }"
                >
                  <v-form>
                    <v-row>
                      <v-col
                        cols="4"
                        class="py-0"
                      >
                        <v-text-field-with-validation
                          v-model="userRegister.lName"
                          rules="required|minmax:1,6"
                          label="姓氏"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="4"
                        class="py-0"
                      >
                        <v-text-field-with-validation
                          v-model="userRegister.fName"
                          rules="required|minmax:1,12"
                          label="名字"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="4"
                        class="py-0"
                      >
                        <v-menu
                          ref="startMenu"
                          v-model="startMenu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="startMenu"
                          transition="scale-transition"
                          min-width="290px"
                          offset-y
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="userRegister.birthday"
                              prepend-icon="mdi-calendar"
                              label="出生日期"
                              readonly
                              v-on="on"
                              outlined
                              dense
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="userRegister.birthday"
                            no-title
                            scrollable
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.startMenu.save(userRegister.birthday)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="3"
                        class="py-0"
                      >
                        <v-select-with-validation
                          v-model="userRegister.gender"
                          rules="required"
                          :items="genderOptions"
                          label="性別"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="9"
                        class="py-0"
                      >
                        <v-text-field-with-validation
                          v-model="userRegister.email"
                          rules="required|email"
                          label="信箱"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        class="py-0"
                      >
                        <v-text-field-with-validation
                          v-model="userRegister.password"
                          :append-icon="show.icon.eye ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show.icon.eye ? 'text' : 'password'"
                          @click:append="show.icon.eye = !show.icon.eye"
                          rules="required|minmax:6,12|requireOneNumeric"
                          ref="password"
                          label="密碼"
                          outlined
                          dense
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        class="py-0"
                      >
                        <v-text-field-with-validation
                          v-model="userRegister.passwordConfirm"
                          :append-icon="show.icon.eyeConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                          :type="show.icon.eyeConfirm ? 'text' : 'password'"
                          @click:append="show.icon.eyeConfirm = !show.icon.eyeConfirm"
                          rules="required|minmax:6,12|confirmed:密碼"
                          label="密碼確認"
                          outlined
                          dense
                        />
                      </v-col>
                    </v-row>
                    <v-btn
                      @click.prevent="clear('register')"
                      text
                      color="blue darken-1"
                      class="float-left"
                    >
                      清空
                    </v-btn>
                    <v-btn
                      @click.prevent="show.card='login'"
                      text
                      color="blue darken-1"
                      class="float-left"
                    >
                      改為登入帳戶
                    </v-btn>
                    <v-btn
                      @click.prevent="passes(register)"
                      :disabled="invalid || !validated"
                      color="primary"
                      class="float-right"
                    >
                      送出
                    </v-btn>
                  </v-form>
                </validation-observer>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "LoginViews",
  data() {
    return {
      show: {
        card: "login",
        icon: {
          eye: false,
          eyeConfirm: false
        },
        maxWidth: ""
      },
      userLogin: {
        email: "",
        password: ""
      },
      userRegister: {
        lName: "",
        fName: "",
        // 將 ISO 8601 時間轉為 YYYY-MM-DDTHH:mm:ss.sssZ 字串格式，用 substr 取第 1 到第 9 個字串
        birthday: new Date().toISOString().substr(0, 10),
        gender: "",
        email: "",
        password: "",
        passwordConfirm: ""
      },
      genderOptions: [
        { text: "男", value: "male" },
        { text: "女", value: "female" },
        { text: "不知道", value: "unknow" }
      ],
      // Date-Picker 的 menu 的狀態
      startMenu: false
    }
  },
  methods: {
    async loginHandler() {
      // 執行 ajax，回傳 fetchData
      let fetchData = { success: true }
      if (!fetchData.success) {
        return
      }
      this.userLogin = {}
      this.$router.push("/dashboard")
    },
    async register() {
      let fetchData = { success: true }
      if (!fetchData.success) {
        return
      }
      this.userRegister = {}
      this.$router.push("/dashboard")
    },
    async clear(cardtype) {
      if (cardtype == "register") {
        this.userRegister = {}
      } else if (cardtype == "login") {
        this.userLogin = {}
      }
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    }
  },
  computed: {
    changeStyle() {
      if (this.show.card == "login") {
        this.show.maxWidth = 366
        return this.show.maxWidth
      } else if (this.show.card == "register") {
        this.show.maxWidth = 554
        return this.show.maxWidth
      }
    }
  }
}
</script>
