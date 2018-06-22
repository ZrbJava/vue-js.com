<template>
  <div class="headTab">
    <van-tabs v-on:click="changeTab">
      <van-tab v-for="tab in _tabs" v-bind:key="tab" v-bind:title="tab">

      </van-tab>
    </van-tabs>
  </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'

  import Vue from 'vue'
  import {
    Tab,
    Tabs
  } from 'vant'

  Vue.use(Tab).use(Tabs)

  export default {
    data() {
      return {}
    },
    created() {

    },
    mounted() {
      this.changeTab(0, '全部')
    },
    computed: {
      ...mapState([
        'menuActive', '_tabs'
      ]),
    },
    methods: {
      ...mapMutations([
        'SET_MENU_ACTIVE'
      ]),
      changeTab(index, title) {
        for (let key in this._tabs) {
          if (this._tabs[key] == title) {
            this.SET_MENU_ACTIVE(key)
            return
          }
        }
      }
    },
  }

</script>

<style>


</style>
