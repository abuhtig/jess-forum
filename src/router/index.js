import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/channels/Index.vue')
      },
      {
        path: '/index/:catalog',
        name: 'catalog',
        component: () => import('../views/channels/Template1.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import('../views/Reg.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/Forget.vue')
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'layui-this'
})

export default router
