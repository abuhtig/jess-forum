<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <list></list>
        </div>
        <div class="layui-col-md4">
         <hotList></hotList>
         <ads></ads>
         <links></links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotList from '../../components/sidebar/HotList'
import Links from '../../components/sidebar/Links.vue'
import Ads from '../../components/sidebar/Ads.vue'
import List from '../../components/contents/List.vue'
export default {
  name: 'template',
  components: {
    HotList,
    Links,
    Ads,
    List
  }
}
</script>

<style>

</style>
