<template>
  <div>
    <div class="fly-panel">
        <div class="fly-panel-title fly-filter">
          <a>置顶</a>
          <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
        </div>
        <ul class="list">
          <li class="line" v-for="(item, index) in lists" :key="'listitem' + index">
            <a class="layui-badge layui-bg-blue">{{ item.catalog }}</a>
            <span class="padd">{{ item.title }}</span>
            <span>{{ item.text }}</span>
            <span class="nums">
              <i class="iconfont icon-pinglun1" title="回答"></i>{{item.answer}}
            </span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  components: {
  },
  data () {
    return {
      lists: [{
        catalog: '官方',
        title: '提醒!',
        text: '打卡,打卡,打卡,打卡,打卡,打卡,打卡,打卡,打卡,打卡,打卡,打卡',
        answer: 2
      }]
    }
  }
}
</script>

<style>
.list {
  display: inline-block;
  margin: 20px 20px;
  padding-bottom: 15px 15px 15px 75px;
}
.padd {
  font-size: medium;
  padding-left: 3px;
  padding-right: 20px;
}
.nums {
  position:absolute;
  right: 0;
  padding-right: 20px;
}
</style>
