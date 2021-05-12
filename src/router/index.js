import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index'
import moment from 'dayjs'
import jwt from 'jsonwebtoken'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

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
    path: '/reset',
    name: 'Reset',
    component: () => import('../views/Reset.vue')
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/Confirm.vue')
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
  },
  {
    path: '/user/:uid',
    name: 'User',
    props: true,
    component: () => import('../views/User.vue')
  },
  {
    path: '/center',
    linkActiveClass: 'layui-this',
    meta: { requiresAuth: true },
    component: () => import('../views/Center.vue'),
    children: [
      {
        path: '',
        name: 'center',
        component: () => import('../components/user/Center.vue')
      },
      {
        path: '/msg',
        name: 'Msg',
        component: () => import('../components/user/Msg.vue')
      },
      {
        path: '/posts',
        component: () => import('../components/user/Posts.vue'),
        children: [
          {
            path: '',
            name: 'Myposts',
            component: () => import('../components/user/common/Myposts.vue')
          },
          {
            path: 'mycollection',
            name: 'MyCollection',
            component: () => import('../components/user/common/MyCollection.vue')
          }
        ]
      },
      {
        path: '/settings',
        component: () => import('../components/user/Settings.vue'),
        children: [
          {
            path: '',
            name: 'Myinfo',
            component: () => import('../components/user/common/Myinfo.vue')
          },
          {
            path: 'accounts',
            name: 'Accounts',
            component: () => import('../components/user/common/Accounts.vue')
          },
          {
            path: 'passwd',
            name: 'Passwd',
            component: () => import('../components/user/common/Passwd.vue')
          },
          {
            path: 'picupload',
            name: 'PicUpload',
            component: () => import('../components/user/common/PicUpload.vue')
          }
        ]
      },
      {
        path: '/others',
        name: 'Others',
        component: () => import('../components/user/Others.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/Nofound.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'layui-this'
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const userInfo = JSON.parse(localStorage.getItem('userInfo'))
  if (token !== '' && token !== null) {
    const payload = jwt.decode(token)
    if (moment().isBefore(moment(payload.exp * 1000))) {
      Store.commit('setToken', token)
      Store.commit('setUserInfo', userInfo)
      Store.commit('setisLogin', true)
    } else {
      localStorage.clear()
    }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isLogin = Store.state.isLogin
    if (isLogin) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
