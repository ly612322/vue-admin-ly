<template>
  <div>
    <el-row type="flex">
      <el-form
        :model="queryForm"
        ref="queryForm"
        label-width="90px"
        class="demo-ruleForm"
        size="small"
        label-position="top"
      >
        <el-col :span="20">
          <el-form-item label="LOT" prop="startTime" width="200px">
            <el-input type="textarea" v-model="queryForm.LOT" :rows="10" style="min-height:200px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="20">
        <el-tabs type="border-card"></el-tabs>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        LOT: ""
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-tabs {
  height: 78vh;
}
</style>
