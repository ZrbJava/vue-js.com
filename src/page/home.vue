<template>
  <div>
    <head-nav></head-nav>
    <head-tab></head-tab>
    <van-list v-model="articlePageParam.loading" :finished="articlePageParam.finished" @load="onLoad">
      <div class="list-item van-hairline--bottom" v-for="art in articleList" v-bind:key="art.id" v-on:click="gotoDetail($event, art.id)">
        <div class="list-item-author">
          <img v-bind:src="art.author.avatar_url" /> {{art.author.loginname}}
        </div>
        <div class="list-item-title van-ellipsis">
          <van-tag v-if="art.tab">{{art.tab}}</van-tag> {{art.title}}
        </div>
        <div class="list-item-hot">
          {{art.reply_count}}/{{art.visit_count}}
        </div>
      </div>
    </van-list>
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
  import headTab from '../components/layout/headTab'
  import {
    List,
    Cell,
    Tag,
  } from 'vant'

  Vue.use(List).use(Cell).use(Tag)
  export default {
    components: {
      headNav,
      headTab,
    },
    data() {
      return {
        immediateCheck: false,
      }
    },
    mounted() {},
    watch: {
      menuActive(newVal, oldVal) {
        let pageParam = this.articlePageParam
        pageParam.tab = newVal
        pageParam.page = 0
        pageParam.list = []

        this.SET_ARTICLES(pageParam)
        this.onLoad()
      }
    },
    computed: {
      ...mapState([
        'menuActive', 'articlePageParam', '_tabs'
      ]),
      articleList: {
        get() {
          var _this = this
          this.articlePageParam.list.forEach(item => {
            let tab = item.top ? "置顶" :
              item.good ? _this._tabs['good'] : _this._tabs[item.tab]
            item.tab = tab
          })
          return this.articlePageParam.list
        }
      },
      articleLoading: {
        get() {
          return this.articlePageParam.loading
        },
        set(val) {
          this.articlePageParam.loading = val
          this.SET_ARTICLES(this.articlePageParam)
        },
      }
    },
    methods: {
      ...mapActions([
        'getArticles', 'getArticle'
      ]),
      ...mapMutations([
        'SET_ARTICLES', 'SET_ARTICLE'
      ]),
      onLoad() {
        let pageParam = this.articlePageParam
        pageParam.tab = this.menuActive
        pageParam.page = pageParam.page + 1
        pageParam.limit = 30

        this.getArticles(pageParam)
      },
      gotoDetail(event, id) {
        this.SET_ARTICLE({})
        this.$router.push({
          name: 'detail',
          query: {
            id: id
          }
        })
      },
    },
  }

</script>

<style>
  .list-item {
    background-color: #fff;
    padding: 10px 15px;
    font-size: 14px;
    color: #333;
  }

  .list-item-author img {
    width: 20px;
    height: 20px;
  }

  .list-item-title {
    padding-left: 25px
  }

  .list-item-hot {
    text-align: right;
    font-size: 12px;
    color: #ccc;
  }

</style>
