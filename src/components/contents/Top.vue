<template>
  <div class="bgm">
    <div class="primary-menu-itnl">
      <div class="page-tab">
        <ul class="con">
          <li>
            <a href="/"><div class="round">
            <i class="iconfont icon-zhuye"></i>
            <span>首页</span></div>
            </a>
          </li>
          <li>
            <a href="http://a.toped.top"><div class="round">
            <i class="iconfont icon-yunyingguanli"></i>
            <span>管理</span></div>
            </a>
          </li>
          <li>
            <a href="/"><div class="round">
            <i class="iconfont icon-xiaochengxu"></i>
            <span>程序</span></div>
            </a>
          </li>
        </ul>
      </div>
      <span class="tab-line"></span>
      <div class="channel-menu-itnl">
        <span>
          <div class="item">
            <a @click="searchTag(item.name)" class="name" v-for="(item, index) in labels" :key="'labels' + index">
              <span>{{item.name}}</span>
            </a>
          </div>
        </span>
      </div>
      <span class="tab-line"></span>
      <div class="page-tab">
        <ul class="con">
          <li>
            <a href="/"><div class="round">
            <i class="iconfont icon-balance-full"></i>
            <span>小黑屋</span></div>
            </a>
          </li>
          <li>
            <a  @click="searchTag('视频')"><div class="round">
            <i class="iconfont icon-shipinbofang"></i>
            <span>视频</span></div>
            </a>
          </li>
          <li>
            <a @click="searchTag('音乐')"><div class="round">
            <i class="iconfont icon-vynil"></i>
            <span>音乐</span></div>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="space-between">
      <div class="focus-carousel">
        <div :style="{'top':calleft + 'px'}" @mouseover="stopmove()" class="van-slide" style="width: 550px; height: 242px;">
          <div v-for="(imgUrl, index) in bannerList" :key="index">
              <img :src="imgUrl" class="img">
          </div>
        </div>
      </div>
      <div class="ltmp">
        <sign></sign>
        <div class="content">
          <dd v-for="(item, index) in lists" :key="'week' + index">
            <a @click="router(item._id)">{{item.title}}</a>
          </dd>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getTopList, getLabels } from '../../../api/concent'
import sign from '../sidebar/Sign.vue'
export default {
  name: 'top',
  components: {
    sign
  },
  data () {
    return {
      lists: [],
      labels: [],
      calleft: 0,
      timer: {},
      mark: 0,
      bannerList: ['/img/2.jpg', '/img/3.jpg', '/img/4.jpg']
    }
  },
  methods: {
    async getList () {
      await getTopList().then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
      await getLabels().then((res) => {
        if (res.code === 200) {
          this.labels = res.data
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
      this.calleft -= 242
      if (this.calleft < (this.bannerList.length - 1) * -360) {
        this.calleft = 0
      }
    },
    router (tid) {
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
    items () {
      this.lists.map((item) => {
        switch (item.catalog) {
          case 'ask':
            item.catalog = '提问'
            break
          case 'share':
            item.catalog = '分享'
            break
          case 'logs':
            item.catalog = '动态'
            break
          case 'notice':
            item.catalog = '公告'
            break
          case 'advise':
            item.catalog = '建议'
            break
          case 'special':
            item.catalog = '专栏'
            break
        }
      })
      return this.lists
    }
  }
}
</script>

<style scoped>
.content {
  font-size: 14px;
  line-height: 14px;
}
img {
  width:100%;
  height:100%;
}
.page-tab {
  margin: 0 10px;
}
.channel-menu-itnl .item .name span {
  float: left;
  margin: 0 6px 4px 0;
  background: #F6F7F8;
  border-radius: 100px;
  padding: 0 6px;
  position: relative;
  height: 22px;
  line-height: 22px;
  transition: all 0.3s;
  font-size: 16px;
  border: 1px solid transparent;
}
.channel-menu-itnl .item .name {
    font-size: 16px;
    display: flex;
    align-items: center;
    white-space: nowrap;
}
.channel-menu-itnl .item {
    position: relative;
    cursor: pointer;
    display: flex;
    height: 34px;
    flex-wrap: wrap;
    justify-content: center;
}
.channel-menu-itnl {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 5rem;
    height: 68px;
    flex: 1;
    justify-content: center;
    overflow: hidden;
    word-wrap: break-word;
    word-break: normal;
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
    margin-bottom: 40px;
}
.focus-carousel {
    position: relative;
    width: 550px;
    height: 242px;
    overflow: hidden;
    border-radius: 2px;
}
.van-slide {
  width: 100%;
  height: 100%;
  z-index: 1;
  position: relative;
  transition-duration: 0.75s;
}
.van-slide>div {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  z-index: 0;
}

.ltmp {
  position: relative;
  width: 570px;
  overflow: hidden;
}
</style>
