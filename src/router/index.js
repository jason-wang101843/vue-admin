import { createRouter, createWebHashHistory } from 'vue-router'
// 首页不需要懒加载
import Index from '../layout/index.vue'

// 配置路由 
/* 
一级路由 '/'  '/login'  '/notFound'
二级路由  
 */
const routes = [
  {
    path: '/',
    name: 'LayOut',
    redirect: '/dashBoard',
    component: Index,
    children: [
      {
        path: '/dashBoard',
        name: 'dashBoard',
        meta: {
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
          nav: [
            {
              title: '首页',
              path: '/dashBoard' 
            },
            {
              title: '商品分类',
              path:'/productCate'
            },{
              title: '添加商品',
            }
          ]
        },
        component: () => import('../views/ProductAdd/index.vue')
      },
      {
        path: '/productOrder',
        name: 'productOrder',
        meta: {
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
      }
    ]
  },
  {
    path: '/login',
    name: "login",
    component: () => import('../views/LoginPage/index.vue')
  },
  {
    path: '/:pathMath(.*)',
    component: () => import('../views/NotFound/index.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
