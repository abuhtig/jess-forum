<template>
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief">
      <ul class="layui-tab-title">
        <li><router-link :to="{name: 'Myposts'}">我的发帖</router-link></li>
        <li><router-link :to="{name: 'MyCollection'}">我的收藏</router-link></li>
      </ul>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'posts'
}
</script>

<style>
.pl10{
  padding-left: 0;
}
.textc{
  text-align: center;
}
.textl{
  text-align: left;
}
</style>
