<template>
  <div>
    <div class="fly-header layui-bg-black">
      <div class="layui-container">
        <a class="fly-logo" href="/">
          <img src="../assets/logo.png" alt="layui" />
        </a>
        <ul class="layui-nav fly-nav layui-hide-xs">
          <li class="layui-nav-item layui-this">
            <a href="/"><i class="iconfont icon-jiaoliu"></i>交流</a>
          </li>
          <li class="layui-nav-item">
            <a href="/"
              ><i class="iconfont icon-iconmingxinganli"></i>案例</a
            >
          </li>
          <li class="layui-nav-item">
            <a href="/" target="_blank"><i class="iconfont icon-ui"></i>框架</a>
          </li>
        </ul>

        <ul class="layui-nav fly-nav-user">
          <!-- 未登入的状态 -->
          <template v-if="!isShow">
            <li class="layui-nav-item">
              <a
                class="iconfont icon-touxiang layui-hide-xs"
                href="../user/login.html"
              ></a>
            </li>
            <li class="layui-nav-item">
              <router-link :to="{name: 'Login'}">登入</router-link>
            </li>
            <li class="layui-nav-item">
              <router-link :to="{name: 'Reg'}">注册</router-link>
            </li>
            <li class="layui-nav-item layui-hide-xs">
              <a
                href=""
                onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                title="QQ登入"
                class="iconfont icon-qq"
              ></a>
            </li>
            <li class="layui-nav-item layui-hide-xs">
              <a
                href=""
                onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                title="微博登入"
                class="iconfont icon-weibo"
              ></a>
            </li>
          </template>
          <!-- 登入后的状态 -->
          <template v-else>
            <li class="xindex layui-nav-item">
              <a class="fly-nav-avatar" href="javascript:;">
                <i class="layui-badge fly-badge-vip layui-hide-xs" v-show="userInfo.isVip !== '0'">VIP</i>
                <cite class="layui-hide-xs" @click="tocenter">{{userInfo.name}}</cite>
                <span v-show="num.msg !== 0" class="layui-badge-dot dotright"></span>
                <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
                <img :src="userInfo.pic" @click="tocenter">
              </a>
              <dl class="layui-nav-child">
                <dd><router-link to="/settings"><i class="layui-icon">&#xe620;</i>基本设置</router-link></dd>
                <dd><router-link to="/msg"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</router-link>
                <span  v-show="num.msg !== 0">
                  <div class="num">{{num.msg}}</div>
                </span>
                </dd>
                <dd><router-link to="/center"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</router-link></dd>
                <hr style="margin: 5px 0;">
                <dd><a href="javascript:;" @click="logout" style="text-align: center;">退出</a></dd>
              </dl>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
    }
  },
  methods: {
    tocenter () {
      this.$router.push('/center')
    },
    logout () {
      localStorage.clear()
      this.$store.commit('setinit')
      this.$router.push('/', () => {})
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      num: state => state.num
    }),
    isShow () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo || {
        name: '',
        pic: '',
        isVip: 0
      }
    }
  }
}
</script>

<style>
.layui-nav-item .layui-nav-child{
  top: 60px;
  display: none;
}

.layui-nav-item:hover .layui-nav-child{
  display: block;
}

.dotright {
  right: 31px;
}
.dotright1 {
  right: -5px;
}

.num {
  position:absolute;
  color:#FF5722;
  left: 99px;
  top: -9px;
  font-size: 14px;
}
</style>
