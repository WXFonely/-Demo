import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import List from './views/List.vue'
import Detail from './views/Detail.vue'
import Login from './views/Login.vue'
import Reg from './views/Reg.vue'
import UserCenter from './views/UserCenter.vue'
import Orders from './views/Orders.vue'
import ShopCart from './views/ShopCart.vue'
import { isLogined } from './utils/auth'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/list',
      name:'List',
      component: List,
    }, {
      path: '/list/:id',
      name: 'Detail',
      component: Detail,
    }, {
      path: '/reg',
      name: 'Reg',
      component: Reg,
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
    }, {
      path: '/user_center',
      name: 'UserCenter',
      component: UserCenter,
      meta: { // 元标签
        needLogin: true, // 需要登录
      }
    }, {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: { // 元标签
        needLogin: true, // 需要登录
      }
    }, {
      path: '/shop_cart',
      name: 'ShopCart',
      component: ShopCart,
      meta: { // 元标签
        needLogin: true, // 需要登录
      }
    }, 
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

// beforeEach是路由的钩子函数 在每一个路由跳转之前执行
//  to    跳转到的页面
//  from  从哪里来
//  next  下一个,继续执行
router.beforeEach(function(to, from, next) {
  console.group('路由跳转之前')
  console.log('执行了')
  console.log(to)
  console.log(from)
  console.log(next)
  console.groupEnd()
  // 在next方法中传递一个路由对象当做参数执行跳转
  if (to.meta.needLogin) {
    if (isLogined()) { // 判断是否已经登录
      next()
    } else {
      next({
        name: 'Login'
      });
    } 
  } else {
    next();
  }
})

// afterEach在跳转之后执行
router.afterEach(function(to, from) {
  console.log('路由跳转之后执行')
})

// 在beforeEach之后 afterEach之前
router.beforeResolve(function(to, from ,next) {
  console.group('-------------')
  console.log('路由执行了')
  console.log(to)
  console.log(from)
  next()
  console.groupEnd()
})

export default router;
