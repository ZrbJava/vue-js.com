import service from '../service'
import * as types from './mutation-types'
import {
  access
} from 'fs';

export default {
  async getArticles({
    commit,
    state
  }, pageParam) {
    pageParam.finished = false
    commit(types.SET_ARTICLES, pageParam)

    let _param = {
      tab: pageParam.tab || 'all',
      page: pageParam.page || 0,
      limit: pageParam.limit || 30,
      mdrender: pageParam.mdrender || true,
    }

    let res = await service.getArticles(_param)

    pageParam.finished = (!res.data || res.data.length <= 0)
    pageParam.list = pageParam.list.concat(res.data)
    pageParam.loading = false

    commit(types.SET_ARTICLES, pageParam)
  },

  async getArticle({
    commit,
    state
  }, id) {
    let res = await service.getArticle(id)
    commit(types.SET_ARTICLE, res.data)
    return res
  },

  async ups({
    commit,
    state,
    dispatch
  }, {
    accessToken,
    articleId,
    replyId,
  }) {
    let res = await service.ups(accessToken, replyId)
    dispatch('getArticle', articleId)
    return res
  },

  async login({
    commit,
    state,
  }, accessToken) {
    let res = await service.login(accessToken)
    res.accesstoken = accessToken
    commit(types.SET_USER, res)
    return res
  },

  async comment({
    commit,
    state,
    dispatch,
  }, {
    accessToken,
    articleId,
    replyId,
    content,
  }) {
    let res = await service.comment(accessToken, articleId, replyId, content)
    return res
  },

  async getMessages({
    commit,
    state,
  }, accessToken) {
    let res = await service.getMessages(accessToken)
    commit(types.SET_MESSAGES, res.data)
    return res
  },

  async markAllMessage({
    commit,
    state,
  }, accessToken) {

    let res = await service.markAllMessage(accessToken)
    return res
  },

  async createArticle({
    commit,
    state,
  }, {
    accessToken,
    tab,
    title,
    content
  }) {
    let res = await service.createArticle(accessToken, tab, title, content)
    return res
  },

}
