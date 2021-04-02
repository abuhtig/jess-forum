<template>
  <div>
      <div class="fly-panel" style="margin-bottom: 0;">
        <div class="fly-panel-title fly-filter">
          <a :class="{'layui-this': status === '' & tag === ''}" @click.prevent="search()">综合</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status === '0'}" @click.prevent="search(0)">未结</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status === '1'}" @click.prevent="search(1)">已结</a>
          <span class="fly-mid"></span>
          <a :class="{'layui-this': status === '' & tag === '精华'}" @click.prevent="search(2)">精华</a>
          <span class="fly-filter-right layui-hide-xs">
            <a :class="{'layui-this':sort === 'created'}" @click.prevent="search(3)">按最新</a>
            <span class="fly-mid"></span>
            <a :class="{'layui-this':sort === 'answer'}" @click.prevent="search(4)">按热议</a>
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
    '$route' (newval, oldval) {
      const catalog = newval.params.catalog
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
      catalog: '',
      current: '',
      isEnd: false,
      lists: []
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
        isTop: 0
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
    search (val) {
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
          this.status = ''
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
</style>
