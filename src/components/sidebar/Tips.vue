<template>
  <div>
    <div class="fly-panel">
      <h3 class="fly-panel-title">温馨通道</h3>
        <ul class="fly-panel-main fly-list-static" v-for="(item,index) in lists" :key="'tips' + index">
          <li>
            <a :href="item.link" target="_blank">{{item.title}}</a>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import { getTips } from '../../../api/concent'
export default {
  name: 'tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style>

</style>
