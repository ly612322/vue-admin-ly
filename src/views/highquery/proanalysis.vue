<template>
  <div>
    <el-row type="flex">
      <el-form
        :model="queryForm"
        ref="queryForm"
        label-width="90px"
        class="demo-ruleForm"
        size="small"
      >
        <el-col :span="4">
          <el-form-item label="开始日期" prop="开始日期" width="200px">
            <el-date-picker
              v-model="queryForm.开始日期"
              type="date"
              placeholder="选择日期"
              size="small"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="结束日期" prop="结束日期">
            <el-date-picker
              v-model="queryForm.结束日期"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开票组" prop="开票组">
            <el-select v-model="queryForm.开票组" placeholder="请选择开票组">
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
        <el-col :span="4">
          <el-form-item label="确认组" prop="确认组">
            <el-select v-model="queryForm.确认组" placeholder="请选择确认组">
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
        <el-col :span="3">
          <el-form-item label="处置组" prop="处置组">
            <el-select v-model="queryForm.处置组" placeholder="请选择处置组">
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
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="onsubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">
      <el-tab-pane label="明细">
        <tables :tableData="tabledata"></tables>
      </el-tab-pane>
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
import tables from "./components/table"
export default {
  data() {
    return {
      queryForm: {
        开始日期: "",
        结束日期: "",
        处置组: "",
        开票组: "",
        确认组: ""
      },
      tabledata: []
    }
  },
  components: {
    tables
  },
  methods: {
    async onsubmit() {
      this.$http
        .post(
          "/API/异常处置系统/制品异常分析_高级查询_面板厂.py",
          this.$qs.stringify(this.queryForm)
        )
        .then(res => {
          let response = res.data
          this.tabledata = response.明细
        })
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
