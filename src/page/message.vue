<template>
  <div>
    <head-nav></head-nav>
    <div class="message">
      <span>未读消息</span>
      <ul>
        <li class="van-hairline--bottom" v-if="!noReadMessages||noReadMessages.length<=0">无消息</li>
        <li class="van-hairline--bottom" v-for="message in noReadMessages" v-on:click="gotoPath('/detail', message)">
          {{message.author.loginname+'在 '+message.topic.title+' 中'+message.type+'了你'}}
        </li>
      </ul>
    </div>
    <div class="message">
      <span>已读消息</span>
      <ul>
        <li class="van-hairline--bottom" v-if="!readMessages||readMessages.length<=0">无消息</li>
        <li class="van-hairline--bottom" v-for="message in readMessages" v-on:click="gotoPath('/detail', message)">
          {{message.author.loginname+'在 '+message.topic.title+' 中'+message.type+'了你'}}
        </li>
      </ul>
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
    CellGroup,
    Button,
    Cell,
    Toast,
  } from 'vant'

  Vue.use(CellGroup).use(Button).use(Cell).use(Toast)

  export default {
    components: {
      headNav,
    },
    data() {
      return {
        user: {},
      }
    },
    mounted() {
      let _this = this
      this.user = JSON.parse(getLocalStore('user'))

      if (!this.user || !this.user.accesstoken) {
        Toast('请先登录再操作')
        return
      }

      this.markAllMessage(_this.user.accesstoken).then(res => {
        _this.getMessages(_this.user.accesstoken)
      })
    },
    watch: {},
    computed: {
      ...mapState([
        'messages'
      ]),
      readMessages() {
        return this.messages.has_read_messages
      },
      noReadMessages() {
        return this.messages.hasnot_read_messages
      },
    },
    methods: {
      ...mapActions([
        'markAllMessage', 'getMessages'
      ]),
      ...mapMutations([

      ]),
      gotoPath(path, message) {
        this.$router.push({
          path: path,
          query: {
            id: message.topic.id
          }
        })
      }
    },
  }

</script>

<style>
  .message {
    background-color: #fff;
    padding: 10px;
    font-size: 14px;
    color: #333;
  }

  .message span {
    font-weight: 600;
  }

  .message li {
    padding: 8px 6px;
    color: #555;
  }

</style>
