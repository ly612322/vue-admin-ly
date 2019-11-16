<template>
  <div>
    <el-container>
      <el-aside style="width:auto">
        <sidebar ></sidebar>
      </el-aside>
      <el-container>
        <el-header >
          <navbar />
          <tabsbar></tabsbar>
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
import sidebar from './components/sidebar'
import navbar from './components/navbar'
import tabsbar from './components/tabsbar'
export default {
  components: {
    sidebar,
    navbar,
    tabsbar
  }
}
</script>

<style scoped>
.el-header{
  padding: 0;
  height: auto !important;
}
.el-main {
  padding: 0px 10px;
}
.el-container{
  height: 100vh;
}
</style>
