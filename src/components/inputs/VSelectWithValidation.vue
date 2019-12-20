<!--
  -- v-select-with-validation --
  1. <v-select-with-validation> 有的屬性：rules, items, v-model, label
  2. 其中只有 rules 是我們自己配置的 props，用來將數據傳遞給 validation-provider 組件，因為 validation-provider 需要 rules 屬性來作驗證
  3. 因此 props 的部分需要有 rules 並且定義 type 可以是字串或者物件（需定義物件型別是因為有像是 max:10 這種客製化的 rules？）

  -- validation-provider --
  1. $attrs == { "items": [ "", "Foo", "Bar" ], "label": "Select" }
  2. v-slot="{ errors, valid }" 為 validation-provider 組件內部的 data 還是 options 都可以？透過 v-slot 作用域插槽讓它的子元件可以使用父元件數據 errors 及 valid
  -- v-select --
  1. <v-select v-bind="$attrs" v-on="$listeners">：v-bind 讓父組件的屬性資料可以傳遞到 v-select 底下的組件（打開通道讓祖孫組件之間傳遞數據？）
  -->
<template>
  <validation-provider
    :name="$attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
  >
    <v-select
      v-model="_value"
      :error-messages="errors"
      v-bind="$attrs"
      v-on="$listeners"
    >
    </v-select>
  </validation-provider>
</template>

<script>
export default {
  props: {
    rules: {
      type: [Object, String],
      default: ""
    },
    // 這 value 幹嘛用的？
    value: {
      type: null
    }
  },
  computed: {
    _value: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
