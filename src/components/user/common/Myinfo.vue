<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <validation-observer ref="observer" v-slot={validate}>
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">邮箱</label>
        <validation-provider rules="required|email" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="email" class="layui-input" v-model="username">
          </div>
          <!-- <div class="layui-form-mid layui-word-aux">如果您在邮箱已激活的情况下，变更了邮箱，需<a href="activate.html" style="font-size: 12px; color: #4f99cf;">重新验证邮箱</a>。</div> -->
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <label for="L_username" class="layui-form-label">昵称</label>
        <validation-provider name="name" :rules="{required,regex:/^[\u4E00-\u9FA5A-Za-z0-9_]+$/}" v-slot="{ errors }">
          <div class="layui-input-inline">
            <input type="text" name="username" class="layui-input" v-model="name">
          </div>
          <div class="layui-form-mid">
            <span style="color: #c00">{{ errors[0] }}</span>
          </div>
        </validation-provider>
      </div>
      <div class="layui-form-item">
        <label for="L_username" class="layui-form-label">性别</label>
        <div class="layui-input-inline">
          <button type="button" @click="isgender()" class="layui-btn btn layui-btn-primary layui-border-black">{{strGender}}</button>
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_city" class="layui-form-label">城市</label>
        <div class="layui-input-inline">
          <input type="text" class="layui-input" v-model="location">
        </div>
      </div>
      <div class="layui-form-item layui-form-text">
        <label for="L_sign" class="layui-form-label">签名</label>
        <div class="layui-input-block">
          <textarea placeholder="随便写些什么刷下存在感" class="layui-textarea" style="height: 80px;"  v-model="regmark"></textarea>
        </div>
      </div>
      <div class="layui-form-item">
        <button class="layui-btn" @click="validate().then(submit)" lay-submit>确认修改</button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { updateUserInfo } from '../../../../api/user'
export default {
  name: 'accounts',
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      gender: '',
      username: '',
      name: '',
      location: '',
      regmark: '',
      required: ''
    }
  },
  mounted () {
    const { username, name, location, gender, regmark } = this.$store.state.userInfo
    this.username = username || ''
    this.name = name || ''
    this.location = location || ''
    this.gender = gender || ''
    this.regmark = regmark || ''
  },
  methods: {
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      updateUserInfo({
        username: this.username,
        gender: this.gender,
        name: this.name,
        location: this.location,
        regmark: this.regmark
      }).then((res) => {
        if (res.code === 200) {
          this.$alert('更新成功!')
          this.$store.commit('setUserInfo', {
            ...this.$store.state.userInfo,
            ...{
              username: this.username,
              gender: this.gender,
              name: this.name,
              location: this.location,
              regmark: this.regmark
            }
          })
        }
      })
    },
    isgender () {
      this.gender = !this.gender
    }
  },
  computed: {
    strGender: function () {
      if (this.gender === '') {
        return '未选择'
      } else if (this.gender) {
        return '男'
      } else {
        return '女'
      }
    }
  }
}
</script>

<style>
.btn {
  width: 100%;
}
</style>
