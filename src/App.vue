<template>
  <div id="app">
    <lui-header></lui-header>
    <router-view></router-view>
    <lui-footer></lui-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'app',
  components: {
    'lui-header': Header,
    'lui-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/css/global.css";
@import "assets/ico/iconfont.css";
</style>
