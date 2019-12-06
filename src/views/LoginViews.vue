<template>
  <div class="views-login_view">
    <loading :active.sync="isLoading"></loading>
    <div class="a-test">
      <a
        @click="loginStatus = 'loginUser'"
        href="#"
      >loginUser</a> |
      <a
        @click="loginStatus = 'loginChooseUser'"
        href="#"
      >loginChooseUser</a> |
      <a
        @click="loginStatus = 'loginForgotEmail'"
        href="#"
      >loginForgotEmail</a> |
      <a
        @click="loginStatus = 'loginConfirmName'"
        href="#"
      >loginConfirmName</a> |
      <a
        @click="loginStatus = 'loginAccountNotFound'"
        href="#"
      >loginAccountNotFound</a> |
      <a
        @click="loginStatus = 'loginRegister'"
        href="#"
      >loginRegister</a> |
      <a
        @click="loginStatus = 'loginWelcome'"
        href="#"
      >loginWelcome</a> |
      <a
        @click="loginStatus = 'loginPrivateContact'"
        href="#"
      >loginPrivateContact</a> |
      <a
        @click="loginStatus = 'loginPassword'"
        href="#"
      >loginPassword</a> |
      <a
        @click="loginStatus = 'loginForgotPassword'"
        href="#"
      >loginForgotPassword</a> |
      <a
        @click="loginStatus = 'loginGetValidCode'"
        href="#"
      >loginGetValidCode</a> |
      <a
        @click="loginStatus = 'loginRecieveValidCode'"
        href="#"
      >loginRecieveValidCode</a> |
      <a
        @click="loginStatus = 'loginValidSuccess'"
        href="#"
      >loginValidSuccess</a> |
      <a
        @click="loginStatus = 'loginChangePassword'"
        href="#"
      >loginChangePassword</a> |
      <a
        @click="loginStatus = 'loginSucess'"
        href="#"
      >loginSucess</a>
    </div>

    <div class="login">
      <div class="card-logo-group">
        <div class="card-logo">
          <img
            src="https://image.flaticon.com/icons/svg/624/624497.svg"
            style="width:40px;height:40px"
            class="d-inline-block align-top"
            alt="DoveEmail"
          >
          <span class="card-logo-title">
            榖鴿郵箱
          </span>
        </div>
      </div>
      <div class="card-body">
        <!-- loginUser -->
        <div
          v-if="loginStatus == 'loginUser'"
          class="login-user"
        >
          <b-card
            title="登入"
            sub-title="使用你的榖鴿帳戶"
            class="login-card"
          >
            <ValidationObserver ref="form">
              <form @submit.prevent="loginHandler">
                <ValidationProvider
                  name="E-mail"
                  rules="required|email"
                >
                  <!--  加上 immediate 屬性可以在頁面一渲染及顯示驗證錯誤訊息-->
                  <div slot-scope="{ errors }">
                    <b-form-input
                      v-model="user.emailTelephone"
                      placeholder="電子郵件地址或電話號碼"
                    >
                    </b-form-input>
                    <p class="err-msg">{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>

                <b-card-text class="text-left">
                  <a
                    @click="loginStatus = 'loginForgotEmail'"
                    href="#"
                  >忘記電子郵件地址？</a>
                </b-card-text>
                <b-card-text class="text-left">
                  如果這不是你的電腦，請使用訪客模式以私密方式登入。<a href="#">瞭解詳情</a>
                </b-card-text>
                <div class="d-flex">
                  <b-dropdown
                    variant="outline-primary"
                    text="建立帳戶"
                    right
                    class="card-link mr-auto"
                  >
                    <b-dropdown-item>
                      <a
                        @click="loginStatus = 'loginRegister'"
                        href="#"
                      >建立個人帳戶</a>
                    </b-dropdown-item>
                    <b-dropdown-item>
                      <a
                        @click="loginStatus = 'loginRegister'"
                        href="#"
                      >建立管理業務帳戶</a>
                    </b-dropdown-item>
                  </b-dropdown>
                  <b-button
                    @click="loginHandler"
                    type="submit"
                    variant="primary"
                    class="pass-btn ml-auto"
                  >繼續</b-button>
                </div>
              </form>
            </ValidationObserver>
          </b-card>
        </div>
        <!-- loginPassword -->
        <div
          v-if="loginStatus == 'loginPassword'"
          class="login-password"
        >
          <b-card
            title="歡迎使用"
            sub-title=""
            class="login-card"
          >
            <div v-if="users.users.email">
              <b-alert show>
                <font-awesome-icon
                  class="mr-2"
                  icon="user"
                />
                <b>{{users.users.userName}}</b>
                您好！
              </b-alert>
            </div>
            <b-alert
              show
              variant="secondary"
            >帳號：{{users.users.email}}</b-alert>

            <ValidationProvider
              rules="required|requireOneNumeric|minmax:8,12"
              v-slot="{ errors }"
              name="密碼"
            >
              <b-form-input
                v-model="user.password"
                type="password"
                placeholder="輸入您的密碼"
                class="mt-3"
              >
              </b-form-input>
              <p class="err-msg">{{ errors[0] }}</p>
            </ValidationProvider>

            <div class="d-flex mt-3">
              <b-link
                @click="loginStatus = 'loginForgotPassword'"
                href="#"
                class="card-link mr-auto"
              >忘記密碼？</b-link>
              <b-button
                @click="loginPasswordHandler"
                variant="outline-primary"
              >繼續</b-button>
            </div>
          </b-card>
        </div>
        <!--loginChooseUser-->
        <div
          v-if="loginStatus == 'loginChooseUser'"
          class="login-choose-user"
        >
          <b-card
            title="選擇帳戶"
            sub-title=""
            class="login-card"
          >
            <b-list-group>
              <b-list-group-item>
                <font-awesome-icon icon="user" />
                <span>test123@gmail.com</span>
                <span>未登入</span>
              </b-list-group-item>
              <b-list-group-item>
                <font-awesome-icon icon="user" />
                <span>test456@gmail.com</span>
                <span>未登入</span>
              </b-list-group-item>
              <b-list-group-item>
                <font-awesome-icon icon="user" />
                <span>test789@gmail.com</span>
                <span>未登入</span>
              </b-list-group-item>
              <b-list-group-item>
                <font-awesome-icon icon="user" />
                <span>使用其他帳戶</span>
              </b-list-group-item>
              <b-list-group-item>
                <font-awesome-icon icon="user-minus" />
                <span>移除帳戶</span>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </div>
        <!-- loginForgotEmail -->
        <div
          v-if="loginStatus == 'loginForgotEmail'"
          class="login-forgot-email"
        >
          <b-card
            title="尋找你的電子郵件"
            sub-title="輸入你的備援電子郵件地址"
            class="login-card"
          >
            <ValidationProvider
              name="信箱"
              rules="required|email"
              immediate
            >
              <div slot-scope="{ errors }">
                <b-form-input
                  v-model="user.email"
                  placeholder="電子郵件地址"
                >
                </b-form-input>
                <p class="err-msg">{{ errors[0] }}</p>
              </div>
            </ValidationProvider>
            <div class="d-flex mt-3">
              <b-button
                @click="loginFindEmail"
                variant="primary"
                class="pass-btn ml-auto"
              >繼續</b-button>
            </div>
          </b-card>
        </div>
        <!--loginConfirmName-->
        <div
          v-if="loginStatus == 'loginConfirmName'"
          class="login-confirm-name"
        >
          <b-card
            title="你的名稱為何"
            sub-title="請輸入你的榖鴿帳戶登入名稱"
            class="login-card"
          >
            <ValidationObserver ref="formName">
              <form @submit.prevent="loginHandler">
                <ValidationProvider
                  name="姓氏"
                  rules="required"
                >
                  <div slot-scope="{ errors }">
                    <b-form-input
                      v-model="user.lName"
                      placeholder="姓氏"
                    >
                    </b-form-input>
                    <p class="err-msg">{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="名字"
                  rules="required"
                >
                  <div slot-scope="{ errors }">
                    <b-form-input
                      v-model="user.fName"
                      placeholder="名字"
                    >
                    </b-form-input>
                    <p class="err-msg">{{ errors[0] }}</p>
                  </div>
                </ValidationProvider>
              </form>
            </ValidationObserver>
            <div class="d-flex mt-3">
              <b-button
                @click="loginFindEmailByName"
                variant="primary"
                class="pass-btn ml-auto"
              >繼續</b-button>
            </div>
          </b-card>
        </div>
        <!--loginAccountNotFound-->
        <div
          v-if="loginStatus == 'loginAccountNotFound'"
          class="login-account-not-found"
        >
          <b-card
            title="找不到任何帳戶"
            sub-title="系統無法根據你提供的資訊找到相符的榖鴿帳戶。"
            class="login-card"
          >
            <div class="d-flex mt-3">
              <b-button
                @click="loginStatus = 'loginForgotEmail'"
                variant="primary"
                class="pass-btn ml-auto"
              >再試一次</b-button>
            </div>
          </b-card>
        </div>
        <!-- loginRegister -->
        <div
          v-if="loginStatus == 'loginRegister'"
          class="login-register"
        >
          <b-card
            title="建立您的榖鴿帳戶"
            sub-title=""
            class="login-card"
          >
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="username-input-group">
                  <div class="row">
                    <div class="col-md-6">
                      <ValidationProvider
                        name="姓氏"
                        rules="required|alpha"
                        v-slot="{ errors }"
                      >
                        <b-form-input
                          v-model="user.lastName"
                          placeholder="姓氏"
                        ></b-form-input>
                        <p class="err-msg">{{ errors[0] }}</p>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-6">
                      <ValidationProvider
                        name="名字"
                        rules="required|alpha"
                        v-slot="{ errors }"
                      >
                        <b-form-input
                          v-model="user.fName"
                          placeholder="名字"
                        ></b-form-input>
                        <p class="err-msg">{{ errors[0] }}</p>
                      </ValidationProvider>
                    </div>

                    <div class="col-md-12 mt-3">
                      <ValidationProvider
                        name="使用者名稱"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <b-form-input
                          v-model="user.userName"
                          placeholder="使用者名稱"
                        ></b-form-input>
                        <p class="err-msg">{{ errors[0] }}</p>
                      </ValidationProvider>
                    </div>
                  </div>
                </div>

                <b-card-text>您可以使用英文字母、數字和半形句號</b-card-text>
                <a href="#">改為使用我目前的電子郵件地址</a>

                <div class="username-input-group mt-3">
                  <div class="row">
                    <div class="col-md-5">
                      <ValidationProvider
                        name="密碼"
                        rules="required|password:@confirm"
                        v-slot="{ errors }"
                      >
                        <b-form-input
                          v-model="user.password"
                          placeholder="密碼"
                        ></b-form-input>
                        <p class="err-msg">{{ errors[0] }}</p>
                      </ValidationProvider>
                    </div>
                    <div class="col-md-5">
                      <ValidationProvider
                        name="確認"
                        vid="confirm"
                        rules="required"
                        v-slot="{ errors }"
                      >
                        <b-form-input
                          v-model="user.passwordConfirm"
                          placeholder="確認"
                        ></b-form-input>
                        <p class="err-msg">{{ errors[0] }}</p>
                      </ValidationProvider>
                    </div>
                    <div class="eye col-md-2">
                      <font-awesome-icon
                        class="icon mr-2"
                        icon="eye-slash"
                        @click="dispaly = !dispaly"
                        v-if="dispaly == false"
                      />
                      <font-awesome-icon
                        class="icon mr-2"
                        icon="eye"
                        @click="dispaly = !dispaly"
                        v-if="dispaly == true"
                      />
                    </div>
                  </div>
                </div>

                <b-card-text>請混合使用 8 個字元以上的英文字母、數字和符號 </b-card-text>
                <div class="d-flex mt-3">
                  <b-link
                    @click="loginStatus = 'loginUser'"
                    href="#"
                    class="card-link mr-auto"
                  >請改為登入帳戶</b-link>
                  <b-button
                    type="submit"
                    variant="outline-primary"
                  >繼續</b-button>
                </div>
              </form>
            </ValidationObserver>
          </b-card>
        </div>
        <!-- loginWelcome -->
        <div
          v-if="loginStatus == 'loginWelcome'"
          class="login-welcome"
        >
          <b-card
            title="歡迎使用"
            sub-title=""
            class="login-card"
          >
            <div class="username-input-group">
              <div class="row">
                <div class="col-md-2">
                  <b-form-select
                    v-model="user.contry"
                    :options="contryOptions"
                  ></b-form-select>
                </div>
                <div class="col-md-10">
                  <b-form-input
                    v-model="user.phone"
                    placeholder="輸入您的電話號碼"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <b-card-text class="text-left">我們會將您的電話號碼用於維護帳戶安全，並不會向他人顯示這項資訊</b-card-text>
            <div class="username-input-group">
              <div class="row">
                <div class="col-md-12">
                  <b-form-input
                    v-model="user.emailSpare"
                    placeholder="備援電子郵件地址(選填)"
                  ></b-form-input>
                </div>
              </div>
            </div>
            <b-card-text class="text-left">我們用來確保帳戶安全無虞</b-card-text>
            <div class="username-input-group">
              <div class="row">
                <div class="col-md-12">
                  <datepicker :value="state.date"></datepicker>
                </div>
              </div>
            </div>
            <b-card-text class="text-left">您的生日</b-card-text>
            <b-card-text class="text-left">
              <a
                href="#"
                class="text-left"
              >為何我們要求您提供這些資訊</a>
            </b-card-text>
            <div class="d-flex mt-3">
              <b-link
                href="#"
                class="card-link mr-auto"
              >返回</b-link>
              <b-button variant="outline-primary">繼續</b-button>
            </div>
          </b-card>
        </div>
        <!--loginPrivateContact-->
        <!-- loginForgotPassword-->
        <div
          v-if="loginStatus == 'loginForgotPassword'"
          class="login-forgot-password"
        >
          <b-card
            title="帳戶救援"
            sub-title=""
            class="login-card"
          >
            <b-form-select
              v-model="selected"
              :options="options"
            ></b-form-select>

            <b-card-text>請輸入印象中替這個榖鴿帳戶最後設定的密碼</b-card-text>

            <b-form-input
              v-model="user.password"
              placeholder="請輸入你最後設定的密碼"
              class="mt-3"
            >
            </b-form-input>
            <div class="d-flex mt-3">
              <b-link
                href="#"
                class="card-link mr-auto"
              >試試其他方法</b-link>
              <b-button variant="outline-primary">繼續</b-button>
            </div>
          </b-card>
        </div>
        <!--loginGetValidCode-->
        <!--loginRecieveValidCode-->
        <!--loginValidSuccess-->
        <!--loginChangePassword-->
        <!--loginSucess-->
        <!-- loginForgot-->
        <div
          v-if="loginStatus == 'loginForgot'"
          class="login-forgot"
        >
          <h4 class="card-body-title">帳戶救援</h4>
          <router-link
            class="choose-user-btn btn btn-outlinesecondary block mb-3"
            to="/"
          >
            <font-awesome-icon
              class="mr-2"
              icon="user"
            />{{user.email}}
            <font-awesome-icon
              class="ml-2"
              icon="chevron-down"
            />
          </router-link>

          <div class="card-detail">
            請輸入你印象中替這個 XX 帳戶最後設定的密碼
          </div>

          <div class="card-input-group">
            <b-form-input
              class="card-input"
              v-model="user.password"
              placeholder="輸入你最後設定的密碼"
            ></b-form-input>
          </div>

          <div class="card-body-btn d-flex mt-4">
            <a
              class="mr-auto"
              href="#"
            >試試其他方法</a>
            <b-button
              class="pass-btn"
              variant="primary"
            >繼續</b-button>
          </div>

        </div>
        <!--loginValidate-->
        <div
          v-if="loginStatus == 'loginValidate'"
          class="login-validate"
        >
          <h4 class="card-body-title">請驗證您的身份</h4>

          <router-link
            class="choose-user-btn btn btn-outlinesecondary block mb-3"
            to="/"
          >
            <font-awesome-icon
              class="mr-2"
              icon="user"
            />{{user.email}}
            <font-awesome-icon
              class="ml-2"
              icon="chevron-down"
            />
          </router-link>

          <div class="card-detail">
            無法辨別這個裝置。為了你的安全起見，XX 需要確定登入者是你本人。<a href="#">瞭解詳情</a>
          </div>

          <h4 style="text-align:left">嘗試其他登入方式</h4>
          <div class="other-way">
            <div>
              <font-awesome-icon
                class="mr-2 mt-2"
                icon="comment-dots"
              />透過以下電話號碼接收驗證碼：
            </div>
            <div>
              <font-awesome-icon
                class="mr-2 mt-2"
                icon="phone-square-alt"
              />撥打您所設定的電話號碼</div>
            <div>
              <font-awesome-icon
                class="mr-2 mt-2"
                icon="phone-square-alt"
              />確認您的備援電話號碼</div>
            <div>
              <font-awesome-icon
                class="mr-2 mt-2"
                icon="envelope"
              />確認備援電子郵件地址</div>
            <div>
              <font-awesome-icon
                class="mr-2 mt-2"
                icon="question-circle"
              />取得說明</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card-foot d-flex">
      <b-form-select
        v-model="selected"
        :options="options"
        size="sm"
        class="card-foot-left t-3 mr-auto"
      ></b-form-select>
      <span class="card-foot-right mr-3">
        <a href="#">說明</a>
      </span>
      <span class="card-foot-right mr-3">
        <a href="#">隱私權</a>
      </span>
      <span class="card-foot-right">
        <a href="#">條款</a>
      </span>
    </div>
  </div>
</template>

<script>
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import Datepicker from "vuejs-datepicker";
import { validate } from "vee-validate";
import { extend } from "vee-validate";

extend("requireOneNumeric", {
  validate(value) {
    return /.*[0-9].*/i.test(value); // 正規表達式
  },
  message: "{_field_} 至少需含一個數字"
});

extend("minmax", {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },
  params: ["min", "max"],
  message: "{_field_} 數字長度需介於{min}到{max}之間"
});

extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "密碼不一致"
});
export default {
  name: "LoginViews",
  components: {
    Loading,
    Datepicker
  },
  data() {
    return {
      isLoading: false,
      state: {
        date: new Date(2016, 9, 16)
      },
      loginStatus: "loginUser",
      tempUser: {
        id: "",
        contry: "",
        emailTelephone: "",
        fName: "",
        lName: "",
        userName: "",
        password: "",
        email: null,
        birthday: ""
      },
      user: {
        id: "",
        contry: "",
        emailTelephone: "",
        fName: "",
        lName: "",
        userName: "",
        password: "",
        email: null,
        birthday: ""
      },
      users: {},
      dispaly: false,
      contrySelected: null,
      contryOptions: [
        {
          value: null,
          text: "選擇國家"
        },
        {
          value: "TW",
          text: "台灣"
        }
      ],
      selected: null,
      options: [
        {
          value: null,
          text: "選擇語言"
        },
        {
          value: "a",
          text: "繁體中文"
        },
        {
          value: "b",
          text: "English"
        }
      ]
    };
  },
  methods: {
    /*
     * $ref 是 Vue 元件的一個屬性，可以用來取 Vue 的 Dom 元素，這邊就衍生了一堆不太   清的觀念比方說：
     * 1. $refs 跟 nextTick() 之間的搭配及 nextTick 與 生命週期
     * 2. 所謂地不能響應是什麼意思？
     * 3. $refs 是 Object 還是 Array，可以使用哪些方法是我需要知道的？
     * 4. 有些變數會有 $ 字號的前綴，那是本來變數名稱就是那樣還是特別的用法？都是哪來的？
     * 5. 用戶資料存放變數的設計
     * 6. 判斷有無重複資料
     * 7. 判斷是電話還是 E-mail 的機制
     */

    loginHandler() {
      this.$refs.form.validate().then(success => {
        if (!success) {
          return;
        }
        this.isLoading = true;
        window.setTimeout(() => {
          // 模擬後端取得成功的資料
          let res = {
            data: {
              success: true,
              message: "",
              userData: {
                id: 1,
                contry: "Taiwan",
                emailTelephone: "test123@gmail.com",
                fName: "Henry",
                lName: "Wu",
                userName: "test123",
                password: "test123",
                email: "test123@gmail.com",
                birthday: "1993/11/30"
              }
            }
          };
          // 假設 post 名稱後發現與資料庫內資料重複，則回應
          /*
          this.$refs.form.setErrors({
            email: ["This email is already taken"]
          });
          */
          if (res.data.success) {
            console.log(res);
            this.$set(this.users, "users", res.data.userData);
            this.user.emailTelephone = "";
            this.isLoading = false;
            this.loginStatus = "loginPassword";
          } else {
            res.data.message = "登入失敗！";
            this.user.emailTelephone = "";
            this.isLoading = false;
          }
        }, 1000);
        //然後透過 Axios 向後端 post 資料

        /*
        this.axios.post(api, this.user.emailTelephone).then(res => {
          if (!res.data.success) {
            console.log(err);
          }
          this.loginStatus = "loginPassword"; // 好奇這邊是不是不會響應？也就是畫面不會更新？是否就要使用 nextTick()?
          this.user.emailTelephone = "";
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        });
        */
      });
    },
    loginPasswordHandler() {
      let password = this.user.password;
      validate(password, "required|requireOneNumeric|minmax:8,12", {
        name: "密碼"
      }).then(result => {
        if (!result.valid) {
          return;
        }
        this.isLoading = true;
        window.setTimeout(() => {
          // 模擬後端取得成功的資料
          let res = {
            data: {
              userData: {
                id: 1,
                contry: "Taiwan",
                emailTelephone: "test123@gmail.com",
                fName: "Henry",
                lName: "Wu",
                userName: "test123",
                password: "test123",
                email: "test123@gmail.com",
                birthday: "1993/11/30"
              },
              success: true,
              message: ""
            }
          };
          if (res.data.success) {
            this.$set(this.users, "users", res.data.userData);
            this.user.password = "";
            this.isLoading = false;
            this.$router.push("/dashboard");
          } else {
            res.data.message = "登入失敗！";
            this.user.password = "";
            this.isLoading = false;
          }
        }, 1000);
      });
    },
    loginFindEmail() {
      let findemail = this.user.email;
      validate(findemail, "required|email", {
        name: "信箱"
      }).then(result => {
        if (!result.valid) {
          return;
        }
        this.isLoading = true;
        window.setTimeout(() => {
          // 模擬後端取得成功的資料
          let res = {
            data: {
              success: true,
              message: ""
            }
          };
          if (res.data.success) {
            this.user.email = "";
            this.isLoading = false;
            this.loginStatus = "loginConfirmName";
          } else {
            this.user.email = "";
            this.isLoading = false;
            this.loginStatus = "loginAccountNotFound";
          }
        }, 1000);
      });
    },
    loginFindEmailByName() {
      this.$refs.formName.validate().then(success => {
        if (!success) {
          return;
        }
        this.isLoading = true;
        window.setTimeout(() => {
          // 模擬後端取得成功的資料
          let res = {
            data: {
              success: true,
              message: ""
            }
          };
          if (res.data.success) {
            this.user.lName = this.user.fName = "";
            this.isLoading = false;
            this.loginStatus = "loginPassword";
          } else {
            this.user.lName = this.user.fName = "";
            this.isLoading = false;
            this.loginStatus = "loginAccountNotFound";
          }
        }, 1000);
      });
      /*
      let lName = this.user.lName;
      validate(lName, "required", { name: "姓氏" }).then(result => {
        if (!result.valid) {
          return;
        }
      });
      let fName = this.user.fName;
      validate(fName, "required", {
        name: "名字"
      }).then(result => {
        if (!result.valid) {
          return;
        }
        this.isLoading = true;
        window.setTimeout(() => {
          // 模擬後端取得成功的資料
          let res = {
            data: {
              success: true,
              message: ""
            }
          };
          if (res.data.success) {
            this.user.lName = this.user.fName = "";
            this.isLoading = false;
            this.loginStatus = "loginPassword";
          } else {
            this.user.lName = this.user.fName = "";
            this.isLoading = false;
            this.loginStatus = "loginAccountNotFound";
          }
        }, 1000);
      });*/
    },
    log(val) {
      this.date = val;
    }
  }
};
</script>

<style lang="scss">
</style>
