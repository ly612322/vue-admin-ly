<template>
  <!-- 顶部navbar 包含折叠按钮 面包屑导航 退出按钮-->
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="9">
        <!-- 折叠按钮切换 -->
        <i
          :class="[listicon ?'el-icon-s-unfold':'el-icon-s-fold']"
          class="navbar-img"
          @click="collapse"
          id="collapseButton"
        ></i>
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
      </el-col>
      <el-col :span="9">
        <user></user>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import fullscreen from "../../../components/fullscreen/index"
import user from "./user"
export default {
  data() {
    return {
      levelList: null,
      listicon: false,
      isFullscreen: false,
      refreshIcon: "el-icon-refresh",
    }
  },
  components: { fullscreen, user },
  watch: {
    $route() {
      // 监听路由
      this.getBreadcrumb()
    }
  },
  methods: {
    collapse() {
      this.listicon = !this.listicon
      this.$store.commit("toCollapse")
    },
    getBreadcrumb() {
      // 获取route的matched
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== "home") {
        // 如果不是在首页 则在头部加入首页 ，不需要时注释即可
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched)
      }
      this.levelList = matched
    },

    // refreshMain() {
    //   this.refresh = false
    //   // 在组件移除后，重新渲染组件
    //   // 可实现在DOM 状态更新后，执行传入的方法。
    //   this.$nextTick(() => {
    //     this.refresh = true
    //   })
    // }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>
<style scoped>
h4 {
  margin: 0;
}
.elbreadcrumb {
  height: 49px;
  line-height: 49px;
  font-size: 16px;
  color: gray;
}
.navbar-img {
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 10px 10px 15px;
  font-size: 30px;
  color: gray;
}
.user {
  float: right;
  margin: 10px 10px;
  font-size: 20px;
}
.refresh {
  float: right;
  color: #808080;
  line-height: 50px;
  font-size: 26px;
  font-weight: 550;
  margin-right: 13px;
}
.fullscr {
  float: right;
  line-height: 51px;
  margin-right: 15px;
  font-size: 23px;
}

</style>

