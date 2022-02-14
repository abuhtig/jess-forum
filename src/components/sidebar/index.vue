<template>
  <div class="wrap1">
    <div class="nav">
    </div>
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
.wrap1 {
  position: fixed;
  right: calc(50% + 73px);
  top: 240px;
  margin-right: 530px;
  z-index: 1;
}
@media screen and (max-width: 1200px) {
  .wrap1 {
    margin-right: 415px;
  }
}
@media screen and (max-width: 990px) {
  .wrap1 {
    margin-right: 319px;
  }
}

.nav {
    padding-top: 6px;
    position: relative;
    background: #fff;
    border: 1px solid #e7e7e7;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 2;
}

.item .name span {
  float: left;
  margin: 0 6px 4px 0;
  border-radius: 100px;
  padding: 0 6px;
  position: relative;
  height: 22px;
  line-height: 22px;
  transition: all 0.3s;
  font-size: 16px;
  border: 1px solid transparent;
}
.item .name {
  font-size: 16px;
  text-align: center;
}
.item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.item .name span:hover {
  background-color: #32b2c5a2;
  border-radius: 100px;
}
</style>
