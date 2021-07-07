<template>
  <div>
    <div class="layui-container fly-marginTop">
  <div class="fly-panel" pad20 style="padding-top: 5px;">
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">编辑</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
              <form action="" method="post">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="">
                    <label class="layui-form-label">标题</label>
                      <div class="layui-input-block">
                        <input type="text" :value="post ? post.title : ''"  name="title" class="layui-input">
                      </div>
                  </div>
                </div>
                <div class="layui-form-item zindex">
                 <div class="layui-col-md4">
                    <label class="layui-form-label">所在专栏</label>
                      <div class="layui-input-block">
                          <div class="layui-select-title">
                            <input type="text" class="layui-input" disabled :value="post ? post.catalog : ''">
                          </div>
                      </div>
                  </div>
                  <div class="layui-col-md4" v-if="post.catalog === '提问'">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-block">
                        <div class="layui-select-title">
                          <input type="text" class="layui-input" disabled :value="post ? post.fav : ''">
                        </div>
                    </div>
                  </div>
                </div>
                <editor :content="content" @change="add"></editor>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="submit" lay-submit>立即发布</button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import Editor from '../modules/editor'
import { editPost } from '../../../api/concent'
export default {
  name: 'edit',
  components: {
    Editor
  },
  data () {
    return {
      catalogs: '',
      content: '',
      tid: '',
      post: ''
    }
  },
  methods: {
    add (val) {
      this.content = val
    },
    async submit () {
      if (this.content === '') {
        this.$alert('正文不能为空!')
      }
      editPost({
        tid: this.tid,
        content: this.content,
        title: this.post.title
      }).then((res) => {
        if (res === 200) {
          localStorage.setItem('editData', '')
          console.log('object')
          this.$router.push({ path: `/detail/${this.tid}` })
          this.$alert('修改成功!')
        } else {
          this.$alert(res.msg)
        }
      })
    }
  },
  mounted () {
    this.tid = this.$route.params.tid
    this.post = this.$route.params.post
    if (this.post) {
      this.content = this.post.content
      localStorage.setItem('editData', JSON.stringify(this.post))
    } else {
      const saveData = localStorage.getItem('editData')
      if (saveData && saveData !== '') {
        this.$confirm('是否加载未编辑完的内容?', () => {
          const obj = JSON.parse(saveData)
          this.post = obj
          this.tid = this.post._id
          this.content = this.post.content
        }, () => {
          localStorage.setItem('editData', '')
          this.$router.push({ path: `/detail/${this.tid}` })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -5px;
}
</style>
