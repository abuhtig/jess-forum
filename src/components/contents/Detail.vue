<template>
<div>
  <panel></panel>
  <div class="layui-container">
    <div class="layui-row layui-col-space15">
      <div class="content detail">
        <div class="fly-panel detail-box">
          <h1>{{lists.title}}</h1>
          <div class="fly-detail-info">
            <!-- <span class="layui-badge">审核中</span> -->
            <span class="layui-badge layui-bg-green fly-detail-column">{{lists.catalog}}</span>

            <span class="layui-badge" style="background-color: #999;" v-show="lists.isEnd === '0' && lists.catalog === '提问'">未结贴</span>
            <span class="layui-badge" style="background-color: #5FB878;" v-show="lists.isEnd === '1' ">已结贴</span>

            <span class="layui-badge layui-bg-black" v-show="lists.isTop === '1'">置顶</span>
            <span class="layui-badge" :class="tag.class" v-for="(tag, index) in lists.tags" :key="'tag' + index">{{tag.name}}</span>

            <!-- <div class="fly-admin-box" data-id="123">
              <span class="layui-btn layui-btn-xs jie-admin" type="del">删除</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="stick" rank="1">置顶</span>

              <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="1">加精</span>
               <span class="layui-btn layui-btn-xs jie-admin" type="set" field="status" rank="0" style="background-color:#ccc;">取消加精</span>
            </div> -->

            <span class="fly-list-nums">
              <a href="#comment"><i class="iconfont" title="回答">&#xe60c;</i>{{total}}</a>
              <i class="iconfont" title="人气">&#xe60b;</i>{{lists.reads}}
            </span>
          </div>
          <div class="detail-about">
            <a class="fly-avatar" href="">
              <img :src="lists.uid ? lists.uid.pic : '/img/touxiang.jpeg'" alt="">
            </a>
            <div class="fly-detail-user">
              <a href="" class="fly-link">
                <cite>{{lists.uid ? lists.uid.name : 'admin'}}</cite>
                <!-- <i class="iconfont icon-renzheng" title="认证信息"></i> -->
                <i class="layui-badge fly-badge-vip" v-show="lists.uid ? lists.uid.isVip : '' ">VIP</i>
              </a>
              <span>{{lists.created | moment}}</span>
            </div>
            <div class="detail-hits">
              <!-- <span style="padding-right: 10px; color: #FF7200" v-if="lists.catalog === ask">悬赏：{{page.fav}}飞吻</span> -->
              <span class="layui-btn layui-btn-xs jie-admin" type="edit"><a href="add.html">编辑此贴</a></span>
            </div>
          </div>
          <div class="detail-body photos" v-html="lists.content">
          </div>
        </div>
        <div class="fly-panel detail-box" id="flyReply">
            <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
              <legend>回帖</legend>
            </fieldset>
            <ul class="jieda" id="jieda">
              <li class="jieda-daan" v-for="(item,index) in comments" :key="'comments' + index">
                <div class="detail-about detail-about-reply">
                  <a class="fly-avatar" href="">
                    <img :src="item.cuid ? item.cuid.pic : '/img/touxiang.jpeg'">
                  </a>
                  <div class="fly-detail-cuid">
                    <a href="" class="fly-link">
                      <cite>{{item.cuid ? item.cuid.name : 'admin'}}</cite>
                      <i class="layui-badge fly-badge-vip" v-show="item.cuid.isVip === 1">VIP</i>
                    </a>

                    <span v-if="item.cuid._id === item.tid.uid">(楼主)</span>
                    <!--
                    <span style="color:#5FB878">(管理员)</span>
                    <span style="color:#FF9E3F">（社区之光）</span>
                    <span style="color:#999">（该号已被封）</span>
                    -->
                  </div>

                  <div class="detail-hits">
                    <span>{{item.created | moment}}</span>
                  </div>

                  <i v-show="item.isBest==='1'" class="iconfont icon-caina" title="最佳答案"></i>
                </div>
                <div class="detail-body jieda-body photos" v-html="item.content">
                </div>
                <div class="jieda-reply">
                  <span class="jieda-zan" type="zan">
                    <i class="iconfont icon-zan"></i>
                    <em>{{item.hands}}</em>
                  </span>
                  <span type="reply">
                    <i class="iconfont icon-svgmoban53"></i>
                    回复
                  </span>
                  <div v-if="lists.uid._id === user._id" class="jieda-admin">
                    <span type="del">删除</span>
                    <span @click="setBest(item)" v-if="lists.catalog === '提问' && lists.isEnd !== '1'" class="jieda-accept" type="accept">采纳</span>
                  </div>
                </div>
              </li>

              <!-- 无数据时 -->
              <li class="fly-none" v-if="comments.length === 0">消灭零回复</li>
            </ul>

            <page
              @changeCurrent="handleChange"
              :current="current"
              :total="total"
            ></page>
            <div class="layui-form layui-form-pane">
                <form action="/jie/reply/" method="post">
                    <reply @changecont="changecont" class="re"></reply>
                  <div class="layui-form-item">
                    <input type="hidden" name="jid" value="123">
                    <button class="layui-btn" type="button" @click="submit" lay-submit>提交回复</button>
                  </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Panel from '../Panel'
import Page from '../modules/paging/index'
import { getDetail } from '../../../api/concent'
import { getComents, addComment, setCommentBest } from '../../../api/comments'
import Reply from '../modules/editor/reply'
export default {
  name: 'detail',
  components: {
    Panel,
    Page,
    Reply
  },
  data () {
    return {
      tid: '',
      total: 0,
      current: 0,
      lists: {},
      comments: [],
      content: ''
    }
  },
  mounted () {
    this.tid = this.$route.params.tid
    this.getPostDetail()
    this.getCommentsList()
  },
  methods: {
    async submit () {
      if (!this.$store.state.isLogin) {
        this.$alert('请登录')
      }
      await addComment({
        content: this.content,
        tid: this.tid
      }).then((res) => {
        if (res.code === 200) {
          this.content = ''
          const data = res.data
          data.cuid = this.$store.state.userInfo
          this.total = this.comments.unshift(data)
          this.$alert('评论成功')
        }
      })
    },
    setBest (item) {
      setCommentBest({
        cid: item._id,
        tid: this.tid
      }).then(res => {
        if (res.code === 200) {
          this.$alert('设置成功!')
          item.isBest = '1'
          this.lists.isEnd = '1'
        } else {
          this.$alert(res.msg)
        }
      })
    },
    handleChange (val) {
      this.current = val
      this.getCommentsList()
    },
    changecont (val) {
      this.content = val
    },
    getPostDetail () {
      getDetail(this.tid).then((res) => {
        if (res.code === 200) {
          this.lists = res.data
        }
      })
    },
    getCommentsList () {
      getComents({
        tid: this.tid,
        page: this.current
      }).then((res) => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        }
      })
    }
  },
  computed: {
    user () {
      return this.$store.state.userInfo
    }
  }
}
</script>

<style>
.re {
  padding-bottom: 20px;
}
</style>
