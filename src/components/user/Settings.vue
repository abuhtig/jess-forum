<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li><router-link :to="{name: 'Myinfo'}">我的资料</router-link></li>
        <li><router-link :to="{name: 'PicUpload'}">头像</router-link></li>
        <li><router-link :to="{name: 'Passwd'}">密码</router-link></li>
        <li><router-link :to="{name: 'Accounts'}">帐号绑定</router-link></li>
      </ul>
      <div class="layui-tab-content" style="padding: 20px 0;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'settings'
}
</script>

<style>

</style>
