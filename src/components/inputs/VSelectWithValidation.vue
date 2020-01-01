<template>
  <validation-provider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
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
        this.$emit("input", val)
      }
    }
  }
}
</script>
