<template>
  <div>
    <head-nav></head-nav>
    <div class="block article">
      <div class="article-item article-tab">
        <select v-model="tab">
          <option v-bind:value="key" v-for="(item,key) in _tabs" v-bind:key="key">{{item}}</option>
        </select>
      </div>
      <div class="article-item article-title">
        <input v-model="title" placeholder="请输入标题" />
      </div>
      <div class="article-item article-content">
        <textarea rows="8" v-model="content" placeholder="请输入内容"></textarea>
      </div>
      <div class="article-item article-button">
        <van-button type="primary" size="small" v-on:click="submit($event)">提交</van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'
  import Vue from 'vue'
  import headNav from '../components/layout/headNav'
  import {
    getLocalStore
  } from '../common/helper/localStoreHelper'
  import {
    List,
    Cell,
    Tag,
    Icon,
    Button,
    Toast,
  } from 'vant'

  Vue.use(List).use(Cell).use(Tag).use(Icon).use(Button).use(Toast)

  import '../../static/css/markdown.css'

  export default {
    components: {
      headNav,
    },
    data() {
      return {
        user: {},
        tab: 'all',
        title: '',
        content: '',
      }
    },
    mounted() {
      this.user = JSON.parse(getLocalStore('user'))
    },
    watch: {},
    computed: {
      ...mapState([
        '_tabs'
      ]),
    },
    methods: {
      ...mapActions([
        'createArticle'
      ]),
      submit(event) {
        if (!this.user||!this.user.accesstoken) {
            Toast('请先登录再操作')
            return
        }

        this.createArticle({
          accessToken: this.user.accesstoken,
          tab: this.tab,
          title: this.title,
          content: this.content
        }).then(res => {
          if (!res.success) return

          this.$router.push({
            path: '/detail',
            query: {
              id: res.topic_id
            }
          })

        })

      }
    },
  }

</script>

<style>
  .block {
    background-color: #fff;
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
  }

  .article-item select,
  .article-item input,
  .article-item textarea {
    display: inline-block;
    width: 100%;
    padding: 5px 0;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 10px;
  }

</style>
