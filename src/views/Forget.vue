<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{name:'Login'}">登入</router-link></li>
          <li class="layui-this">找回密码<!--重置密码--></li>
        </ul>
        <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
        >
        <validation-observer ref="observer" v-slot={validate}>
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">邮箱</label>
                  <validation-provider rules="required|email" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="email"
                        v-model="username"
                        placeholder="请输入用户名/邮箱"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <validation-provider rules="required|length:4" v-slot="{ errors }">
                    <div class="layui-input-inline">
                      <input
                        type="text"
                        name="code"
                        v-model="code"
                        placeholder="请输入验证码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div>
                      <span class="svg" style="color: #c00" @click="_getCode()" v-html="svg">
                      </span>
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{errors[0]}}</span>
                    </div>
                  </validation-provider>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" lay-filter="*" type="button" @click="validate().then(submit)">
                    提交
                  </button>
                </div>
              </form>
            </div>
          </div>
        </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMix from '../mixin/code'
import { forget } from '../../api/login'
export default {
  name: 'forget',
  mixins: [CodeMix],
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    if (this.$store.state.sid === '') {
      this.$router.push('/login')
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      forget({
        username: this.username,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200 || res.code === 401 || res.code === 500) {
          this.$alert(res.msg)
        } else {
          this.$refs.observer.setErrors(res.msg)
        }
      })
    }
  }
}
</script>
<style>
</style>
