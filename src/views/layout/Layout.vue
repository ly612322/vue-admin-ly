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
        <elmain></elmain>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from './components/sidebar'
import navbar from './components/navbar'
import tabsbar from './components/tabsbar'
import elmain from './components/main'
export default {
  data () {
    return {
      showMain: ''
    }
  },
  components: {
    sidebar,
    navbar,
    tabsbar,
    elmain
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
