<template>
    <div id="demo1"></div>
</template>

<script>

// 引入 wangEditor
import WangEditor from 'wangeditor'
import { uploadWangImg } from '../../../../api/concent'
import config from '../../../../config'
export default {
  data () {
    return {
      editor: null,
      contData: ''
    }
  },
  props: ['content'],
  mounted () {
    const editor = new WangEditor('#demo1')

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.contData = newHtml
      this.getEditorData(newHtml)
    }
    editor.config.customUploadImg = function (resultFiles, insert) {
      const formData = new FormData()
      formData.append('file', resultFiles[0])
      uploadWangImg(formData).then((res) => {
        if (res.code === 200) {
          const data = config.baseUrl + res.data
          console.log(data)
          insert(data)
        }
      })
    }
    // 创建编辑器
    editor.create()
    this.editor = editor
  },
  methods: {
    getEditorData (newHtml) {
      // 通过代码获取编辑器内容
      // const data = this.editor.txt.html()
      this.$emit('change', newHtml)
    }
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
#demo1 {
  padding-bottom: 20px;
}
</style>
