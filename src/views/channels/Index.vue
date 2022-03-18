<template>
  <div class="flex">
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
          <top></top>
          <list></list>
      </div>
      <div class="storey">
        <sidebar></sidebar>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '../../components/sidebar/index.vue'
import List from '../../components/contents/List'
import Top from '../../components/contents/Top'
export default {
  name: 'index',
  components: {
    List,
    Top,
    sidebar
  }
}
</script>
<style>
</style>
