<template>
  <validation-provider
    :name="$attrs.label"
    :rules="rules"
    v-slot="{ errors, valid }"
  >
    <v-text-field
      v-model="_value"
      :error-messages="errors"
      :success="valid"
      v-bind="$attrs"
      v-on="$listeners"
    />
  </validation-provider>
</template>

<script>
export default {
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
    // must be included in props
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
