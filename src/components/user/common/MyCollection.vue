<template>
  <div>
        <table class="layui-table" border="0">
      <thead>
        <tr>
          <th class="with">
            <div class="layui-table-cell pl0">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell pl0">
              <span>收藏时间</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell pl0">
              <span>操作</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>
            <div type="button" class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'mycollection'
}
</script>

<style>
.with{
  width: 60%;
}
th .pl0{
  padding-left: 0;
}
</style>
