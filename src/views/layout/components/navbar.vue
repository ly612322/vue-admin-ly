<template>
  <div>
    <img :src="list" alt class="navbar-img" @click="collapse" />
    <el-dropdown class="user" placement='bottom' @command="logout">
        <i class="el-icon-user-solid"></i>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item >退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-breadcrumb separator-class="el-icon-arrow-right" class="elbreadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>1</el-breadcrumb-item>
      <el-breadcrumb-item>2</el-breadcrumb-item>
      <el-breadcrumb-item>3</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import list from "../../../assets/images/list.png";
export default {
  data() {
    return {
      list
    };
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    collapse() {
      this.$store.commit("toCollapse");
    }
  }
};
</script>
<style scoped>
.elbreadcrumb {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(196, 196, 196);
}
.navbar-img {
  width: 30px;
  height: 30px;
  float: left;
  margin: 5px 15px;
}
.user{
    float: right;
    margin: 8px 30px;
    font-size: 20px
}
</style>