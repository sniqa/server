<template>
  <div class="in-coder-panel">
    <textarea ref="textarea"></textarea>
    <!-- <el-select class="code-mode-select" v-model="mode"
               @change="changeMode">
      <el-option v-for="mode in modes"
                 :key="mode.value" :label="mode.label" :value="mode.value">
      </el-option>
    </el-select> -->
  </div>
</template>

<script type="text/ecmascript-6">
// 引入全局实例
import _CodeMirror from 'codemirror'

// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/shadowfox.css'

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
// import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
// import 'codemirror/mode/markdown/markdown.js'
// import 'codemirror/mode/python/python.js'
// import 'codemirror/mode/r/r.js'
// import 'codemirror/mode/shell/shell.js'
// import 'codemirror/mode/sql/sql.js'
// import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'
import "codemirror/addon/lint/lint.css"
import "codemirror/addon/lint/lint"
import "codemirror/addon/lint/json-lint"

require("script-loader!jsonlint")

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror

export default {
  name: 'in-coder',
  props: {
    // 外部传入的内容，用于实现双向绑定
    // value: String,
    value: {
      type: String,
      default () {
        return {};
      },
    }
  },
  data () {
    return {
      jsonEditor: null,
    }
  },
  mounted () {
    // 初始化
    this.initJsonEditor();
  },
  methods: {
    initJsonEditor () {
      this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
        lineNumbers: true,
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers"],
        theme: "shadowfox",
        lint: true,
      });
      this.jsonEditor.on("change", cm => {
        this.$emit("changed", cm.getValue());
        this.$emit("input", cm.getValue());
      });
    },
    getValue () {
      return this.jsonEditor.getValue();
    }
  }
}
</script>

<style>
.in-coder-panel {
  position: absolute;
  top: 50px;
  left: 0;
  width: 50%;
  height: 100%;
  max-width: 50%;
  box-sizing: border-box;
  border-right: 1px solid #fff;
}

.CodeMirror {
  z-index: 1;
  height: auto;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.CodeMirror-code {
  line-height: 32px;
}
.CodeMirror-linenumber {
  color: #ccc;
}
</style>