<template>
  <div>
    <div v-show="isShow">
      <div class="mask" @click="closeMask"></div>
      <div class="alert">
        <div class="msg">{{msg}}</div>
        <div v-if="this.type === 'alert'">
          <div class="btn success" @click="close()" >确定</div>
        </div>
        <div v-else class="round">
          <div class="btn cancel" @click="cancelEvent" >取消</div>
          <div class="btn success" @click="successEvent" >确定</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'alert'
    },
    msg: {
      type: String,
      default: ''
    },
    isShow: {
      type: Boolean,
      default: false
    },
    cancel: {
      type: Function,
      default: () => { console.log('1') }
    },
    success: {
      type: Function,
      default: () => { console.log('11') }
    }
  },
  methods: {
    close () {
      this.isShow = false
    },
    closeMask () {
      if (this.type === 'alert') {
        this.close()
      }
    },
    cancelEvent () {
      this.cancel()
      this.close()
    },
    successEvent () {
      this.success()
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
$btn-main: #009688;
$btn-cancel:#9b9999;
$btn-dark: darken($btn-main, 4%);
$btn-cdark: darken($btn-cancel, 4%);
.mask{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background:rgba(0, 0, 0, 0.3);
  z-index: 88888;
  overflow: hidden;
}
.alert{
  width: 300px;
  height: 150px;
  position: fixed;
  background-color: #fff;
  border-radius: 6px;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -75px;
  padding: 20px 10px;
  box-shadow: 0 5px 5px rgba(0, 0, 0,0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  z-index: 88888;
}
.msg{
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.round{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 10px;
}
.btn{
  width:105px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 6px;
  cursor:pointer;
  &.success{
    background: $btn-main;
    &:hover {
      background: $btn-dark;
    }
  }
  &.cancel{
    background: $btn-cancel;
    &:hover {
      background: $btn-cdark;
    }
  }
}
</style>
