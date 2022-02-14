<template>
  <div class="international-header">
    <div :class="header1 ? 'mini-header1' : 'mini-header'">
      <div class="mini-header__content">
        <div class="nav-link">
          <ul class="nav-link-ul">
            <li class="nav-link-item">
              <a href="/" class="link" :class="{ nocolor: header1 }">
                <i class="iconfont icon-shujumofang nolink"></i>主站
              </a>
            </li>
            <li class="nav-link-item">
              <a
                href="http://a.toped.top"
                class="link"
                :class="{ nocolor: header1 }"
                >后台管理
              </a>
            </li>
            <li class="nav-link-item">
              <a href="/" class="link" :class="{ nocolor: header1 }"
                >游戏中心
              </a>
            </li>
            <li class="nav-link-item">
              <a href="/" class="link" :class="{ nocolor: header1 }">直播 </a>
            </li>
            <li class="nav-link-item">
              <a href="/" class="link" :class="{ nocolor: header1 }"
                >下载APP
              </a>
            </li>
            <li class="nav-link-item">
              <router-link :to="{ name: 'Add' }">
                <a href="/" class="link" :class="{ nocolor: header1 }">
                  <i class="iconfont icon-bug nolink"></i>BUG反馈
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="nav-search-box">
          <div class="nav-search">
            <form id="nav_searchform">
              <input
                autocomplete="off"
                accesskey="s"
                x-webkit-speech=""
                x-webkit-grammar="builtin:translate"
                placeholder="我寻你千百度,又一岁荣枯！"
                type="text"
                v-model="searchValue"
                class="nav-search-keyword"
              />
              <div class="nav-search-btn">
                <button
                  @click="search"
                  type="button"
                  class="nav-search-submit iconfont icon-0201chazhao"
                ></button>
              </div>
            </form>
          </div>
        </div>
        <div class="nav-user-center">
          <div class="user-con">
            <div class="ab">
            <span class="avatar">
              <a
                v-if="!userInfo.pic"
                href="#"
              ></a>
              <img v-else :src="userInfo.pic" @click="tocenter" />
            </span>
              <div class="itemdis">
                <div class="itemTool">
                  <div v-if="isLogin">
                    <dd><router-link to="/center"><i class="iconfont icon-geren mr1"></i>我的主页</router-link></dd>
                    <hr style="margin: 5px 0;">
                    <dd><a href="javascript:;" @click="logout" style="text-align: center;"><i class="iconfont icon-tuichu mr1"></i>退出</a></dd>
                  </div>
                  <div v-else>
                    <li>
                      <router-link :to="{name: 'Login'}"><i class="iconfont icon-denglu mr1"></i>登入</router-link>
                    </li>
                    <li>
                      <router-link :to="{name: 'Reg'}"><i class="iconfont icon-zhuce mr1"></i>注册</router-link>
                    </li>
                  </div>
                </div>
              </div>
              </div>
            <div
              class="item"
              v-for="(item, index) in userList"
              :key="'user' + index"
            >
              <div>
                <div class="item">
                  <span :class="header1 ? '' : 'name'">{{ item.title }}</span>
                </div>
              </div>
            </div>
            <div>
              <router-link :to="{ name: 'Add' }">
                <span
                  class="mini-upload"
                  aria-describedby="van-popover-9915"
                  tabindex="0"
                >
                  投稿
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="header1 ? 'disnone' : 'bili-banner'">
      <div class="animated-banner">
        <div class="layer">
          <img
            src="img/banner.gif"
            width="100%"
            height="100%"
            style="
              transform: scale(1) translate(0px, 0px) rotate(0deg);
            "
          >
        </div>
      </div>
      <div class="taper-line"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      userList: [
        { title: '大会员' },
        { title: '消息' },
        { title: '动态' },
        { title: '收藏' },
        { title: '历史记录' }
      ],
      header1: false,
      searchValue: ''
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
    },
    search () {
      this.$router.push({ path: '/', query: { search: this.searchValue } })
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== '/') {
        this.header1 = true
      } else {
        this.header1 = false
      }
    }
  },
  computed: {
    ...mapState({
      num: state => state.num
    }),
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return (
        this.$store.state.userInfo || {
          name: '',
          pic: '',
          isVip: 0
        }
      )
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.iconsize {
  size: 10px;
}
.mr1 {
  margin-right: 6px;
}
.itemdis {
  display: none;
  position: relative;
}
.ab:hover .itemdis {
  display: block;
}
.itemTool:hover .itemdis {
  display: block;
}
.itemTool {
  position: absolute;
  width: 90px;
  background-color: #fff;
  right: -40px;
  top: 0px;
  line-height: 33px;
  padding: 10px;
}
.nocolor {
  color: #000 !important;
  text-shadow: none !important;
}
.disnone {
  display: none;
}
.avatar {
  display: inline-block;
  text-align: center;
  background: #ccc;
  color: #fff;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  vertical-align: middle;
  width: 36px;
  height: 36px;
  line-height: 32px;
  border-radius: 50%;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.international-header {
  min-width: 999px;
  min-height: 56px;
}
.mini-header {
  position: absolute;
  z-index: 99999;
  width: 100%;
  height: 56px;
}
.mini-header__content {
  box-sizing: border-box;
  padding: 10px 24px;
  line-height: 30px;
  position: relative;
  margin: 0 auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
}
.bili-banner {
  margin: 0 auto;
  position: relative;
  z-index: 0;
  min-height: 155px;
  height: 9.375vw;
  min-width: 999px;
  background-color: #f9f9f9;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  background-repeat: no-repeat;
  background-position: center 0;
  background-size: cover;
}
.nav-link .nav-link-ul {
  height: 36px;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
}
.nav-link-item {
  margin-right: 12px;
}
.nav-link .nav-link-ul .nav-link-item .link {
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
  line-height: 32px;
  white-space: nowrap;
  display: -ms-flexbox;
  display: flex;
}
.nolink {
  color: #312f2f;
  margin-right: 4px;
}
.nav-search-box {
  margin: 0 10px;
  width: 500px;
  /* transition: width .3s; */
}
.nav-search {
  position: relative;
}
.international-header .nav-search .nav-search-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  padding: 0;
  width: 48px;
  height: 36px;
  border: none;
  border-radius: 2px;
  /* background: #e7e7e7; */
  line-height: 26px;
  cursor: pointer;
}
.international-header .nav-search .nav-search-keyword {
  word-break: break-all;
  overflow: hidden;
  width: 100%;
  height: 34px;
  border: none;
  background-color: transparent;
  box-shadow: none;
  color: #999;
  font-size: 14px;
  line-height: 34px;
  transition: all 0.2s;
}
.international-header .nav-search #nav_searchform {
  display: block;
  padding: 0 38px 0 16px;
  border: 1px solid hsla(0deg, 2%, 10%);
  border-radius: 2px;
  background-color: #fff;
}
.international-header .nav-search .nav-search-submit {
  position: absolute;
  top: 8px;
  right: 16px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  color: #505050;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: all 0.2s;
}
.nav-user-center {
  display: flex;
  flex-shrink: 0;
}

.animated-banner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
}
.animated-banner > .layer {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.bili-banner .taper-line {
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%;
  height: 100px;
  background: linear-gradient(rgba(0, 0, 0, 0.4), transparent);
}

.user-con {
  display: flex;
  align-items: center;
}
.nav-user-center .user-con .item {
  position: relative;
  display: flex;
  margin-left: 12px;
  cursor: pointer;
}
.nav-user-center .user-con .item .name {
  color: #fff;
  text-shadow: 0 1px 1px rgb(0 0 0 / 30%);
  white-space: nowrap;
}
.mini-upload {
  cursor: pointer;
  position: relative;
  color: #fff;
  font-size: 14px;
  display: block;
  width: 100px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #32b1c5;
  border-radius: 2px;
  margin-left: 14px;
}
</style>
