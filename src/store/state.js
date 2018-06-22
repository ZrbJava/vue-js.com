const state = {
  _tabs: {
    'all': '全部',
    'good': '精华',
    'weex': 'weex',
    'share': '分享',
    'ask': '问答',
    'job': '招聘',
  },
  menuActive: '',

  articlePageParam: {
    tab: 'all',
    page: 0,
    limit: 30,
    mdrender: true,
    list: [],
    loading: false,
    finished: false,
  },
  article: {},
  messages: {},

}

export default state
