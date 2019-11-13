import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
  path: '',
  name: 'login',
  redirect: '/login',
  component: () => import('../views/login/index'),
  meta: {
    keepAlive: true
  },
  children: [{
    path: '/login',
    component: () => import('../views/login/index')
  }]
},
{
  path: '/home',
  name: 'home',
  redirect: '/product',
  meta: {
    title: '首页'
  },
  component: layout,
  children: [{
    path: '/product',
    name: 'product',
    component: () => import('../views/home/product'),
    meta: {
      title: '制品单'
    }
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: () => import('../views/home/equipment'),
    meta: {
      title: '设备单'
    }
  },
  {
    path: '/beforehand',
    name: 'beforehand',
    component: () => import('../views/home/beforehand'),
    meta: {
      title: '预开票'
    }
  }
  ]
},
{
  path: '/newitem',
  component: layout,
  redirect: '/newproduct',
  name: 'newitem',
  meta: {
    title: '新建'
  },
  children: [{
    path: '/newproduct',
    name: 'newproduct',
    component: () => import('../views/newitem/newproduct'),
    meta: {
      title: '制品'
    }
  },
  {
    path: '/newequipment',
    name: 'newequipment',
    component: () => import('../views/newitem/newequipment'),
    meta: {
      title: '设备'
    }
  },
  {
    path: '/linkitem',
    name: 'linkitem',
    component: () => import('../views/newitem/linkitem'),
    meta: {
      title: '关联'
    }
  }

  ]
},
{
  path: '/confirm',
  name: 'confirm',
  component: layout,
  meta: {
    title: '确认'
  },
  children: [
    {
      path: '/confirm',
      component: () => import('../views/confirm/confirm'),
      meta: {
        title: '确认'
      }
    }

  ]
},
{
  path: '/query',
  name: 'query',
  component: layout,
  meta: {
    title: '查询'
  },
  children: [
    {
      path: '/query',
      component: () => import('../views/query/query')
    }

  ]
},
{
  path: '/highquery',
  name: 'highquery',
  redirect: '/proanalysis',
  component: layout,
  meta: {
    title: '高级查询'
  },
  children: [
    {
      path: '/proanalysis',
      name: 'proanalysis',
      component: () => import('../views/highquery/proanalysis'),
      meta: {
        title: '制品分析'
      }
    },
    {
      path: '/equanalysis',
      name: 'equAnalysis',
      component: () => import('../views/highquery/equanalysis'),
      meta: {
        title: '设备分析'
      }
    }
  ]
}

]

const router = new VueRouter({
  routes
})

export default router
