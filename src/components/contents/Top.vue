<template>
  <div>
    <div class="fly-panel">
        <div class="fly-panel-title fly-filter">
          <a>置顶</a>
        </div>
        <ul class="list">
          <li class="line" v-for="(item, index) in lists" :key="'listitem' + index">
            <a class="layui-badge layui-bg-blue">{{ item.catalog }}</a>
            <span class="padd">
            <router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link>
            </span>
            <span>{{ item.text }}</span>
            <span class="nums">
              <i class="iconfont icon-pinglun1" title="回答"></i>{{item.answer}}
            </span>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { getTopList } from '../../../api/concent'
export default {
  name: 'top',
  data () {
    return {
      lists: []
    }
  },
  methods: {
    async getList () {
      await getTopList().then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style>
.list {
  display: inline-block;
  margin: 20px 20px;
  padding-bottom: 15px 15px 15px 75px;
}
.padd {
  font-size: medium;
  padding-left: 3px;
  padding-right: 20px;
}
.nums {
  position:absolute;
  right: 0;
  padding-right: 20px;
}
</style>
