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
        <el-col :span="5">
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
        <el-col :span="5">
          <el-form-item label="结束日期" prop="结束日期">
            <el-date-picker
              v-model="queryForm.结束日期"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品名" prop="品名" label-width="70px">
            <el-input v-model="queryForm.品名" placeholder="请输入品名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="异常名称" prop="createGroup">
            <el-input v-model="queryForm.异常名称" placeholder="异常名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="1">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">
      <el-table :data="tabledata" height="550" border style="width: 100%">
        <el-table-column prop="编号" label="编号"></el-table-column>
        <el-table-column prop="LOT" label="LOT"></el-table-column>
        <el-table-column prop="SHEET" label="SHEET"></el-table-column>
        <el-table-column prop="PANEL" label="PANEL"></el-table-column>
        <el-table-column prop="品名" label="品名"></el-table-column>
        <el-table-column prop="设备" label="设备"></el-table-column>
        <el-table-column prop="大工程" label="大工程"></el-table-column>
        <el-table-column prop="小工程" label="小工程"></el-table-column>
        <el-table-column prop="备注" label="备注"></el-table-column>
        <el-table-column prop="人员" label="人员"></el-table-column>
        <el-table-column prop="UP_DATE" label="UP_DATE"></el-table-column>
        <el-table-column prop="姓名" label="姓名"></el-table-column>
        <el-table-column prop="组别" label="组别"></el-table-column>
        <el-table-column prop="异常名称" label="异常名称"></el-table-column>
      </el-table>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        开始日期: "",
        结束日期: "",
        品名: "",
        异常名称: ""
      },
      tabledata: []
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/品名查LOT_高级查询_面板厂.py",
        this.$qs.stringify(this.queryForm)
      )
      this.tabledata = data.data
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
