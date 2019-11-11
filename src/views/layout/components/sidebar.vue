<template>
  <div>
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->
    <el-menu
      class="el-menu-vertica"
      background-color="#304156"
      text-color="white"
      @open="handleOpen"
      @close="handleClose"
      :collapse="this.$store.state.collapse"
    >
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>-->
      <el-menu-item>
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">新建</span>
        </template>
        <el-menu-item>
          <span slot="title">制品异常单</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">设备异常单</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">关联异常单</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item>
        <i class="el-icon-document"></i>
        <span slot="title">确认</span>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-search"></i>
        <span slot="title">查询</span>
      </el-menu-item>
      <el-submenu>
        <template slot="title">
          <i class="el-icon-data-line"></i>
          <span slot="title">高级查询</span>
        </template>
        <el-menu-item>
          <span slot="title">关联查询</span>
        </el-menu-item>
        <el-menu-item>
          <span slot="title">品名查LOT</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style>
.el-menu-vertica:not(.el-menu--collapse) {
  width: 200px;
  height: 100vh;
}
.el-menu-vertica {
  width: 200px;
  height: 100vh;
}
</style>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>