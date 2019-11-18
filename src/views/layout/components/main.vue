<template>
  <div>
    <el-main>
      <transition mode="out-in" name="item">
        <router-view></router-view>
      </transition>
    </el-main>
  </div>
</template>
<script>
export default {
  name: "elmain"
}
</script>
<style lang="less" scoped>
.el-main{
  overflow: auto;
  height: 87vh;
  padding: 12px;
}

</style>
