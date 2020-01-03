<template>
  <v-container fill-height>
    <v-card
      max-width="550"
      class="mx-auto"
      outlined
    >
      <v-card-title>
        <v-layout
          row
          wrap
          justify-center
          align-center
          class="font-weight-light"
        >
          <v-flex
            xs12
            class="img-title text-center mb-2"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/624/624497.png"
              height="28px"
              width="28px"
              class="mr-1"
            >
            <span class="body-2">榖鴿郵箱</span>
          </v-flex>
          <v-flex
            xs12
            class="text-center"
          >
            <span class="title">建立你的榖鴿帳戶</span>
          </v-flex>
        </v-layout>
      </v-card-title>
      <div class="pa-5">
        <validation-observer
          ref="obs"
          v-slot="{
        invalid,
        validated,
        passes,
        validate
      }"
        >
          <v-layout>
            <v-flex
              xs4
              class="py-0 px-2"
            >
              <v-text-field-with-validation
                v-model="userRegister.lName"
                rules="required|min:1|max:12"
                label="姓氏"
                outlined
                dense
              />
            </v-flex>
            <v-flex
              xs4
              class="py-0 px-2"
            >
              <v-text-field-with-validation
                v-model="userRegister.fName"
                rules="required|min:1|max:12"
                label="名字"
                outlined
                dense
              />
            </v-flex>
            <v-flex
              xs4
              class="py-0 px-2"
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
                    outlined
                    dense
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="userRegister.birthday"
                  no-title
                  scrollable
                >
                  <v-spacer />
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.startMenu.save(userRegister.birthday)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs3
              class="py-0 px-2"
            >
              <v-select-with-validation
                v-model="userRegister.gender"
                :items="genderOptions"
                rules="required"
                label="性別"
                outlined
                dense
              />
            </v-flex>
            <v-flex
              xs9
              class="py-0 px-2"
            >
              <v-text-field-with-validation
                v-model="userRegister.email"
                rules="required|email"
                label="信箱"
                outlined
                dense
              />
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex
              xs6
              class="py-0 px-2"
            >
              <v-text-field-with-validation
                ref="password"
                v-model="userRegister.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                rules="required|min:6|max:12|requireOneNumeric"
                label="密碼"
                outlined
                dense
                @click:append="showPassword = !showPassword"
              />
            </v-flex>
            <v-flex
              cols="6"
              class="py-0 px-2"
            >
              <v-text-field-with-validation
                v-model="userRegister.passwordConfirm"
                :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPasswordConfirm ? 'text' : 'password'"
                rules="required|min:6|max:12|confirmed:密碼"
                label="密碼確認"
                outlined
                dense
                @click:append="showPasswordConfirm = !showPasswordConfirm"
              />
            </v-flex>
          </v-layout>
          <v-btn
            text
            color="blue darken-1"
            class="float-left ma-2"
            @click.prevent="clear"
          >
            清空
          </v-btn>
          <v-btn
            text
            color="blue darken-1"
            class="float-left ma-2"
            @click="$router.push('/')"
          >
            改為登入帳戶
          </v-btn>
          <v-btn
            color="primary"
            class="float-right  ma-2"
            :disabled="invalid || !validated"
            @click.prevent="passes(register)"
          >
            送出
          </v-btn>
        </validation-observer>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userRegister: {
        lName: "",
        fName: "",
        birthday: "",
        gender: "",
        email: "",
        password: "",
        passwordConfirm: ""
      },
      genderOptions: [
        { text: "男", value: "male" },
        { text: "女", value: "female" },
        { text: "保密", value: "secret" }
      ],
      showPassword: false,
      showPasswordConfirm: false,
      startMenu: false
    }
  },
  methods: {
    async register() {
      let fetchData = { success: true }
      if (!fetchData.success) {
        return
      }
      this.userRegister = {}
      this.$router.push("/dashboard")
    },
    async clear() {
      this.userRegister = {}
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    }
  },
  created() {
    let now = new Date().getTime()
    let m = this.$moment(now).format("YYYY-MM-DD")
    this.userRegister.birthday = m
  }
}
</script>
