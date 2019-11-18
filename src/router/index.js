import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [{
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
  children: [{
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
  children: [{
    meta: {
      title: '查询'
    },
    path: '/query',
    component: () => import('../views/query/query')
  }

  ]
},
{
  path: '/highquery',
  name: 'highquery',
  redirect: '/制品异常分析',
  component: layout,
  meta: {
    title: '高级查询'
  },
  children: [{
    path: '/制品异常分析',
    name: 'proanalysis',
    component: () => import('../views/highquery/proanalysis'),
    meta: {
      title: '制品异常分析'
    }
  },
  {
    path: '/设备异常分析',
    name: 'equAnalysis',
    component: () => import('../views/highquery/equanalysis'),
    meta: {
      title: '设备异常分析'
    }
  },
  {
    path: '/票据关联',
    name: '票据关联',
    component: () => import('../views/highquery/ticlink'),
    meta: {
      title: '票据关联'
    }
  },
  {
    path: '/品名查LOT',
    name: '品名查LOT',
    component: () => import('../views/highquery/pmquerylot'),
    meta: {
      title: '品名查LOT'
    }
  },
  {
    path: '/LOT查异常',
    name: 'LOT查异常',
    component: () => import('../views/highquery/lotquerytic'),
    meta: {
      title: 'LOT查异常'
    }
  },
  {
    path: '/开票数统计',
    name: '开票数统计',
    component: () => import('../views/highquery/ticcount'),
    meta: {
      title: '开票数统计'
    }
  },
  {
    path: '/故障时间统计',
    name: '故障时间统计',
    component: () => import('../views/highquery/timecount'),
    meta: {
      title: '故障时间统计'
    }
  },
  {
    path: '/异常名称查票据',
    name: '异常名称查票据',
    component: () => import('../views/highquery/namequerytic'),
    meta: {
      title: '异常名称查票据'
    }
  }
  ]
}

]

const router = new VueRouter({
  routes
})

export default router
