<template>
  <div>
    <div class="fly-panel fly-signin">
      <div class="fly-panel-title">
        签到
        <i class="fly-mid"></i>
        <a href="javascript:;" @click="isShow" class="fly-link" id="LAY_signinHelp">说明</a>
        <i class="fly-mid"></i>
        <a href="javascript:;" @click="isShow2" class="fly-link" id="LAY_signinTop">活跃榜</a>
        <span class="fly-signin-days">已连续签到<cite>16</cite>天</span>
      </div>
      <div class="fly-panel-main fly-signin-main">
        <button class="layui-btn layui-btn-danger" id="LAY_signin">今日签到</button>
        <span>可获得<cite>5</cite>飞吻</span>

        <!-- 已签到状态 -->
        <!--
        <button class="layui-btn layui-btn-disabled">今日已签到</button>
        <span>获得了<cite>20</cite>飞吻</span>
        -->
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
              <tr>
                <td>111</td>
                <td>10积分</td>
              </tr>
              <tr>
                <td>1111</td>
                <td>11</td>
              </tr>
              <tr>
                <td>111</td>
                <td>20积分</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sign',
  data () {
    return {
      show: false,
      show2: false
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
