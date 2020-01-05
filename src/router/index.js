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
    redirect: '/制品单',
    meta: {
      title: '首页'
    },
    component: layout,
    children: [{
        path: '/制品单',
        name: '制品单',
        component: () => import('../views/home/product'),
        meta: {
          title: '制品单'
        }
      },
      {
        path: '/设备单',
        name: '设备单',
        component: () => import('../views/home/equipment'),
        meta: {
          title: '设备单'
        }
      },
      {
        path: '/预开票',
        name: '预开票',
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
    redirect: '/新建制品单',
    name: '新建',
    meta: {
      title: '新建'
    },
    children: [{
        path: '/新建制品单',
        name: '新建制品单',
        component: () => import('../views/newitem/newproduct'),
        meta: {
          title: '新建制品单'
        }
      },
      {
        path: '/新建设备单',
        name: '新建设备单',
        component: () => import('../views/newitem/newequipment'),
        meta: {
          title: '新建设备单'
        }
      },
      {
        path: '/新建关联单',
        name: '新建关联单',
        component: () => import('../views/newitem/linkitem'),
        meta: {
          title: '新建关联单'
        }
      }
    ]
  },
  {
    path: '/确认',
    component: layout,
    meta: {
      title: '确认'
    },
    children: [{
      path: '/制品指示确认',
      name: '制品指示确认',
      component: () => import('../views/confirm/confirm'),
      meta: {
        title: '制品指示确认'
      }
    }]
  },
  {
    path: '/dealitem',
    component: layout,
    name: 'dealitem',
    redirect: {
      path:'/handleritem',
    },
    children: [{
      path: '/handleritem',
      name: 'handleritem',
      component: () => import('../views/home/components/proalert/dealproduct'),
    }]
  },
  {
    path: '/查询',
    component: layout,
    meta: {
      title: '查询'
    },
    children: [{
      name: '异常单查询',
      meta: {
        title: '异常单查询'
      },
      path: '/异常单查询',
      component: () => import('../views/query/query')
    }]
  },
  {
    path: '/高级查询',
    name: '高级查询',
    redirect: '/制品异常分析',
    component: layout,
    meta: {
      title: '高级查询'
    },
    children: [{
        path: '/制品异常分析',
        name: '制品异常分析',
        component: () => import('../views/highquery/proanalysis'),
        meta: {
          title: '制品异常分析'
        }
      },
      {
        path: '/设备异常分析',
        name: '设备异常分析',
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
