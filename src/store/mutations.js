import * as types from './mutation-types'
import * as local from '../common/helper/localStoreHelper'

export default {
  [types.SET_MENU_ACTIVE](state, menu) {
    state.menuActive = menu
  },
  [types.SET_USER](state, res) {
    local.setLocalStore('user', res)
  },
  [types.LOGOUT](state) {
    local.removeLocalStore('user')
    return true
  },
  [types.SET_ARTICLES](state, res) {
    state.articlePageParam = res
  },
  [types.SET_ARTICLE](state, res) {
    state.article = res
  },
  [types.SET_MESSAGES](state, res) {
    state.messages = res
  },
}
