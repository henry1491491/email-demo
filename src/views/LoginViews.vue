<template>
  <v-container fill-height>
    <v-card
      :max-width="400"
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
            class="title text-center"
          >
            <img
              src="https://image.flaticon.com/icons/png/512/624/624497.png"
              height="35px"
              width="35px"
              class="mr-1"
            >
            <span>榖鴿郵箱</span>
          </v-flex>
          <v-flex
            xs12
            class="text-center"
          >
            登入
          </v-flex>
          <v-flex
            xs12
            class="text-center"
          >
            使用你的榖鴿帳戶登入
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
            rules="required|min:6|max:6"
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
        </validation-observer>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'LoginViews',
  data() {
    return {
      showPassword: false,
      userLogin: {
        email: '',
        password: ''
      },
      genderOptions: [
        { text: '男', value: 'male' },
        { text: '女', value: 'female' },
        { text: '不知道', value: 'unknow' }
      ]
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
      this.$router.push('/dashboard')
    },
    async clear(cardtype) {
      if (cardtype == 'register') {
        this.userRegister = {}
      } else if (cardtype == 'login') {
        this.userLogin = {}
      }
      requestAnimationFrame(() => {
        this.$refs.obs.reset()
      })
    }
  }
}
</script>
