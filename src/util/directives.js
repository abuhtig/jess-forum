// import { escapeHtml } from './escapeHtml'
import store from '../store/index'

export default (vue) => {
  // 'richtext': {
  //   bind: function (el, binding, vnode) {
  //     el.innerHTML = escapeHtml(binding.value)
  //   },
  //   componentUpdated: function (el, binding, vnode) {
  //     el.innerHTML = escapeHtml(binding.value)
  //   }
  // },
  vue.directive('hasRole', {
    inserted: function (el, binding) {
      const roles = store.state.userInfo.roles || ['user']
      if (!roles.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })

  // vue.directive('hasEdit', {
  //   inserted: function (el, binding, vnode) {
  //     console.log(binding, vnode)
  //   }
  // })
}
