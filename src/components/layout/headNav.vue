<template>
  <div class="header">
    <div class="header-content">
      <div class="header-logo" v-on:click="gotoPath($event,'/home')">
        <span>vue.js</span>
      </div>
      <div class="header-operation">
        <van-icon name="contact" v-on:click="gotoPath($event,'/login')" />
        <van-icon name="chat" v-bind:info="notReadMessageCount" v-on:click="gotoPath($event,'/message')" />
        <van-icon name="edit" v-on:click="gotoPath($event,'/article')" />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Icon
  } from 'vant'
  Vue.use(Icon)

  import {
    mapState,
    mapMutations,
    mapActions
  } from 'vuex'
  import {
    getLocalStore
  } from '../../common/helper/localStoreHelper'

  export default {
    data() {
      return {
        user: {},
      }
    },
    mounted() {
      this.user = JSON.parse(getLocalStore('user'))
      if (this.user && this.user.loginname) {
        if (this.user && this.user.accesstoken) {
          this.getMessages(this.user.accesstoken)
        }
      }
    },
    computed: {
      ...mapState([
        'messages'
      ]),
      notReadMessageCount() {
        if (!this.messages || !this.messages.hasnot_read_messages) return ''

        let count = this.messages.hasnot_read_messages.length
        if (count <= 0) return ''
        else if (count >= 99) return '99'

        return count
      },
    },
    methods: {
      ...mapActions([
        'getMessages'
      ]),
      gotoPath(event, path) {
        this.$router.push(path)
      }
    },
  }

</script>

<style>
  .header {
    background-color: #fff;
    height: 44px;
    font-size: 15px;
    font-weight: 500;
    background-size: 44px 44px;
    padding: 0 10px;
    margin-bottom: 10px;
  }

  .header-logo {
    width: 50%;
    height: 44px;
    background-image: url(https://www.vue-js.com/public/images/vue.png);
    background-size: 40px 40px;
    background-repeat: no-repeat;
    display: inline-block;
    line-height: 40px;
    float: left;
  }

  .header-logo span {
    margin-left: 50px;
  }

  .header-operation {
    width: 50%;
    display: inline-block;
    float: left;
    line-height: 40px;
    font-size: 22px;
    padding: 5px 0 0 0;
    text-align: right;
  }

  .header-operation i {
    margin-left: 16px;
  }

</style>
