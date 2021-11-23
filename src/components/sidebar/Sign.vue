<template>
  <div>
    <div class="fly-panel fly-signin">
      <div class="fly-panel-title">
        签到
        <i class="fly-mid"></i>
        <a href="javascript:;" @click="isShow" class="fly-link" id="LAY_signinHelp">说明</a>
        <i class="fly-mid"></i>
        <a href="javascript:;" @click="isShow2" class="fly-link" id="LAY_signinTop">活跃榜</a>
        <span class="fly-signin-days">已连续签到<cite>{{count}}</cite>天</span>
      </div>
      <div class="fly-panel-main fly-signin-main">

        <template v-if="!isSign">
        <button @click="sign" class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
        <span>可获得<cite>{{favs}}</cite>飞吻</span>
        </template>
        <!-- 已签到状态 -->
        <template v-else>
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>获得了<cite>{{favs}}</cite>飞吻</span>
        </template>

      </div>
    </div>
    <div class="mask" @click="close" v-show="show">
      <div class="layui-card show">
        <div class="layui-card-header">积分规则</div>
        <div class="layui-card-body">
          <table class="layui-table">
            <thead>
              <tr>
                <th>连续签到天数</th>
                <th>每天可获积分</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&lt;10天</td>
                <td>5积分</td>
              </tr>
              <tr>
                <td>&gt;20天</td>
                <td>10积分</td>
              </tr>
              <tr>
                <td>&gt;40天</td>
                <td>15积分</td>
              </tr>
              <tr>
                <td>&gt;80天</td>
                <td>20积分</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="mask" @click="close2" v-show="show2">
      <div class="layui-card show">
        <div class="layui-card-header">活跃榜TOP20</div>
        <div class="layui-card-body">
          <table class="layui-table">
            <thead>
              <tr>
                <th>用户名</th>
                <th>连续签到天数</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>522</td>
                <td>5天</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userSign } from '../../../api/user'
export default {
  name: 'sign',
  data () {
    return {
      show: false,
      show2: false,
      isSign: this.$store.state.userInfo.isSign ? this.$store.state.userInfo.isSign : false
    }
  },
  computed: {
    count () {
      if (this.$store.state.userInfo !== {} && typeof this.$store.state.userInfo.count !== 'undefined') {
        return this.$store.state.userInfo.count
      } else {
        return 0
      }
    },
    favs () {
      const count = parseInt(this.count)
      let result = 0
      if (count <= 10) {
        result = 5
      } else if (count > 10 && count <= 20) {
        result = 10
      } else if (count > 20 && count <= 40) {
        result = 15
      } else {
        result = 20
      }
      return result
    }
  },
  methods: {
    isShow () {
      this.show = true
    },
    close () {
      this.show = false
    },
    isShow2 () {
      this.show2 = true
    },
    close2 () {
      this.show2 = false
    },
    sign () {
      if (this.$store.state.isLogin) {
        userSign().then((res) => {
          const user = this.$store.state.userInfo
          if (res.code === 200) {
            this.isSign = true
            user.favs = res.favs
            user.count = res.count
            user.isSign = true
            this.$store.commit('setUserInfo', user)
          } else {
            this.isSign = false
          }
        })
      } else {
        this.$alert('请先登陆!')
      }
    }
  }
}
</script>

<style>
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background:rgba(0, 0, 0, 0.3);
  z-index: 8888;
  overflow: hidden;
}
.show{
  position: fixed;
  background-color: #fff;
  border-radius: 6px;
  top: 35%;
  left: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px;
  box-shadow: 0 5px 5px rgba(0, 0, 0,0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
}
</style>
