import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Search from 'views/Search'

//路由设计思路

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['views/Home'], resolve),
    },
    {
      path: '/aoei',
      name: "aoei",
      component: resolve => require(['views/AoeiSwiper'], resolve)
    },
    {
      path: "/user",
      name: "user",
      component: resolve => require(['views/User'], resolve)
    },
    {
      path: '/movieLists',
      name: 'movieLists',
      component: resolve => require(['views/MovieLists'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/bookLists",
      name: "bookLists",
      component: resolve => require(['views/BookLists'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/more',
      name: 'more',
      component: resolve => require(['views/More'], resolve),
    },
    {
      path: '/itemInfo/:id',
      name: 'itemInfo',
      component: resolve => require(['components/ItemInfo'], resolve),
    },

    {
      path: '/bookInfo/:id',
      name: 'bookInfo',
      component: resolve => require(['views/BookInfo'], resolve),
    },
    {
      path: '/movieInfo/:id',
      name: 'movieInfo',
      component: resolve => require(['views/MovieInfo'], resolve)
    },
    {
      path: '/search',
      name: "search",
      component: Search
    },
    {
      path: '*',
      redirect: '/home'
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    //savedPosition 只有在点击浏览器前进/后退按钮的时候或者是使用this.$router.go()时才有值返回
    console.log(savedPosition, "savedPosition");
    return {x: 0, y: 0}
  }
})
