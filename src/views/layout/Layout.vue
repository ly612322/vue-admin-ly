<template>
  <div>
    <el-container>
      <el-aside style="width:auto">
        <sidebar />
      </el-aside>
      <el-container>
        <el-header style="padding:0">
          <navbar />
        </el-header>
        <el-main>
          <transition mode="out-in" name="item">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "./components/sidebar"
import navbar from "./components/navbar"
export default {
  components: {
    sidebar,
    navbar
  }
}
</script>

<style scoped>
.el-main {
  padding: 0px 10px;
}
</style>
