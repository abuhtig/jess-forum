<template>
<div class="page">
  <div class="layui-box layui-laypage layui-laypage-default curr">
    <span class="layui-laypage-count">共{{total}}条</span>
    <a class="layui-laypage-prev" @click="prev" :class="{'layui-disabled': current === 0}">上一页
    </a>
    <a class="layui-laypage-curr" @click="home" v-if="pages.length > 4 && current +1 > 3">1</a>
    <a class="layui-laypage-spr" v-if="pages.length > 5 && current +1 -2 > 1">...</a>

    <template v-for="(item, index) in pages">
      <a class="layui-laypage-curr"
      @click="ChangeIndex(item)"
      v-if="item >= (current +1 - 2) && item <= (current +1 + 2)"
      :class="[current === index ? 'bgc' : '']"
      :key="'pages' + index">
      {{item}}
      </a>
    </template>

    <a class="layui-laypage-spr" v-if="pages.length > 5 && current +1 +2 < pages.length">...</a>
    <a  class="layui-laypage-curr" @click="end" v-if="pages.length > 4 && current + 1 < pages.length - 2">{{pages.length}}</a>
    <a  class="layui-laypage-next" @click="next" :class="{'layui-disabled': current === pages.length - 1}">下一页</a>
  </div>
</div>

</template>

<script>
import _ from 'lodash'
export default {
  name: 'paging',
  data () {
    return {
      pages: [],
      size: 10
    }
  },
  props: {
    total: {
      typle: Number,
      default: 0
    },
    current: {
      typle: Number,
      default: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      const len = Math.ceil(this.total / this.size)
      this.pages = _.range(1, len + 1)
    },
    home () {
      this.$emit('changeCurrent', 0)
    },
    end () {
      this.$emit('changeCurrent', this.pages.length - 1)
    },
    prev () {
      if (this.current === 0 || this.total < 11) {
        return
      }
      this.$emit('changeCurrent', this.current - 1)
    },
    next () {
      if (this.current === this.pages.length - 1 || this.total < 11) {
        return
      }
      this.$emit('changeCurrent', this.current + 1)
    },
    ChangeIndex (val) {
      if (val - 1 !== this.current) {
        this.$emit('changeCurrent', val - 1)
      }
    }
  },
  watch: {
    total (nval, oval) {
      this.init()
    }
  }
}
</script>

<style>
.page {
  text-align: center;
}
.bgc {
  background-color: #009688!important;
  color: white!important;
}
#skip {
  background-color:unset!important;
  color: black!important;
}
.curr a{
  cursor: pointer;
}
</style>
