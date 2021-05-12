<template>
  <div class="layui-container flex">
    <div class="layui-row font">是否将用户名更改为:{{username}}?</div>
    <div class="layui-row">
      <button type="button" class="layui-btn layui-btn-radius" :class="{'layui-btn-disabled': isSend}" @click="submit">确认修改</button>
      <a href="/" class="layui-btn layui-btn-radius">返回首页</a>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '../../api/user'
let obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      isSend: false
    }
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
    this.username = decodeURIComponent(obj.username)
  },
  methods: {
    submit () {
      obj.username = this.username
      updateUsername(obj).then((res) => {
        this.isSend = true
        if (res.code === 200) {
          this.$alert(res.msg)
        }
        setTimeout(() => {
          this.$router.push('/')
        }, 1500)
      })
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}
.font {
  font-size: 18px;
  padding-bottom: 18px;
}
</style>
