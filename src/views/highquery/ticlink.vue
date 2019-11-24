<template>
  <div>
    <el-row type="flex">
      <el-form :model="queryForm" ref="queryForm" label-width="80px" size="small">
        <el-col :span="9">
          <el-form-item label="制品单" prop="startTime">
            <el-input v-model="queryForm.product"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="设备单" prop="startTime">
            <el-input v-model="queryForm.equipment"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="50px">
            <el-button type="primary" @click="onSubmit('form')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card"></el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        product: "",
        equipment: ""
      }
    }
  }
}
</script>
<style lang="less" scoped>
.el-input,
.el-select {
  width: 140px !important;
}
.el-date-editor {
  width: 140px !important;
}
.el-tabs {
  height: 78vh;
}
</style>
