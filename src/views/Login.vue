<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">登入</li>
          <li><router-link :to="{ name: 'Reg' }">注册</router-link></li>
        </ul>
        <validation-observer ref="observer" v-slot={validate}>
          <div
          class="layui-form layui-tab-content"
          id="LAY_ucm"
          style="padding: 20px 0"
          >
          <div class="layui-tab-item layui-show">
            <div class="layui-form layui-form-pane">
              <form method="post">
                <div class="layui-form-item">
                  <label for="L_email" class="layui-form-label">用户名</label>
                    <validation-provider rules="required|email" v-slot="{ errors }">
                      <div class="layui-input-inline" >
                        <input
                          type="text"
                          name="username"
                          v-model="username"
                          placeholder="请输入用户名/邮箱"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                </div>
                <div class="layui-form-item">
                  <label for="L_pass" class="layui-form-label">密码</label>
                  <validation-provider rules="required|min:6" v-slot="{ errors }">
                   <div class="layui-input-inline">
                      <input
                        type="password"
                        name="password"
                        v-model="password"
                        placeholder="请输入密码"
                        autocomplete="off"
                        class="layui-input"
                      />
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00">{{ errors[0]}}</span>
                    </div>
                  </validation-provider>
                </div>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <validation-provider ref="codefield" rules="required|length:4" v-slot="{ errors }">
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
                  <button class="layui-btn" type="button" @click="validate().then(submit)" lay-submit>
                    立即登录
                  </button>
                  <span style="padding-left: 20px">
                    <router-link :to="{ name: 'Forget' }"
                      >忘记密码？</router-link
                    >
                  </span>
                </div>
                <!-- <div class="layui-form-item fly-form-app">
                  <span>或者使用社交账号登入</span>
                  <a
                    href=""
                    onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-qq"
                    title="QQ登入"
                  ></a>
                  <a
                    href=""
                    onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                    class="iconfont icon-weibo"
                    title="微博登入"
                  ></a>
                </div> -->
              </form>
            </div>
          </div>
        </div>
        </validation-observer>
      </div>
    </div>
  </div>
</template>

<script>
import CodeMix from '../mixin/code'
import { login } from '../../api/login'
export default {
  name: 'login',
  mixins: [CodeMix],
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      login({
        username: this.username,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          res.data.username = this.username
          this.$store.commit('setUserInfo', res.data)
          this.$store.commit('setisLogin', true)
          this.$store.commit('setToken', res.token)
          this.username = ''
          this.password = ''
          this.code = ''
          this.$alert('登陆成功')
          this.$router.push('/')
        } else if (res.code === 401) {
          this.$refs.codefield.setErrors([res.msg])
        } else if (res.code === 404) {
          this.$alert('用户名或密码错误,请检查!')
        }
      }).catch((err) => {
        console.log(err)
        const data = err.response.data
        if (data.code === 500) {
          this.$alert('用户名或密码错误,请检查!')
        } else {
          this.$alert('服务器错误')
        }
      })
    }
  }
}
</script>
<style>
.svg {
  position: relative;
  top: -4px;
}
</style>
