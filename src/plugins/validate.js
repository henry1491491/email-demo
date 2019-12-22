import tw from "vee-validate/dist/locale/zh_TW.json"
import VTextFieldWithValidation from "@/components/inputs/VTextFieldWithValidation"
import VSelectWithValidation from "@/components/inputs/VSelectWithValidation"
import * as rules from "vee-validate/dist/rules"
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from "vee-validate"
import Vue from "vue"

localize("tw", tw)

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
Vue.component("VTextFieldWithValidation", VTextFieldWithValidation)
Vue.component("VSelectWithValidation", VSelectWithValidation)

Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})

extend("requireOneNumeric", {
  validate(value) {
    return /.*[0-9].*/i.test(value) // 正規表達式
  },
  message: "{_field_} 至少需含一個數字"
})

extend("password", {
  params: ["target"],
  // target 對應的是 label 名稱
  validate(value, { target }) {
    return value === target
  },
  message: "{_field_} 不一致"
})
