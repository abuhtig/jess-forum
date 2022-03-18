<template>
  <div class="fly-panel">
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
              <span>浏览时间</span>
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
        <tr v-for="(item, index) in lists.records" :key="'mypost' + index">
          <td><router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link></td>
          <td>{{item.created | moment}}</td>
          <td>
            <div type="button" class="layui-btn layui-btn-xs layui-btn-danger" @click="_deleteHistory(item._id, index)">删除</div>
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
import { getHistory, deleteHistory } from '../../../api/concent'
import Page from '../modules/paging/index'
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
    this._getHistory()
  },
  methods: {
    _getHistory () {
      getHistory({ page: this.current }).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this._getHistory()
    },
    _deleteHistory (id, index) {
      this.$confirm('确定删除吗?', () => {
        deleteHistory({ _id: id }).then(res => {
          if (res.code === 200) {
            this.lists.splice(index, 1)
            this.$alert(res.msg)
          } else {
            this.$alert(res.msg)
          }
        })
      }, () => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
th>div{
  padding-left: 0;
}
</style>
