<template>
  <header class="header">
    <input
      type="text"
      name=""
      id=""
      :value="value"
      @input="onInput"
    >
  </header>
</template>

<script>
export default {
  props: {
    value: String
  },
  methods: {
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.header input {
  height: inherit;
  outline: none;
  font-size: 24px;
  width: 60%;
  padding-left: 40px;
}
</style>