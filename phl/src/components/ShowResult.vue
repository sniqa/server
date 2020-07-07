<template>
  <div class="show-result">
    <pre class="text-overflow">

    {{result}}
      </pre>
  </div>
</template>

<script>
export default {
  props: {
    result: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>

<style>
.show-result {
  position: absolute;
  top: 50px;
  right: 0;
  height: 100%;
  width: 50%;
  max-width: 50%;
  box-sizing: border-box;
  border-left: 1px solid #fff;
  background-color: #002240;
  color: #fff;
  padding: 0 50px;
  overflow: hidden;
}
.text-overflow {
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: keep-all;
  word-break: break-all;
}
</style>