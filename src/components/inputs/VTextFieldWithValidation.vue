<template>
  <validation-provider
    v-slot="{ errors, valid }"
    :name="$attrs.label"
    :rules="rules"
  >
    <v-text-field
      v-model="_value"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    />
    <slot></slot>
  </validation-provider>
</template>

<script>
export default {
  props: {
    rules: {
      type: [Object, String],
      default: ""
    },
    value: {
      type: String,
      default: ""
    }
    // must be included in props
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
