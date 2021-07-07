<template>
<div class="reply">
    <div id="demo1">
    </div>
</div>
</template>

<script>

// 引入 wangEditor
import WangEditor from 'wangeditor'

export default {
  props: ['content'],
  data () {
    return {
      editor: '',
      newcont: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#demo1')
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.newcont = newHtml
    }
    editor.config.showFullScreen = false
    editor.config.menus = [
      'emoticon',
      'link'
    ]
    editor.config.zIndex = 500
    editor.create()
    this.editor = editor
  },
  watch: {
    newcont (newVal, oldVal) {
      this.$emit('changecont', newVal)
    },
    content (n) {
      this.editor.txt.html(n)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
