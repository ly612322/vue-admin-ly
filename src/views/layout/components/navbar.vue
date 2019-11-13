<template>
  <!-- 顶部navbar 包含折叠按钮 面包屑导航 退出按钮-->
  <div>
    <!-- 折叠按钮切换 -->
    <i
      :class="[listicon ?'el-icon-s-unfold':'el-icon-s-fold']"
      class="navbar-img"
      @click="collapse"
    ></i>
    <!-- 退出下拉菜单 -->
    <el-dropdown class="user" placement="bottom" @command="logout">
      <i class="el-icon-user-solid"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- 面包屑导航 -->
    <el-breadcrumb class="elbreadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
          <span
            v-if="item.redirect==='noredirect'|| index==levelList.length-1"
            class="no-redirect"
          >{{item.meta.title}}</span>
          <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: null,
      listicon: false
    }
  },
  watch: {
    $route() {
      //监听路由
      this.getBreadcrumb()
    }
  },
  methods: {
    logout() {
      // 退出清空token 跳转登录页
        window.sessionStorage.clear()
      this.$router.push("/login")
    },
    collapse() {
      this.listicon = !this.listicon
      this.$store.commit("toCollapse")
    },
    getBreadcrumb() {
      //获取route的matched
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== "home") {
        // 如果不是在首页 则在头部加入首页 ，不需要时注释即可
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched)
      }
      this.levelList = matched
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>
<style scoped>
.elbreadcrumb {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid rgb(196, 196, 196);
  font-size: 16px;
  color: gray;
}
.navbar-img {
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 15px;
  font-size: 30px;
  color: gray;
}
.user {
  float: right;
  margin: 10px 40px;
  font-size: 23px;
}
</style>
