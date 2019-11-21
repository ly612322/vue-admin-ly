<template>
  <div>
    <el-main v-if="refreshMain">
      <transition mode="out-in" name="item">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
  </div>
</template>
<script>
export default {
  name: "elmain",
  data() {
    return {
      refreshMain:this.$store.state.refresh
    }
  }
}
</script>
<style lang="less" scoped>
.el-main {
  overflow: auto;
  height: 87vh;
  padding: 12px;
}
</style>
