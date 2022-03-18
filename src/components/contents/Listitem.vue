<template>
  <div>
    <div class="list-container">
      <ul class="list-items">
        <li class="list-item" v-for="(item, index) in lists" :key="'listitem' + index">
          <div class="list-item-main">
            <div class="list-item-meta">
              <div class="list-item-meta-avatar">
                <span class="avatar">
                  <a href="javascript:;" @click="router(item.uid._id)">
                    <img :src="item.uid ? item.uid.pic : '/img/touxiang.jpeg'" alt="头像">
                  </a>
                </span>
              </div>
                <div class="list-item-meta-title">
                  <router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link>
                </div>
            </div>
            <div class="text">
            {{replace(item.content)}}
            </div>
            <div class="lableList">
            <div>{{item.uid.name}}</div>
            <div class="font">
                <i class="iconfont icon-ai45"></i>1
                <i class="iconfont icon-pinglun"></i>{{item.answer}}
                <i class="iconfont icon-eye"></i>{{item.reads}}
            </div>
              <div class="tag" v-for="tag in item.tags" :key="tag.name">
              <a @click="searchTag(tag.name)">{{tag.name}}</a>
              </div>
            </div>
          </div>
          <div v-if="item.pic" class="list-item-extra">
            <img :src="baseUrl + item.pic" alt="" style="max-height: 132px;">
          </div>
          <!-- <h2>
            <a class="layui-badge">{{item.catalog}}</a>
            <router-link :to="{name: 'Detail', params: {tid: item._id}}">{{item.title}}</router-link>
          </h2> -->
          <!-- <div class="fly-list-info">
            <a href="javascript:;" link>
              <cite>{{item.name}}</cite>
              <i class="iconfont icon-renzheng" title="认证信息：XXX"></i>
              <i class="layui-badge fly-badge-vip" v-if="item.isVip === '1' ">{{'VIP'}}</i>
            </a>
            <span>{{item.created | moment}}</span>
            <span v-if="item.catalog === '提问'" class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> {{item.fav}}</span>
            <span class="layui-badge fly-badge-accept layui-hide-xs" v-show="item.status === '1'">已结</span>
            <span class="fly-list-nums">
              <i class="iconfont icon-pinglun1" title="回答"></i>{{item.answer}}
            </span>
          </div>
          <div class="fly-list-badge" v-show="item.tags.length > 0 && item.tags[0].name !== ''">
          <span class="layui-badge layui-bg-red" v-for="(tag, index) in item.tags" :key="'tag' + index" :class="tag.classname">{{tag.name}}</span>
          </div> -->
        </li>
      </ul>
    </div>
      <div style="text-align: center" v-show="isShow">
        <div class="laypage-main" v-if="!isEnd">
          <a @click.prevent="more()" class="laypage-next">更多求解</a>
        </div>
        <div class="nomore gray" v-else>没有更多了</div>
      </div>
  </div>
</template>

<script>
import config from '../../../config/index'
export default {
  name: 'listitem',
  data () {
    return {
      baseUrl: config.baseUrl
    }
  },
  props: {
    lists: {
      default: () => [],
      type: Array
    },
    isShow: {
      default: true,
      type: Boolean
    },
    isEnd: {
      default: true,
      type: Boolean
    }
  },
  computed: {
  },
  methods: {
    more () {
      this.$emit('nextpage')
    },
    replace (item) {
      const data = item.replace(/<\/?.+?>/g, '')
      if (data) {
        return data
      }
      return '点击查看全文'
    },
    searchTag (tag) {
      this.$router.push({ path: '/', query: { tags: tag } })
    },
    imgsrc (item) {
      const re = /<img[^>]+src=['"]([^'"]+)['"]+/g
      const data = re.exec(item)
      if (data) {
        return data[1]
      } else {
        return ''
      }
    },
    router (id) {
      this.$router.push({ path: '/user', query: { _id: id } })
    }
  }
}
</script>

<style scoped>
.font {
  padding-left: 5px;
  color: #99a2aa;
}
.font i {
  padding-left: 5px;
  padding-right: 1px;
}
.list-container {
  padding: 5px;
}
.nomore{
  color: rgb(155, 151, 151);
  padding: 12px;
}
.list-item {
    align-items: initial;
    border-bottom: 1px solid #e8eaec;
    display: flex;
    padding: 12px 0;
    align-items: center;
}
.list-item-main {
  display: grid;
  flex: 1;
}
.list-item-meta {
  padding-left: 10px;
  margin-bottom: 16px;
  display: flex;
  flex: 1;
  align-items: center;
  font-size: 0;
}
.list-item-meta-avatar {
    margin-right: 16px;
}
.list-item-extra {
  display: inline;
  padding-left: 10px;
}
.list-item-meta-avatar img {
    width: 100%;
    height: 100%;
}
.avatar {
    display: inline-block;
    text-align: center;
    background: #ccc;
    color: #fff;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    width: 36px;
    height: 36px;
    line-height: 32px;
    border-radius: 50%;
}
.list-item-meta-title {
    color: rgba(0,0,0,.85);
    font-size: 18px;
    line-height: 24px;
}
.text {
    padding-left: 10px;
    cursor: pointer;
    margin-top: 4px;
    font-size: 14px;
    color: #99a2aa;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.list-item-action {
  margin-top: 10px;
  height: 24px;
  line-height: 38px;
}
.list-item-action span {
  margin-right: 20px;
  color: #99a2aa;
}
.lableList {
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-left: 7px;
  overflow: hidden;
}
</style>
