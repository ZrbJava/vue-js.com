import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home')), 'home')
const detail = r => require.ensure([], () => r(require('../page/detail')), 'detail')
const login = r => require.ensure([], () => r(require('../page/login')), 'login')
const message = r => require.ensure([], () => r(require('../page/message')), 'message')
const article = r => require.ensure([], () => r(require('../page/article')), 'article')

const routes = [{
  path: '/',
  component: App,
  children: [{
    path: '/',
    redirect: '/home',
  }, {
    path: '/home',
    component: home
  }, {
    name: 'detail',
    path: '/detail',
    component: detail
  }, {
    name: 'login',
    path: '/login',
    component: login
  }, {
    name: 'message',
    path: '/message',
    component: message
  }, {
    name: 'article',
    path: '/article',
    component: article
  }]
}]

export default routes
