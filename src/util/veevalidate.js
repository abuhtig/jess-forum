import { extend, localize } from 'vee-validate'
import { required, email, min, max, length, confirmed, regex } from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'

extend('email', email)
extend('required', required)
extend('min', min)
extend('length', length)
extend('confirmed', confirmed)
extend('max', max)
extend('regex', regex)
localize('zh_CN', {
  messages: {
    ...zh.messages,
    required: '请输入{_field_}',
    email: '请输入正确的{_field_}',
    min: '不符合最小长度要求',
    max: '超过最大长度要求',
    length: (field) => `${field}要求长度4位`,
    confirmed: '输入的密码不一致',
    regex: '格式仅包含中文、英文、数字、下划线'
  },
  names: {
    email: '邮箱',
    password: '密码',
    name: '昵称',
    code: '验证码',
    username: '账号',
    repass: '确认密码',
    oldpwd: '旧密码'
  }
})
