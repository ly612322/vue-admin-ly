<template>
  <div>
    <!-- <fullscreen v-model="isFullscreen" class="fullscr" /> -->
    <el-dropdown class="user" placement="bottom" @command="logout">
      <i
        class="el-icon-user-solid soild"
        :style="{'color':($store.state.siderSwith?'#fff':'#000000')}"
      >{{this.$store.state.username}}</i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="close">{{this.$store.state.tabsbar == false ? '开启标签栏':'关闭标签栏'}}</el-dropdown-item>
        <el-dropdown-item command="change">切换账号</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <i class="el-icon-setting setting" @click="childsetting"></i>
    <i class="refresh" :class="refreshIcon" @click="refreshMain"></i>
  </div>
</template>
<script>
export default {
  name: "user",
  data() {
    return {
      siderSwith: false,
      refreshIcon: "el-icon-refresh",
      topicColor: "#409EFF",
      drawer: true
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
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  float: right;
  margin: 10px 10px;
  font-size: 20px;
}
.refresh {
  float: right;
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
.setting {
  float: right;
  font-size: 26px;
  line-height: 50px;
  margin-right: 5px;
}
.settingItem {
  margin: 23px 5px;
}
.el-dropdown {
  color: "#000000" !important;
}
</style>