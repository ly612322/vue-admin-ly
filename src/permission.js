import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 进度条
  if (to.path === '/login') {
    next() // 如果是登陆调转 直接放行
    NProgress.done()
  } else { // 如果不是去登陆页 先判断是否有token
    const tokenStr = window.sessionStorage.getItem('token') // 获取本地存储的token
    if (!tokenStr) { // 没有token则跳转登陆页
      next('/login')
      NProgress.done()
    } else { // 如果有 则放行
      // 先遍历列表 是否已存在路由标签
      // let flag = true
      // store.state.tagslist.forEach((ele,index)=> {
      //     if(ele.title == to.meta.title){
      //       flag = false
      //       store.state.activename = to.meta.title
      //       next()
      //     }
      // })
      // if(flag){
      //   store.state.tagslist.push({
      //     title: to.meta.title,
      //     name: to.meta.title
      //   })
      //   store.state.activename = to.meta.title
      //   console.log(store.state.activename);
      next()
      NProgress.done() // 关闭进度条
    }
  }
})
