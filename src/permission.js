import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path == '/login') {
    next()
    NProgress.done()
  } else {
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) {
      next('/login')
      NProgress.done()
    } else {
      next()
      NProgress.done()

    }
  }
})
