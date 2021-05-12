<template>
  <validation-observer ref="observer" v-slot={validate}>
    <div class="layui-form layui-form-pane layui-tab-item layui-show">
      <form action="/user/repass" method="post">
        <div class="layui-form-item">
          <label for="L_nowpass" class="layui-form-label">当前密码</label>
          <validation-provider rules="required|min:6" v-slot="{ errors }">
            <div class="layui-input-inline">
              <input
                type="password"
                name="oldpwd"
                v-model="oldpwd"
                placeholder="请输入当前密码"
                class="layui-input"
              />
            </div>
            <div class="layui-form-mid">
              <span style="color: #c00">{{ errors[0]}}</span>
            </div>
          </validation-provider>
        </div>
        <div class="layui-form-item">
          <label for="L_pass" class="layui-form-label">新密码</label>
            <validation-provider rules="required|min:6|max:16|confirmed:confirmation" v-slot="{ errors }">
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
          <div class="layui-form-mid layui-word-aux">6到16个字符</div>
        </div>
        <div class="layui-form-item">
          <label for="L_repass" class="layui-form-label">确认密码</label>
          <validation-provider vid="confirmation" v-slot="{ errors }">
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
          <button class="layui-btn" type="button" lay-filter="*" @click="validate().then(submit)">确认修改</button>
        </div>
      </form>
    </div>
  </validation-observer>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { changepw } from '../../../../api/user'
export default {
  name: 'passwd',
  data () {
    return {
      oldpwd: '',
      password: '',
      repass: ''
    }
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.oldpwd === this.password) {
        this.$alert('新密码与旧密码不能相同,请检查!')
        return
      }
      changepw({
        oldpwd: this.oldpwd,
        password: this.password
      }).then((res) => {
        if (res.code === 200) {
          this.$alert(res.msg)
          this.oldpwd = ''
          this.password = ''
          this.repass = ''
          this.$nextTick(() => {
            this.$refs.observer.reset()
          })
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
