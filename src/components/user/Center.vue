<template>
  <div>
    <div class="panel main pd20">
      <div class="msg">
        hi,admin
      </div>
      <div class="layui-row layui-col-space20">
        <div class="layui-col-md6">
          <div class="border panel">
            <div class="title">我的会员信息</div>
            <div class="content">
              <p>你的积分有:</p>
              <p>你当前为:</p>
            </div>
          </div>
        </div>
        <div class="layui-col-md6">
          <sign class="border"></sign>
        </div>
        <div class="layui-col-md12">
          <div class="border panel">
            <div class="title">
              快捷方式
            </div>
            <div class="content">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sign from '../sidebar/Sign'
export default {
  name: 'user-center',
  components: {
    sign
  }
}
</script>

<style lang="scss" scoped>
.panel {
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 1px 2px rgb(240, 240, 240);
  &.main {
    margin: 0 0 10px 225px;
  }
}
.pd20 {
  padding: 20px;
}
.msg {
  background-color: rgb(248, 246, 246);
  color: rgb(0, 0, 0);
  padding: 10px 15px;
  margin-bottom: 20px;
}
.border {
  border: 1px solid #e6e6e6;
}

.title {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px dotted #e6e6e6;
  font-size: 14px;
  padding: 0 15px;
}

.content {
  padding: 25px 15px;
  height: 50px;
  line-height:25px;
  color: rgb(95, 93, 93);
}
</style>
