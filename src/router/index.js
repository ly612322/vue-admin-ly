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
    children: [{
      path: '/login',
      component: () => import('../views/login/index'),
    }]
  },
  {
    path: '/layout',
    component: layout,
    redirect: '/home',
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/home/index'),
      meta: {
        title: "首页"
      }
    }]
  },
  {
    path: '/newitem',
    component: layout,
    redirect: '/product',
    meta: {
      title: "新建"
    },
    children: [{
        path: '/product',
        component: () => import('../views/newitem/newproduct'),
        meta: {
          title: "制品"
        }
      },
      {
        path: '/equipment',
        component: () => import('../views/newitem/newequipment'),
        meta: {
          title: "设备"
        }
      },
      {
        path: '/link',
        component: () => import('../views/newitem/link'),
        meta: {
          title: "关联"
        }
      }

    ]
  },
  {
    path: '/confirm',
    component: layout,
    redirect: '/confirm',
    meta: {
      title: "确认"
    },
    children: [
      {
        path: '/confirm',
        component: () => import('../views/confirm/confirm')
      }

    ]
  },
  {
    path: '/query',
    component: layout,
    redirect: '/query',
    meta: {
      title: "查询"
    },
    children: [
      {
        path: '/query',
        component: () => import('../views/query/query')
      }

    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
