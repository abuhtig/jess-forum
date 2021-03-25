<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <top></top>
          <list></list>
        </div>
        <div class="layui-col-md4">
         <tips></tips>
         <sign></sign>
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
import Links from '../../components/sidebar/Links'
import Sign from '../../components/sidebar/Sign'
import Tips from '../../components/sidebar/Tips'
import Ads from '../../components/sidebar/Ads'
import List from '../../components/contents/List'
import Top from '../../components/contents/Top'
export default {
  name: 'index',
  components: {
    HotList,
    Links,
    Sign,
    Tips,
    Ads,
    List,
    Top
  }
}
</script>

<style>

</style>
