<template>
  <div>
    <el-container>
      <el-aside style=" width: auto;" v-show="!$store.state.siderSwith">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header v-if="$store.state.siderSwith" class="header">
          <hnavbar />
          <tabsbar></tabsbar>
        </el-header>
        <el-header v-else>
          <navbar />
          <tabsbar></tabsbar>
        </el-header>
        <elmain></elmain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "./components/sidebar"
import navbar from "./components/navbar"
import tabsbar from "./components/tabsbar"
import elmain from "./components/main"
import hnavbar from "./components/hnavbar"
import screenfull from "screenfull"

export default {
  data() {
    return {
      showMain: ""
    }
  },
  components: {
    sidebar,
    navbar,
    hnavbar,
    tabsbar,
    elmain
  },
  methods: {
    //全屏
    screenfull() {
      screenfull.request()
    }
  },
  created() {
    this.screenfull()
  }
}
</script>

<style scoped>
.el-header {
  padding: 0;
  height: auto !important;
  /* border-bottom: 1px solid #ccc; */
}
.el-main {
  padding: 0px 10px;
}
.el-container {
  height: 100vh;
}
.el-aside {
  overflow: hidden;
}
</style>
