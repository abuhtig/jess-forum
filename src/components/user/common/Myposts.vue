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
        <tr v-for="(item, index) in lists" :key="'mypost' + index">
          <td><router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link></td>
          <td>{{item.isEnd ? '已结贴' : '未结贴'}}</td>
          <td>{{item.created | moment}}</td>
          <td>{{item.reads}}浏览/{{item.answer}}回复</td>
          <td>
            <div type="button" class="layui-btn layui-btn-xs layui-btn-danger" @click="deletePost(item._id, index)">删除</div>
          </td>
        </tr>
      </tbody>
    </table>
  <page
    @changeCurrent="handleChange"
    :current="current"
    :total="total"
  ></page>
  </div>
</template>

<script>
import Page from '../../modules/paging/index'
import { getPostList, deletePost } from '../../../../api/user'
export default {
  name: 'myposts',
  data () {
    return {
      lists: [],
      current: 0,
      total: 0
    }
  },
  components: {
    Page
  },
  mounted () {
    this.getPost()
  },
  methods: {
    getPost () {
      getPostList({
        page: this.current
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    deletePost (tid, index) {
      this.$confirm('确定删除吗?', () => {
        deletePost({ tid: tid }).then(res => {
          if (res.code === 200) {
            this.lists.splice(index, 1)
          } else {
            this.$alert(res.msg)
          }
        })
      }, () => {
      })
    },
    handleChange (val) {
      this.current = val
      this.getPost()
    }
  }
}
</script>

<style lang="scss" scoped>
th>div{
  padding-left: 0;
}
</style>
