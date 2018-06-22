import {
  getLocalStore
} from '../common/helper/localStoreHelper'

import fetchHelper from '../common/helper/fetchHelper'

const prefix = "/api/v1/"

export default {
  getArticles(pageParam) {
    let url = prefix + '/topics'
    return fetchHelper(url, pageParam, 'GET')
  },
  getArticle(id) {
    let url = prefix + '/topic/' + id
    return fetchHelper(url, null, 'GET')
  },
  ups(accessToken, replyId) {
    let url = prefix + '/reply/' + replyId + '/ups'
    return fetchHelper(url, {
      accesstoken: accessToken
    }, 'POST')
  },
  login(accessToken) {
    let url = prefix + '/accesstoken'
    return fetchHelper(url, {
      accesstoken: accessToken
    }, 'POST')
  },
  comment(accessToken, articleId, replyId, content) {
    let url = prefix + '/topic/' + articleId + '/replies'
    return fetchHelper(url, {
      accesstoken: accessToken,
      reply_id: replyId,
      content: content,
    }, 'POST')
  },
  getMessages(accessToken) {
    let url = prefix + '/messages'
    return fetchHelper(url, {
      accesstoken: accessToken
    }, 'GET')
  },
  markAllMessage(accessToken) {
    let url = prefix + '/message/mark_all'
    return fetchHelper(url, {
      accesstoken: accessToken
    }, 'POST')
  },
  createArticle(accessToken, tab, title, content) {
    let url = prefix + '/topics'
    return fetchHelper(url, {
      accesstoken: accessToken,
      tab: tab,
      title: title,
      content: content
    }, 'POST')
  },
}
