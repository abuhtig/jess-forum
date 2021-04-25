<template>
  <div>
    <table class="layui-table" border="0">
      <thead>
        <tr>
          <th>
            <div class="layui-table-cell">
              <span>帖子标题</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>状态</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>结贴</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>发表时间</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>数据</span>
            </div>
          </th>
          <th>
            <div class="layui-table-cell">
              <span>操作</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
          <td>
            <div type="button" class="layui-btn layui-btn-xs ">编辑</div>
            <div type="button" class="layui-btn layui-btn-xs layui-btn-danger">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'myposts'
}
</script>

<style lang="scss" scoped>
th>div{
  padding-left: 0;
}
</style>
