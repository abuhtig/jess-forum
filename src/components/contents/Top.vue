<template>
  <div class="bgm">
    <div class="primary-menu-itnl">
      <div class="channel-menu-itnl">
        <div class="item">
          <a @click="searchTag(item.name)" class="name" v-for="(item, index) in labels" :key="'labels' + index">
            <span>{{item.name}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="space-between">
      <div class="focus-carousel">
        <div :style="{'left':calleft + 'px'}" @mouseover="stopmove()" class="van-slide" style="width: 550px; height: 242px;">
          <div v-for="(imgUrl, index) in bannerList" :key="index">
              <img @click="router(imgUrl.tid)" :src="baseUrl + imgUrl.link" class="img">
              <p class="title">{{imgUrl.title}}</p>
          </div>
        </div>
      </div>
      <div class="ltmp">
        <div class="itmptit">
          <img style="width:18px;padding-right: 5px;" draggable="false" src="img/hot.png">本周热帖
        </div>
        <div class="content">
          <dd v-for="(item, index) in topLists" :key="'top' + index">
            <a @click="router(item._id)">{{item.title}}</a>
          </dd>
          <dd v-for="(item, index) in weekLists" :key="'week' + index">
            <a @click="router(item._id)">{{item.title}}</a>
          </dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../../config/index'
import { getTop, getLabels, getAdvert, getTopList } from '../../../api/concent'
export default {
  name: 'top',
  data () {
    return {
      weekLists: [],
      topLists: [],
      labels: [],
      calleft: 0,
      timer: {},
      mark: 0,
      baseUrl: base.baseUrl,
      bannerList: []
    }
  },
  methods: {
    async getList () {
      await getTopList().then((res) => {
        if (res.code === 200) {
          this.topLists = res.data
        }
      })
      await getTop().then((res) => {
        if (res.code === 200) {
          this.weekLists = res.data
        }
      })
      await getLabels().then((res) => {
        if (res.code === 200) {
          this.labels = res.data
        }
      })
      await getAdvert().then((res) => {
        if (res.code === 200) {
          this.bannerList = res.data
        }
      })
    },
    move () {
      this.timer = setInterval(this.starmove, 3000)
    },
    stopmove () {
      clearInterval(this.timer)
      setTimeout((this.move()), 3000)
    },
    starmove () {
      this.calleft -= 550
      if (this.calleft < (this.bannerList.length - 1) * -550) {
        this.calleft = 0
      }
    },
    router (tid) {
      if (!tid) {
        return
      }
      this.$router.push({ name: 'Detail', params: { tid } })
    },
    searchTag (tag) {
      this.$router.push({ path: '/', query: { tags: tag } })
    }
  },
  mounted () {
    this.getList()
    this.move()
  },
  computed: {
  }
}
</script>

<style scoped>
.content {
  color: #222226;
  margin-top: 6px;
  font-size: 15px;
  line-height: 32px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  word-break: break-all;
  text-align: center;
}
.title {
  position: absolute;
  bottom: 10px;
  left: 12px;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  -ms-flex-align: center;
  align-items: center;
  width: 70%;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

.page-tab {
  margin: 0 10px;
}
.channel-menu-itnl .item .name span {
  font-size: 16px;
  line-height: 16px;
}
.channel-menu-itnl .item .name {
    margin-right: 31px;
    margin-bottom: 16px;
    height: 24px;
}
.channel-menu-itnl .item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    position: relative;
    padding: 0 24px;
    top: 0;
    background-color: #fff;
}
.channel-menu-itnl {
    width: 100%;
    padding: 24px 0 0;
    background: #fff;
    overflow: hidden;
    max-height: 40px;
    position: relative;
    z-index: 9999;
}
.channel-menu-itnl:hover {
  overflow:unset;
}
.con li i {
  font-size: 30px;
}
.primary-menu-itnl {
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-align: center;
    align-items: center;
    padding: 20px 0;
    width: 100%;
}
.page-tab {
  display: flex;
  align-items: center;
}
.con {
  display: flex;
}
.page-tab .con li .round {
    position: relative;
    width: 42px;
    height: 36px;
    border-radius: 36px;
    text-align: center;
    margin: 0 auto 4px;
    padding-left: 2px;
}
.space-between {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
}
.focus-carousel {
    position: relative;
    width: 550px;
    height: 242px;
    overflow: hidden;
    border-radius: 2px;
}
.van-slide {
  position: relative;
  transition-duration: 0.75s;
  display: flex;
  flex-wrap: nowrap;
}
.van-slide>div {
  position: relative;
  top: 0;
  left: 0;
}
.img {
  width: 550px;
  height: 120%;
}
.ltmp {
  position: relative;
  width: 570px;
  overflow: hidden;
}
.itmptit {
  font-size: 18px;
  text-align: center;
}
</style>
