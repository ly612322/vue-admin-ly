<template>
  <div>
    <i class="el-icon-s-fold navbar-img" @click="collapse"></i>
    <!-- <img :src="list" alt   /> -->
    <el-dropdown class="user" placement="bottom" @command="logout">
      <i class="el-icon-user-solid"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <el-breadcrumb class="elbreadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" >
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },
    collapse() {
      this.$store.commit("toCollapse")
    },
    getBreadcrumb() {
      console.log(this.$route.matched);
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]     
      if (first && first.name !== "home") {
        matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched)
      }
      this.levelList = matched
      
    }
  },
  created() {
    this.getBreadcrumb()
  }
}
</script>
<style scoped>
.elbreadcrumb {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid rgb(196, 196, 196);
  font-size: 16px;
  color: gray;
}
.navbar-img {
  width: 30px;
  height: 30px;
  float: left;
  margin: 10px 15px;
  font-size: 30px;
  color: gray;
}
.user {
  float: right;
  margin: 10px 40px;
  font-size: 23px;
}
</style>