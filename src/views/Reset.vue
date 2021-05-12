<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li><router-link :to="{name: 'Login'}">登入</router-link></li>
          <li class="layui-this">修改密码</li>
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
                    <label for="L_pass" class="layui-form-label">新密码</label>
                    <validation-provider rules="required|min:6|max:16" vid="confirmation" v-slot="{ errors }">
                    <div class="layui-input-inline">
                        <input
                          type="password"
                          name="password"
                          v-model="password"
                          placeholder="请输入密码,6-16个字符"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <validation-provider rules="confirmed:confirmation" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="repass"
                          v-model="repass"
                          placeholder="请确认密码"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{ errors[0] }}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" lay-filter="*" type="button" @click="validate().then(submit)">
                      确认修改
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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { setPass } from '../../api/user'
let obj = {}
export default {
  name: 'reset',
  data () {
    return {
      password: '',
      repass: '',
      required: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted () {
    const queryStr = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(queryStr.split('&').map(v => v.split('=')))
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      obj.password = this.password
      setPass(obj).then((res) => {
        if (res.code === 200) {
          this.$alert(res.msg)
          setTimeout(() => {
            this.$router.push('/login')
          }, 2000)
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
