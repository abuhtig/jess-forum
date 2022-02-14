<template>
  <div>
    <div class="panel">
      <div class="fly-panel-title fly-filter">
      <div class="flexList">
      <router-link tag="li" to="/" class="layui-hide-xs"><a>首页</a></router-link>
      <router-link v-for="(item,index) in catlogLists" :key='"panel" + index' tag="a" :to="item.path">
        <a>
          {{item.name}}
          <span class="layui-badge-dot" v-if="item.isNew"></span>
        </a>
      </router-link>
      </div>
        <span class="fly-filter-right layui-hide-xs">
          <a :class="{'layui-this':sort === 'created'}" @click.prevent="option(3)">按最新</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this':sort === 'answer'}" @click.prevent="option(4)">按热议</a>
        </span>
      </div>
      <listitem :lists="lists" @nextpage="nextPage()"></listitem>
    </div>
  </div>
</template>

<script>
import { getList } from '../../../api/concent'
import Listitem from './Listitem'
export default {
  name: 'list',
  components: {
    Listitem
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    '$route' (to, from) {
      const searchVal = to.query.search
      const catalog = to.params.catalog
      const tag = to.query.tags
      if (typeof tag !== 'undefined' && tag !== '') {
        this.tag = tag
      }
      if (typeof searchVal !== 'undefined' && searchVal !== '') {
        this.search = searchVal
      }
      if (typeof catalog !== 'undefined' && catalog !== '') {
        this.catalog = catalog
      }
      this.init()
    }
  },
  data () {
    return {
      status: '',
      tag: '',
      sort: '',
      page: 0,
      limit: 20,
      search: '',
      catalog: '',
      current: '',
      isEnd: false,
      lists: [],
      catlogLists: [
        {
          name: '提问',
          path: '/index/ask',
          isNew: false
        },
        {
          name: '分享',
          path: '/index/share',
          isNew: false
        },
        {
          name: '专栏',
          path: '/index/special',
          isNew: false
        },
        {
          name: '公告',
          path: '/index/notice',
          isNew: false
        },
        {
          name: '建议',
          path: '/index/advise',
          isNew: false
        }
      ],
      isLogin: this.$store.state.isLogin
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    init () {
      this.page = 0
      this.lists = []
      this.isEnd = false
      this._getList()
    },
    _getList () {
      if (this.isEnd) {
        return
      }
      const options = {
        status: this.status,
        tag: this.tag,
        sort: this.sort,
        page: this.page,
        limit: this.limit,
        catalog: this.catalog,
        search: this.search
        // isTop: 0
      }
      getList(options).then((res) => {
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch((err) => {
        if (err) {
          console.log(err.msg)
        }
      })
    },
    nextPage () {
      this.page++
      this._getList()
    },
    option (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        case 0:
          this.status = '0'
          this.tag = ''
          break
        case 1:
          this.status = '1'
          this.tag = ''
          break
        case 2:
          this.status = '0'
          this.tag = '精华'
          break
        case 3:
          this.sort = 'created'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
          break
      }
    }
  }
}
</script>

<style>
a {
  cursor: pointer;
}
.flexList {
  display: flex;
}
</style>
