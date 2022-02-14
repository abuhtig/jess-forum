<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="files" type="button" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input type="file" name="file" id="files" accept="image/png,image/gif,image/jpeg" @change="upload">
        </label>
        <img :src="pic">
        <span class="loading"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '../../../../api/concent'
import { updateUserInfo } from '../../../../api/user'
import config from '../../../../config'
export default {
  name: 'picupload',
  data () {
    return {
      pic: this.$store.state.userInfo.pic ? this.$store.state.userInfo.pic : '/img/1.jpg',
      formData: ''
    }
  },
  methods: {
    upload (e) {
      const formData = new FormData()
      const file = e.target.files
      if (file.length > 0) {
        formData.append('file', file[0])
        this.formData = formData
      }
      uploadImg(formData).then((res) => {
        if (res.code === 200) {
          this.pic = config.baseUrl + res.data
          updateUserInfo({ pic: this.pic }).then((res) => {
            if (res.code === 200) {
              const user = this.$store.state.userInfo
              user.pic = this.pic
              this.$store.commit('setUserInfo', user)
              this.$alert('更新成功')
            }
          })
          document.getElementById('files').value = ''
        }
      })
    }
  }
}
</script>

<style>
#files {
  display: none;
}
</style>
