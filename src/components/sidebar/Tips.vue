<template>
  <div>
    <div class="fly-panel">
      <h3 class="fly-panel-title">温馨通道</h3>
      <div class="index-content" id="my">
        <div>
          <img src="" alt="">
        </div>
        <!-- <ul class="fly-panel-main fly-list-static" v-for="(item,index) in lists" :key="'tips' + index">
          <li>
            <a :href="item.link" target="_blank">{{item.title}}</a>
          </li>
        </ul> -->
    </div>
  </div>
  </div>
</template>

<script>
import { getTips } from '../../../api/concent'
export default {
  name: 'tips',
  data () {
    return {
      img: ['/img/1.webp', '/img/2.webp'],
      lists: []
    }
  },
  mounted () {
    // getTips()
  },
  methods: {
    getTips () {
      getTips().then((res) => {
        if (res.code === 200) {
          this.img = res.data
        }
      })
    }
  }
}
</script>

<style>
</style>
