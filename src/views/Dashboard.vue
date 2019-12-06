<template>
  <div class="views-dashboard">
    <div class="row">
      <!--Navbar-->
      <div class="navbar-custom col-md-12">
        <b-navbar
          toggleable="sm"
          type="dark"
          variant="primary"
        >
          <b-navbar-brand
            @click="status.navSwitchStatus = !status.navSwitchStatus"
            href="#"
          >
            <font-awesome-icon
              v-if="status.navSwitchStatus == true"
              icon="toggle-on"
            />
            <font-awesome-icon
              v-if="status.navSwitchStatus == false"
              icon="toggle-off"
            />
          </b-navbar-brand>
          <b-navbar-brand href="
              #">
            <img
              src="https://image.flaticon.com/icons/svg/624/624497.svg"
              style="width:40px;height:30px"
              class="d-inline-block align-top mr-1"
              alt="Kitten"
            >
            <span class="brand-logo-title">榖鴿郵箱</span>
          </b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse
            id="nav-collapse"
            is-nav
          >
            <b-navbar-nav>
              <b-nav-form>
                <b-button
                  size="sm"
                  class="my-2 my-sm-0"
                  variant="primary"
                >
                  <font-awesome-icon icon="search" />
                </b-button>
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="搜尋郵件"
                >
                </b-form-input>
                <b-button
                  size="sm"
                  type="submit"
                  variant="primary"
                  class="my-2 my-sm-0"
                >
                  <font-awesome-icon icon="chevron-down" />
                </b-button>
              </b-nav-form>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-navbar-brand>
                <font-awesome-icon :icon="['far','question-circle']" />
              </b-navbar-brand>

              <b-navbar-brand>
                <font-awesome-icon icon="th" />
              </b-navbar-brand>

              <b-navbar-brand @click="show=true">
                <img
                  src="https://image.flaticon.com/icons/svg/1703/1703143.svg"
                  style="width:40px;height:30px;border-radius: 50%;"
                >
              </b-navbar-brand>
              <!--Modal-->

            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>
    <div class="row">
      <!--Sidebar-->
      <div class="sidebar-custom lineb col-md-3">
        <b-nav
          vertical
          class="sidebar-nav"
        >
          <b-nav-item>
            <b-button
              variant="primary"
              size="sm"
            >
              <span class="text-white">撰寫</span>
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <font-awesome-icon icon="inbox" />
            <span>收件夾</span>
            <b-badge variant="primary">10</b-badge>
          </b-nav-item>
          <b-nav-item>
            <font-awesome-icon icon="star" />
            <span>已加星號</span>
          </b-nav-item>
          <b-nav-item>
            <font-awesome-icon icon="clock" />
            <span>已延後</span>
          </b-nav-item>
          <b-nav-item>
            <font-awesome-icon icon="paper-plane" />
            <span>寄件備份</span>
          </b-nav-item>
          <b-nav-item>
            <font-awesome-icon icon="sticky-note" />
            <span>草稿</span>
          </b-nav-item>
          <b-nav-item
            @click.prevent="status.l1_Status = !status.l1_Status"
            v-if="status.l1_Status == false"
          >
            <font-awesome-icon icon="chevron-down" />
            <span>較多</span>
          </b-nav-item>
          <b-nav-item
            @click.prevent="status.l1_Status = !status.l1_Status"
            v-if="status.l1_Status == true"
          >
            <font-awesome-icon icon="chevron-up" />
            <span>較少</span>
          </b-nav-item>
          <div v-if="status.l1_Status == true">
            <b-nav-item>
              <font-awesome-icon icon="exclamation-triangle" />
              <span>重要郵件</span>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="calendar-alt" />
              <span>已排定時間</span>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="envelope" />
              <span>所有郵件</span>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="minus-circle" />
              <span>垃圾郵件</span>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="trash-alt" />
              <span>垃圾桶</span>
            </b-nav-item>
            <b-nav-item @click.prevent="status.l2_Status = !status.l2_Status">
              <font-awesome-icon
                icon="caret-right"
                v-if="status.l2_Status == false"
              />
              <font-awesome-icon
                icon="caret-down"
                v-if="status.l2_Status == true"
              />
              <font-awesome-icon icon="tag" />
              <span>類別</span>
              <div v-if="status.l2_Status == true">
                <b-nav-item>
                  <font-awesome-icon icon="users" />
                  <span>社交網路</span>
                </b-nav-item>
                <b-nav-item>
                  <font-awesome-icon icon="newspaper" />
                  <span>最新快訊</span>
                </b-nav-item>
                <b-nav-item>
                  <font-awesome-icon icon="comments" />
                  <span>論壇</span>
                </b-nav-item>
                <b-nav-item>
                  <font-awesome-icon icon="tags" />
                  <span>促銷內容</span>
                </b-nav-item>
              </div>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="cog" />
              <span>管理標籤</span>
            </b-nav-item>
            <b-nav-item>
              <font-awesome-icon icon="plus" />
              <span>建立新標籤</span>
            </b-nav-item>
          </div>
        </b-nav>
      </div>
      <div class="lineb col-md-8">
        <!--Main-->
        <div class="row">
          <div class="msg-item-group col-md-12">
            <div class="msg-item">
              <div>
                <b-button variant="outline-secondary">
                  <font-awesome-icon :icon="['far','square']" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="sort-down" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="redo" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="ellipsis-v" />
                </b-button>
                <a href="#">1-50 列(共 437 列)
                </a>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="chevron-left" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="chevron-right" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="keyboard" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon icon="cog" />
                </b-button>
              </div>
            </div>
          </div>
          <div class="msg-item-group col-md-12">
            <b-nav
              tabs
              fill
            >
              <b-nav-item active>
                <font-awesome-icon icon="inbox" />主要</b-nav-item>
              <b-nav-item>
                <font-awesome-icon icon="users" />社交網路</b-nav-item>
              <b-nav-item>
                <font-awesome-icon icon="tags" />促銷內容</b-nav-item>
            </b-nav>
            <div
              v-for="i in 10"
              :key="i"
              class="msg-item"
            >
              <div
                @mouseover="showBtns(i)"
                @mouseleave="hideBtns(i)"
              >
                <b-button variant="outline-secondary">
                  <font-awesome-icon :icon="['far','square']" />
                </b-button>
                <b-button variant="outline-secondary">
                  <font-awesome-icon :icon="['far','star']" />
                </b-button>
                <span class="msg-item-title">youtube</span>
                <b-badge variant="primary">收件夾</b-badge>
                <span class="msg-item-title"><b>這裡是信件內容⋯⋯</b></span>

                <span v-if="status.msgItemHovered == true">
                  <b-button variant="outline-secondary">
                    <font-awesome-icon icon="archive" />
                  </b-button>
                  <b-button variant="outline-secondary">
                    <font-awesome-icon icon="trash" />
                  </b-button>
                  <b-button
                    @click="status.readStatus = !status.readStatus"
                    variant="outline-secondary"
                  >
                    <font-awesome-icon
                      v-if="status.readStatus == false"
                      icon="envelope"
                    />
                    <font-awesome-icon
                      v-if="status.readStatus == true"
                      icon="envelope-open-text"
                    />
                  </b-button>
                  <b-button variant="outline-secondary">
                    <font-awesome-icon icon="clock" />
                  </b-button>
                </span>
                <span v-if="status.msgItemHovered == false">下午 2：25</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <!--Footer-->
          <div class="col-md-12 d-flex">
            <div class="">
              <a href="#">條款 /</a>
              <a href="#">隱私權 /</a>
              <a href="#">計畫政策</a>
            </div>
            <div class="ml-auto">
              <p>上次帳戶活動時間：1 分鐘前</p>
              <a href="#">詳細資料</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--Sidebar2-->
    <div class="lineb col-md-1">123</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      show: false,
      status: {
        l1_Status: false,
        l2_Status: false,
        readStatus: false,
        msgItemHovered: false,
        navSwitchStatus: true
      },
      users: [
        {
          id: 1,
          contry: "Taiwan",
          emailTelephone: "test123@gmail.com",
          fName: "Sir",
          lName: "Test",
          userName: "test",
          password: "1234",
          email: "test123@gmail.com",
          birthday: "1993/11/11"
        }
      ],
      user: {
        id: "",
        contry: "",
        emailTelephone: "",
        fName: "",
        lName: "",
        userName: "t",
        password: "",
        email: "",
        birthday: ""
      },
      msgItemGroup: [
        {
          id: "1",
          checkbox: false,
          star: false,
          tag: "收件夾",
          content: "這裡是信件內容",
          time: ""
        }
      ],
      msgitem: {
        id: "",
        checkbox: false,
        star: false,
        tag: "",
        content: "",
        time: ""
      }
    };
  },
  methods: {
    showBtns() {
      this.status.msgItemHovered = true;
    },
    hideBtns() {
      this.status.msgItemHovered = false;
    }
  }
};
</script>

<style lang="scss">
.navbar2-custom {
  padding: 0;
}

.msg-item-group {
  padding: 0;
  .msg-item {
    padding: 0;
    height: 39px;
    line-height: 39px;
    text-align: left;
    border-top: 0.5px solid lightgrey;
    border-bottom: 0.5px solid lightgrey;
    .btn.btn-outline-secondary {
      height: 40px;
      border: 0;
      border-radius: 0;
    }
  }
  &:hover {
    background-color: lightgrey;
  }
}

.lineb {
  border: 1px solid lightgrey;
}

.sidebar-custom {
  text-align: left;
}

.nav-item a span {
  color: grey;
}
.nav-item a svg {
  margin-right: 12px;
}
</style>
