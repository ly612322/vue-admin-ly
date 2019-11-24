<template>
  <div>
    <el-row type='flex'>
      <el-form :model="queryForm" ref="queryForm" label-width="90px" class="demo-ruleForm" size="small">
        <el-col :span="5">
          <el-form-item label="开始日期" prop="startTime" width="200px">
            <el-date-picker v-model="queryForm.startTime" type="date" placeholder="选择日期" size='small'></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5" >
          <el-form-item label="结束日期" prop="startTime">
            <el-date-picker v-model="queryForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5" >
          <el-form-item label="品名" prop="createGroup" label-width="70px">
              <el-input v-model="queryForm.pm" placeholder="请输入品名"></el-input>
            </el-form-item>         
        </el-col>
        <el-col :span="4" >
          <el-form-item label="异常名称" prop="createGroup">
              <el-input v-model="queryForm.pm" placeholder="异常名称"></el-input>
            </el-form-item>         
        </el-col>

        <el-col :span="1" >
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        </el-form-item>       
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">

</el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        startTime: "",
        endTime: "",
        pm:"",
        errorName:""
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
