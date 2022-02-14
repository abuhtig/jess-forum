import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './util/veevalidate'
import Alert from './components/modules/alert/index'
import filters from './util/filter'
import Directives from './util/directives'

Vue.use(Alert)
Directives(Vue)
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
