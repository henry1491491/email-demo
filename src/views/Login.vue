<template>
  <v-container fill-height>
    <v-card
      min-width="350"
      class="mx-auto"
      outlined
    >
      <v-card-title class="d-flex justify-center">
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
            <span class="title">登入</span>
          </v-flex>
          <v-flex
            xs12
            class="text-center"
          >
            <span class="subtitle-1">使用你的榖鴿帳戶登入</span>
          </v-flex>
        </v-layout>
      </v-card-title>
      <div class="pa-5">
        <validation-observer v-slot="{
          invalid,
          validated,
          passes
        }">
          <v-text-field-with-validation
            v-model="userLogin.email"
            rules="required|email"
            label="信箱"
            outlined
            dense
          />
          <v-text-field-with-validation
            v-model="userLogin.password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            rules="required|min:6|max:12"
            label="密碼"
            outlined
            dense
          />
          <v-btn
            @click="$router.push('/register')"
            text
            color="blue darken-1"
            class="float-left ma-2"
          >
            註冊
          </v-btn>
          <v-btn
            :disabled="invalid || !validated"
            @click.prevent="passes(loginHandler)"
            color="primary"
            class="float-right ma-2"
          >
            登入
          </v-btn>
        </validation-observer>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showPassword: false,
      userLogin: {
        email: "",
        password: ""
      }
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
    }
  }
}
</script>
