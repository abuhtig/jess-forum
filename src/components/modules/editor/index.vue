<template>
    <div id="demo1">
      <div v-html="content"></div>
    </div>
</template>

<script>

// 引入 wangEditor
import WangEditor from 'wangeditor'
import { uploadWangImg } from '../../../../api/concent'
import config from '../../../../config'
export default {
  data () {
    return {
      contData: ''
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  mounted () {
    const editor = new WangEditor('#demo1')

    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.contData = newHtml
      this.getEditorData(newHtml)
    }
    editor.config.customUploadImg = (resultFiles, insert) => {
      const formData = new FormData()
      formData.append('file', resultFiles[0])
      uploadWangImg(formData).then((res) => {
        if (res.code === 200) {
          const data = config.baseUrl + res.data
          insert(data)
          this.$emit('imgUrl', res.data)
        }
      })
    }
    editor.config.linkImgCallback = (src, alt, href) => {
      this.$emit('imgUrl', src)
    }
    // 创建编辑器
    editor.create()
    // editor.txt.append(this.content)
  },
  methods: {
    getEditorData (newHtml) {
      // 通过代码获取编辑器内容
      // const data = this.editor.txt.html()
      this.$emit('change', newHtml)
    }
  }
}
</script>

<style lang="scss" scoped>
#demo1 {
  padding-bottom: 20px;
}
</style>
