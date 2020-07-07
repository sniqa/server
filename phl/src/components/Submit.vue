<template>
  <div
    class="btn"
    @click="onClick"
  >
    <!-- <i className="material-icons">pause</i> -->
    <i
      class="material-icons icon-size"
      v-if="state"
    >pause</i>
    <i
      class="material-icons icon-size"
      v-else
    >play_arrow</i>
  </div>
</template>

<script>
export default {
  name: 'submit',
  props: {
    state: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>

<style>
.btn {
  position: absolute;
  left: 50%;
  top: 10%;
  margin-left: -40px;
  z-index: 99;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #fff;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn .icon-size {
  font-size: 60px;
  cursor: pointer;
}
</style>