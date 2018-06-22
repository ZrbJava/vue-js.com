<template>
  <div>
    <head-nav></head-nav>
    <div class="block article">
      <h3>{{article.title}}</h3>
      <small>By {{article.author?article.author.loginname:''}} {{article.reply_count}}次回复 / {{article.visit_count}}次浏览 </small>
      <div class="van-hairline--bottom"></div>
      <div class="article-content" v-html="article.content"></div>

    </div>
    <div class="block reply">
      <small>{{article.reply_count}} 回复</small>
      <div class="van-hairline--bottom"></div>
      <div class="reply-item" v-for="rep in article.replies" v-bind:key="rep.id">
        <div class="reply-item-header clear">
          <div class="reply-item-author">
            <img v-bind:src="rep.author.avatar_url"> {{rep.author.loginname}}
          </div>
          <div class="reply-item-operation">
            <van-icon name="chat" v-on:click="openReply($event, rep)" />
            <van-icon name="like-o" v-on:click="upReply($event, rep)" />
            <small>{{rep.ups.length}}</small>
          </div>
        </div>
        <div class="reply-item-content" v-html="rep.content"></div>
        <small class="reply-item-time">{{rep.create_at}}</small>
        <div class="van-hairline--bottom"></div>
      </div>
    </div>
    <div class="block canReply">
      <div class="canReply-mine van-hairline--bottom" v-if="user&&user.loginname">
        <img v-bind:src="user.avatar_url"> {{user.loginname}}
      </div>
      {{replyId}}
      <div class="canReply-comment">
        <textarea rows="5" id="txtComment" v-model="commentContent"></textarea>
      </div>
      <div class="canReply-button">
        <van-button type="primary" size="small" v-on:click="submit($event)">回复</van-button>
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
        replyId: '',
        commentContent: '',
      }
    },
    mounted() {
      let query = this.$route.query
      this.getArticle(query.id)

      this.user = JSON.parse(getLocalStore('user'))
    },
    watch: {
      commentContent(newVal, oldVal) {
        if (!this.replyId || !newVal) return

        let _replyId = '@' + this.replyId + ' '
        if (newVal.indexOf(_replyId) == -1) {
          this.replyId = ''
        }
      }
    },
    computed: {
      ...mapState([
        'article',
      ]),
    },
    methods: {
      ...mapActions([
        'getArticle', 'ups', 'comment'
      ]),
      upReply(event, rep) {

        if (!this.user || !this.user.accesstoken) {
          Toast('请先登录再操作')
          return
        }

        this.ups({
          accessToken: this.user.accesstoken,
          articleId: this.article.id,
          replyId: rep.id
        })
      },
      openReply(event, rep) {
        var replyUser = rep.author.loginname
        this.commentContent = "@" + replyUser + ' '
        document.getElementById('txtComment').focus()
      },
      submit(event) {

        if (!this.user || !this.user.accesstoken) {
          Toast('请先登录再操作')
          return
        }

        this.comment({
          accessToken: this.user.accesstoken,
          articleId: this.article.id,
          replyId: this.replyId,
          content: this.commentContent
        }).then(res => {
          if (res.success) {
            this.replyId = ''
            this.commentContent = ''
          }
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

  .article {
    margin-bottom: 10px;
  }

  .article-content small {
    color: gray
  }

  .reply {
    margin-bottom: 10px;
  }

  .reply-item {
    margin: 8px;
  }

  .reply-item-author {
    display: inline-block;
    width: 50%;
    float: left;
    color: gray;
  }

  .reply-item-operation {
    display: inline-block;
    width: 50%;
    float: left;
    text-align: right;
    font-size: 16px;
    line-height: 20px;
  }

  .reply-item img {
    width: 25px;
    height: 25px;
  }

  .reply-item-content p {
    margin: 0;
    padding: 0;
  }

  .reply-item-time {
    color: #ccc
  }

  .canReply img {
    width: 20px;
    height: 20px;
  }

  .canReply-mine {
    color: #333;
    margin-bottom: 10px;
  }

  .canReply textarea {
    display: block;
    width: 100%;
    /* padding: 5px; */
    border: 1px solid #ccc;
    border-radius: 3px;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .canReply-button {
    text-align: center;
  }

</style>
