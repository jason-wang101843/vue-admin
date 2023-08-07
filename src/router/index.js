import { createRouter, createWebHashHistory } from 'vue-router'
// 首页不需要懒加载
import index from '../layout/index.vue'

// 配置路由 
/* 
一级路由 '/'  '/login'  '/notFound'
二级路由  
 */
const routes = [
  {
    path: '/',
    name: 'LayOut',
    component: index,
    children:[{
      path:'/',
      redirect:'/dashBoard'
    },
      {
      path:'/dashBoard',
      name:'dashBoard',
      component:()=>import('../views/DashBoard/index.vue')
    },
    {
      path:"/itemAdd",
      name:"itemAdd",
      component:()=>import('../views/ItemAdd/index.vue')
    },
    {
      path:"/itemList",
      name:"itemList",
      component:()=>import('../views/ItemList/index.vue')
    },
    {
      path:"/setting",
      name:"setting",
      component:()=>import('../views/Setting/index.vue')
    },
    {
      path:"/userInfo",
      name:"userInfo",
      component:()=>import('../views/UserInfo/index.vue')
    },

  ]
  },
  {
    path:'/login',
    name:"login",
    component:()=>import('../views/LoginPage/index.vue')
  },
  {
    path:'/:pathMath(.*)',
    component:()=>import('../views/NotFound/index.vue')
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
