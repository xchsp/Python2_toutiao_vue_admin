import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import EditPost from '@/pages/EditPost'
import Login from '@/pages/Login'
import PostList from '@/pages/PostList'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:'首页',
      children:[
            {
              path: 'postlist',
              name: 'postListPage',
              component: PostList,
              meta:'文章列表',
            },
            {
              path: 'editpost',
              name: 'editPostPage',
              component: EditPost,
              meta:'发布文章',
            }
      ]
    },
     {
      path: '/login',
      name: 'loginPage',
      component: Login
    }
  ]
})

export default router
