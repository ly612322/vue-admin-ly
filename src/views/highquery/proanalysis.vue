<template>
  <div>
    <el-row type='flex'>
      <el-form :model="queryForm" ref="queryForm" label-width="90px" class="demo-ruleForm" size="small">
        <el-col :span="4">
          <el-form-item label="开始日期" prop="startTime" width="200px">
            <el-date-picker v-model="queryForm.startTime" type="date" placeholder="选择日期" size='small'></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="结束日期" prop="startTime">
            <el-date-picker v-model="queryForm.endTime" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4" >
          <el-form-item label="开票组" prop="createGroup">
              <el-select v-model="queryForm.createGroup" placeholder="请选择开票组">
                <el-option label="TEST" value="TEST"></el-option>
                <el-option label="PVD" value="PVD"></el-option>
                <el-option label="CVD" value="CVD"></el-option>
                <el-option label="DET" value="DET"></el-option>
                <el-option label="WET" value="WET"></el-option>
                <el-option label="PHOTO" value="PHOTO"></el-option>
                <el-option label="C-TEST" value="C-TEST"></el-option>
                <el-option label="AT" value="AT"></el-option>
                <el-option label="前工程" value="前工程"></el-option>
                <el-option label="中工程" value="中工程"></el-option>
                <el-option label="材料管理科" value="材料管理科"></el-option>
              </el-select>
            </el-form-item>         
        </el-col>
        <el-col :span="4" >
          <el-form-item label="确认组" prop="createGroup">
              <el-select v-model="queryForm.confirmGroup" placeholder="请选择确认组">
                <el-option label="TEST" value="TEST"></el-option>
                <el-option label="PVD" value="PVD"></el-option>
                <el-option label="CVD" value="CVD"></el-option>
                <el-option label="DET" value="DET"></el-option>
                <el-option label="WET" value="WET"></el-option>
                <el-option label="PHOTO" value="PHOTO"></el-option>
                <el-option label="C-TEST" value="C-TEST"></el-option>
                <el-option label="AT" value="AT"></el-option>
                <el-option label="前工程" value="前工程"></el-option>
                <el-option label="中工程" value="中工程"></el-option>
                <el-option label="材料管理科" value="材料管理科"></el-option>
              </el-select>
            </el-form-item>         
        </el-col>
        <el-col :span="3" >
          <el-form-item label="处置组" prop="createGroup">
              <el-select v-model="queryForm.handleGroup" placeholder="请选择处置组">
                <el-option label="TEST" value="TEST"></el-option>
                <el-option label="PVD" value="PVD"></el-option>
                <el-option label="CVD" value="CVD"></el-option>
                <el-option label="DET" value="DET"></el-option>
                <el-option label="WET" value="WET"></el-option>
                <el-option label="PHOTO" value="PHOTO"></el-option>
                <el-option label="C-TEST" value="C-TEST"></el-option>
                <el-option label="AT" value="AT"></el-option>
                <el-option label="前工程" value="前工程"></el-option>
                <el-option label="中工程" value="中工程"></el-option>
                <el-option label="材料管理科" value="材料管理科"></el-option>
              </el-select>
            </el-form-item>         
        </el-col>
        <el-col :span="2" >
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">查询</el-button>
        </el-form-item>       
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">
  <el-tab-pane label="明细">明细</el-tab-pane>
  <el-tab-pane label="异常名称">异常名称</el-tab-pane>
  <el-tab-pane label="起因设备">起因设备</el-tab-pane>
  <el-tab-pane label="LOT">LOT</el-tab-pane>
  <el-tab-pane label="品名">品名</el-tab-pane>
  <el-tab-pane label="设备">设备</el-tab-pane>
  <el-tab-pane label="工程">工程</el-tab-pane>
  <el-tab-pane label="位置">位置</el-tab-pane>
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
        createGroup:"",
        confirmGroup:"",
        handleGroup:""
      }
    }
  },
  methods: {
    async submit() {
      const {data} = this.$http.post('')
    }
  },
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
