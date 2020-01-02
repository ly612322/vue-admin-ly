<template>
  <div>
    <el-main :key="this.$store.state.refresh" >
      <transition mode="out-in" name="item">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </el-main>
    <el-drawer :visible.sync="$store.state.drawer" direction="rtl" size="250px">
      <h4>页面样式设置</h4>
      <div class="settingItem">
        <span>颜色主题</span>
        <el-color-picker v-model="topicColor" style="float:right" size="small"></el-color-picker>
      </div>
      <div class="settingItem">
        <span>导航布局</span>
        <el-switch
          style="float: right"
          v-model="$store.state.siderSwith"
          active-color="#13ce66"
          inactive-color="#409EFF"
          active-text="横向"
          inactive-text="纵向"
        ></el-switch>
      </div>
      <div class="settingItem">
        <span>多页签模式</span>
        <el-switch
          style="float: right"
          v-model="$store.state.tabsbar"
          active-color="#13ce66"
          inactive-color="#ccc"
        ></el-switch>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "elmain",
  data() {
    return {
      topicColor: "#409EFF"
    }
  }
}
</script>
<style lang="less" scoped>
.el-main {
  overflow-x: hidden;
  overflow-y: auto;
  height: 90vh;
  padding: 12px;
  font-size: 13px;
  background-color: #ffffff
}
.setting {
  color: #808080;
  float: right;
  font-size: 26px;
  line-height: 50px;
  margin-right: 5px;
}
.settingItem {
  margin: 23px 5px;
}
</style>
