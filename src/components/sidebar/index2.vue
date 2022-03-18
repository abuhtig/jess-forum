<template>
  <div class="wrap">
    <div class="title"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      labels: []
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
.wrap {
  padding: 10px;
  position: relative;
  z-index: 2;
}
.title {
  font-size: 18px;
}
</style>
