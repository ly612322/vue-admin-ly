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
          <appmain><router-view></router-view></appmain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "./components/sidebar";
import navbar from "./components/navbar";
import appmain from "./components/appmain";
export default {
  components: {
    sidebar,
    navbar,
    appmain
  }
};
</script>

<style lang="stylus" scoped></style>