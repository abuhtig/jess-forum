<template>
  <div>
    <div class="fly-panel">
        <div class="fly-panel-title fly-filter">
          <a>置顶</a>
          <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin" style="color: #FF5722;">去签到</a>
        </div>
        <listitem :lists="lists" :isShow="false"></listitem>
      </div>
  </div>
</template>

<script>
import Listitem from './Listitem'
export default {
  name: 'top',
  components: {
    Listitem
  },
  data () {
    return {
      lists: []
    }
  }
}
</script>

<style>

</style>
