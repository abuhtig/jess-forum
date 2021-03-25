import AlertComponent from './Alert.vue'

const alert = {}

alert.install = (Vue) => {
  const AlertConstructor = Vue.extend(AlertComponent)
  const instance = new AlertConstructor()
  instance.$mount(document.createElement('div'))
  document.body.appendChild(instance.$el)

  Vue.prototype.$alert = (msg) => {
    instance.type = 'alert'
    instance.msg = msg
    instance.isShow = true
  }
  Vue.prototype.$confirm = (msg, success, cancel) => {
    instance.msg = msg
    instance.isShow = true
    instance.type = 'confirm'
    if (typeof success !== 'undefined' && typeof cancel !== 'undefined') {
      instance.success = success
      instance.cancel = cancel
    }
  }
}
export default alert
