import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/login',
    component: () => import('../views/login/index'),
    meta: {
      keepAlive: true
    },
    children:[{
      path:'/login',
      component: () => import('../views/login/index'),
    }]
  },
  {
    path: '/home',
    component:layout,
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('../views/home/index'),
      meta: {
        title: '首页'
      }
    }]
  },
]

const router = new VueRouter({
  routes
})

export default router
