<template>
  <div>
    <!-- <fullscreen v-model="isFullscreen" class="fullscr" /> -->
    <el-dropdown class="setting" placement="bottom" @command="logout">
      <i
        class="el-icon-user-solid soild"
        :style="{'color':($store.state.siderSwith?'#fff':'#000000'),'font-size':'22px'}"
      >{{this.$store.state.username}}</i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="close">{{this.$store.state.tabsbar == false ? '开启标签栏':'关闭标签栏'}}</el-dropdown-item>
        <el-dropdown-item command="change">切换账号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-tooltip class="item" effect="dark" content="页面样式设置" placement="bottom">
    <i class="el-icon-setting setting" @click="childsetting"></i>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
    <i class="el-icon-full-screen setting" @click="screenfull"></i>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="刷新" placement="bottom">
    <i class="setting" :class="refreshIcon" @click="refreshMain"></i>
    </el-tooltip>

  </div>
</template>
<script>
import screenfull from 'screenfull'

export default {
  name: "user",
  data() {
    return {
      siderSwith: false,
      refreshIcon: "el-icon-refresh",
      topicColor: "#409EFF",
      drawer: true,
      isFullscreen:false
    }
  },
  methods: {
    logout(command) {
      if (command == "change") {
        // 退出清空token 跳转登录页
        window.sessionStorage.clear()
        this.$router.push("/login")
      }
      if (command == "close") {
        this.$store.state.tabsbar = !this.$store.state.tabsbar
      }
    },
    refreshMain() {
      this.refreshIcon = "el-icon-loading"
      let rotate = setTimeout(() => {
        this.refreshIcon = "el-icon-refresh"
      }, 1000)
      this.$store.state.refresh = new Date().getTime()
    },
    childsetting() {
      this.$store.state.drawer = true
    },
    screenfull() {
      // if (!screenfull.enabled) {
      //   this.$message({
      //     message: '您的浏览器无法进入全屏模式',
      //     type: 'warning'
      //   })
      //   return false
      // }
      screenfull.toggle()
      this.isFullscreen = true
    },
    // Esc 全屏监测
    checkFull() {
      let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled
      if (isFull === undefined) {
          isFull = false
      }
      return isFull
    }
  },
   mounted() {
     window.onresize = () => {
           // 全屏下监控是否按键了ESC
           if (!this.checkFull()) {
             // 退出全屏
             this.isFullscreen = false
           }
         }
      }
  }

</script>
<style lang="less" scoped>
.setting {
  float: right;
  font-size: 26px;
  line-height: 50px;
  margin: 0px 5px;
}
</style>