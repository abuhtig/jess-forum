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
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in lists" :key="'mycoll' + index">
          <td><router-link :to="{name: 'Detail', params: {tid: item.tid}}">{{item.title}}</router-link></td>
          <td>{{item.created | moment}}</td>
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
import { getCollectionList } from '../../../../api/user'
export default {
  name: 'mycollection',
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
    this.getCollection()
  },
  methods: {
    getCollection () {
      getCollectionList({
        page: this.current
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = res.total
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCollection()
    }
  }
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
