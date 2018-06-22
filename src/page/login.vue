<template>
  <div>
    <head-nav></head-nav>
    <div v-if="!user||!user.loginname">
      <van-cell-group>
        <van-field v-model="accessToken" icon="clear" placeholder="请输入accesstoken" @click-icon="accessToken=''" />
      </van-cell-group>
      <div class="block login-button">
        <van-button type="primary" size="small" v-on:click="_login($event)">登录</van-button>
      </div>
    </div>
    <div v-else>
      <van-cell-group>
        <van-cell title="用户名" v-bind:value="user.loginname" />
        <van-cell title="accesstoken" v-bind:value="user.accesstoken" />
      </van-cell-group>
      <div class="block login-button">
        <van-button type="default" size="small" v-on:click="_logout($event)">退出</van-button>
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
    Field,
    CellGroup,
    Button,
    Cell,
  } from 'vant'

  Vue.use(Field).use(CellGroup).use(Button).use(Cell)

  export default {
    components: {
      headNav,
    },
    data() {
      return {
        user: {},
        accessToken: '',
      }
    },
    mounted() {
      this.user = JSON.parse(getLocalStore('user'))
    },
    watch: {},
    computed: {},
    methods: {
      ...mapActions([
        'login'
      ]),
      ...mapMutations([
        'LOGOUT'
      ]),
      _login(event) {
        let _this = this
        let promise = this.login(this.accessToken)
        promise.then(res => {
          _this.user = JSON.parse(getLocalStore('user'))
        })
      },
      _logout(event) {
        let res = this.LOGOUT()
        this.user = JSON.parse(getLocalStore('user'))
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

  .login-button {
    text-align: center;
  }

</style>
