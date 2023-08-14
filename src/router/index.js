import { createRouter, createWebHashHistory } from 'vue-router'

import {loginStatus} from '@u/user.js'
import Index from '@/layout/index.vue'

// 配置路由 
/* 
一级路由 '/'  '/login'  '/notFound'
二级路由  
 */
const routes = [
  {
      path: '/',
      name: 'LayOut',
      meta: ['*'],
      redirect: '/dashBoard',
      component: Index,
      children: [
          {
              path: '/dashBoard',
              name: 'dashBoard',
              meta: {
                  name:'仪表盘',
                  avatar:'Grid',
                  roles: ['超管', '普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      }
                  ]
              },
              component: () => import('../views/DashBoard/index.vue')
          },
          {
              path: '/productCate',
              name: 'productCate',
              meta: {
                  avatar:'Grid',
                  roles: ['超管', '普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      },
                      {
                          title: '商品分类',
                      }
                  ]
              },
              component: () => import('../views/ProductCate/index.vue')
          },
          {
              path: '/productAdd',
              name: 'productAdd',
              meta: {
                  roles: ['超管', '普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      },
                      {
                          title: '商品分类',
                          path: '/productCate'
                      }, {
                          title: '添加商品',
                      }
                  ]
              },
              component: () => import('../views/ProductAdd/index.vue')
          },
          {
              path: '/productList',
              name: 'productList',
              meta: {
                  roles: ['超管', '普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      }, {
                          title: '商品列表'
                      }
                  ]
              },
              component: () => import('@/views/ProductList/index.vue')
          },
          {
              path: '/productOrder',
              name: 'productOrder',
              meta: {
                  avatar:'ShoppingTrolley',
                  roles: ['普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      },
                      {
                          title: '商品订单',
                      }
                  ]
              },
              component: () => import('../views/ProductOrder/index.vue')
          },
          {
              path: '/productUpdate',
              name: 'productUpdate',
              meta: {
                  roles: ['超管', '普通用户'],
                  nav: [
                      {
                          title: '首页',
                          path: '/dashBoard'
                      }, {
                          title: '商品列表',
                          path: '/productList'
                      }, {
                          title: '修改商品',
                      }
                  ]
              },
              component: () => import('../views/ProductUpdate/index.vue')
          }
      ]
  },
  {
      path: '/login',
      name: "login",
      meta: {
          roles: ['*']
      },
      component: () => import('../views/LoginPage/index.vue')
  },
  {
      path: '/:pathMath(.*)',
      meta: {
          roles: ['*']
      },
      component: () => import('../views/NotFound/index.vue')
  },
  {
      path: '/forbidPage',
      meta: {
          roles: ['*']
      },
      component: () => import('../views/ForbidPage/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) =>{
    if(to.path!='/login'){
      if(loginStatus()){
            //判断用户是否有权限登陆
            if(to.meta.roles.includes(localStorage.getItem('role')) || to.meta.roles.includes('*')){
              next()
            }else{
              next('/forbidPage')
            }
      }else{
        next('/login')
      }
    }else{
      next()
    }
})
export default router 
