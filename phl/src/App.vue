<template>
  <div id="app">
    <Header v-model="serverUrl"></Header>
    <editor v-model="editorContent"></editor>
    <submit
      :state="btnState"
      @click="onClick"
    ></submit>
    <show-result :result="resultContent"></show-result>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import ShowResult from './components/ShowResult'
import Submit from './components/Submit.vue'
import Header from './components/Header.vue'

import { postData } from '@/network/fetch/fetch.js'

export default {
  name: 'App',
  data: () => {
    return {
      serverUrl: 'http://localhost:8000/phl',
      editorContent: '',
      resultContent: null,
      btnState: false
    }
  },
  components: {
    Editor,
    ShowResult,
    Submit,
    Header
  },
  updated () {
    console.log(this.serverUrl);

  },
  methods: {
    onClick () {
      this.btnState = true
      // if (!this.isJson(this.resultContent)) {
      //   alert('type something')
      //   this.btnState = false
      //   return
      // }
      const jsonObj = JSON.parse(this.editorContent)
      console.log(jsonObj);

      postData(this.serverUrl, jsonObj)
        .then(res => {
          console.log(res)
          this.btnState = false
          this.resultContent = res
        })
        .catch(res => {
          console.log(res);
          this.btnState = false

        })
    },
  },
  watch: {
    serverUrl: {
      handler (curVal) {
        console.log(curVal)

      }
    }
  },

  updated () {
    console.log(this.serverUrl);

  },
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 24px;
  color: #2c3e50;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
:root body {
  margin: 0;
  padding: 0;
}
</style>
