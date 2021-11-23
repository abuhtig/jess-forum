<template>
<div class="fly-panel fly-panel-user" pad20>
  <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">
    <button class="layui-btn layui-btn-danger" id="LAY_delallmsg">清空全部消息</button>
    <div id="LAY_minemsg" style="margin-top: 10px;">
      <!--<div class="fly-none">您暂时没有最新消息</div>-->
      <ul class="mine-msg">
        <li v-for="(item, index) in lists" :key="index" data-id="123">
          <blockquote class="layui-elem-quote">
            <a href="#" target="_blank"><cite>{{item.fuid.name}}</cite></a>回答了您的求解<router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link>
          </blockquote>
          <p><span>{{item.created | moment}}</span></p>
        </li>
      </ul>
    </div>
  </div>
  <Page @changeCurrent="handleChange" :total="total"></Page>
</div>
</template>

<script>
import { getMsg } from '../../../api/user'
import Page from '../modules/paging/index'
export default {
  name: 'msg',
  components: {
    Page
  },
  data () {
    return {
      lists: [],
      page: 0,
      total: 0
    }
  },
  methods: {
    getMsgAll () {
      getMsg({
        page: this.page
      }).then(res => {
        if (res.code === 200) {
          this.lists = res.data
          this.total = this.lists.length
        }
      })
    },
    handleChange (val) {
      this.page = val
      this.getMsgAll()
    }
  },
  mounted () {
    this.getMsgAll()
  }
}
</script>

<style>

</style>
