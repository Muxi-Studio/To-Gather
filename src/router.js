import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import actionDetail from './views/Detail.vue'
import New from './views/New.vue'
import Reply from './views/Message.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/landing',
      name: 'landing',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Landing.vue')
    },
    {
      path: '/detail/:aid',
      name: 'actionDetail',
      component: actionDetail,
    },
    {
      path: '/new',
      name: 'newActivity',
      component: New,
    },
    {
      path: '/message/:aid',
      name: 'messageReply',
      component: Reply,
    }
  ]
})
