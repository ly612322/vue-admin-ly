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
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import sidebar from "./components/sidebar";
import navbar from "./components/navbar";
export default {
  components: {
    sidebar,
    navbar  }
};
</script>

<style lang="stylus" scoped></style>