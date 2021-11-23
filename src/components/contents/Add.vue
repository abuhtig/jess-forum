<template>
  <div>
    <div class="layui-container fly-marginTop">
  <div class="fly-panel" pad20 style="padding-top: 5px;">
    <div class="layui-form layui-form-pane">
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li class="layui-this">发帖</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <div class="layui-tab-item layui-show">
            <validation-observer ref="observer" v-slot={validate}>
              <form action="" method="post">
                <div class="layui-row layui-col-space15 layui-form-item">
                  <div class="">
                    <label for="L_title" class="layui-form-label">标题</label>
                    <validation-provider ref="codefield" rules="required" v-slot="{ errors }">
                      <div class="layui-input-block">
                        <input type="text" translate="dddd" name="title" v-model="title" title="标题不可修改" class="layui-input">
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                </div>
                <div class="layui-form-item zindex">
                 <div class="layui-col-md4">
                    <label class="layui-form-label">所在专栏</label>
                    <validation-provider ref="codefield" rules="is_not:请选择" v-slot="{ errors }">
                      <div class="layui-input-block" @click="isfa">
                        <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect}">
                          <div class="layui-select-title">
                            <input type="text" class="layui-input layui-unselect" v-model="catalogs[cataIndex].text">
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd v-for="(item, index) in catalogs"
                            :key="'catalogs' + index"
                            :class="{'layui-this': index === cataIndex}"
                            @click="chooseCatalog(item, index)"
                            >
                              {{item.text}}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-col-md4" v-if="cataIndex === 1">
                    <label class="layui-form-label">悬赏飞吻</label>
                    <div class="layui-input-block" @click="isSe">
                      <div class="layui-unselect layui-form-select" :class="{'layui-form-selected': isSelect_fav}">
                        <div class="layui-select-title">
                          <input type="text" class="layui-input layui-unselect" v-model="favList[favIndex]">
                          <i class="layui-edge"></i>
                        </div>
                        <dl class="layui-anim layui-anim-upbit">
                          <dd v-for="(item, index) in favList"
                          :key="'favList' + index"
                          :class="{'layui-this': index === favIndex}"
                          @click="choosefav(item, index)"
                          >
                            {{item}}
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                <editor @change="add"></editor>
                <div class="layui-form-item">
                  <div class="layui-row">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <validation-provider ref="codefield" rules="required|length:4" v-slot="{ errors }">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="code"
                          v-model="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div>
                        <span class="svg" style="color: #c00" @click="_getCode()" v-html="svg">
                        </span>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                </div>
                <div class="layui-form-item">
                  <button class="layui-btn" type="button" @click="validate().then(submit)" lay-submit>立即发布</button>
                </div>
              </form>
            </validation-observer>
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
import CodeMix from '../../mixin/code'
import { addPost } from '../../../api/concent'
export default {
  name: 'add',
  mounted () {
  },
  mixins: [CodeMix],
  components: {
    Editor
  },
  data () {
    return {
      isSelect: false,
      isSelect_fav: false,
      cataIndex: 0,
      favIndex: 0,
      catalogs: [
        {
          text: '请选择',
          value: ''
        },
        {
          text: '提问',
          value: 'ask'
        },
        {
          text: '分享',
          value: 'share'
        },
        {
          text: '专栏',
          value: 'special '
        },
        {
          text: '建议',
          value: 'advise'
        }
      ],
      favList: [20, 30, 40, 60, 80],
      content: '',
      title: ''
    }
  },
  methods: {
    chooseCatalog (item, index) {
      this.cataIndex = index
    },
    choosefav (item, index) {
      this.favIndex = index
    },
    isSe () {
      this.isSelect_fav = !this.isSelect_fav
    },
    isfa () {
      this.isSelect = !this.isSelect
    },
    add (val) {
      this.content = val
    },
    async submit () {
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        return
      }
      if (this.content === '') {
        this.$alert('正文不能为空!')
      }
      addPost({
        title: this.title,
        content: this.content,
        catalog: this.catalogs[this.cataIndex].value,
        fav: this.cataIndex === 1 ? this.favList[this.favIndex] : 0,
        code: this.code,
        sid: this.$store.state.sid
      }).then((res) => {
        if (res.code === 200) {
          this.title = ''
          this.content = ''
          this.code = ''
          this.$alert('发帖成功!')
        } else {
          this.$alert(res.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.svg {
  position: relative;
  top: -5px;
}

.zindex {
  position: relative;
  z-index: 11000;
}
</style>
