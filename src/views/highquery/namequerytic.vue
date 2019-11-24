<template>
  <div>
    <el-row type="flex">
      <el-form
        :model="queryForm"
        ref="queryForm"
        label-width="80px"
        class="demo-ruleForm"
        size="small"
      >
        <el-col :span="7">
          <el-form-item label="开始日期" prop="startTime">
            <el-date-picker
              v-model="queryForm.startTime"
              type="date"
              placeholder="选择日期"
              size="small"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="结束日期" prop="startTime">
            <el-date-picker v-model="queryForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="异常名称" prop="createGroup">
            <el-input v-model="queryForm.name" placeholder="异常名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
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
        startTime: "",
        endTime: "",
        name: ""
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
