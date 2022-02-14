<template>
  <div>
    <div class="layui-container fly-marginTop fly-user-main">
      <ul class="layui-nav layui-nav-tree" lay-filter="test">
        <li class="layui-nav-item" v-for="(item, index) in lists" :key="'center' + index">
          <router-link :to="{name: item.link}" :active-class="item.activeClass">
            <i class="iconfont" :class="item.icon"></i>
            {{item.name}}
          </router-link>
        </li>
      </ul>
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'center',
  data () {
    return {
      lists: [
        {
          name: '我的主页',
          icon: 'icon-home_light',
          link: 'User'
        },
        {
          name: '个人中心',
          icon: 'icon-geren',
          link: 'center'
        },
        {
          name: '基本设置',
          icon: 'icon-set',
          link: 'Myinfo',
          activeClass: 'layui-this'
        },
        {
          name: '我的帖子',
          icon: 'icon-doc',
          link: 'Myposts',
          activeClass: 'layui-this'
        },
        {
          name: '我的消息',
          icon: 'icon-xiaoxi',
          link: 'Msg'
        },
        {
          name: '其他设置',
          icon: 'icon-qita',
          link: 'Others'
        }
      ]
    }
  }
}
</script>

<style>
.iconfont2 {
  margin-right:10px;
}
</style>
