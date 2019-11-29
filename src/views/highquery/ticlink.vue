<template>
  <div>
    <el-row type="flex">
      <el-form :model="queryForm" ref="queryForm" label-width="120px" size="small">
        <el-col :span="9" >
          <el-form-item label="制品票" prop="制品票">
            <el-input v-model="queryForm.制品票"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9" >
          <el-form-item label="设备票" prop="设备票">
            <el-input v-model="queryForm.设备票"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item label-width="50px">
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">
      <el-table :data="tabledata" height="450" border style="width: 100%">
        <el-table-column prop="制品异常单" label="制品异常单"></el-table-column>
        <el-table-column prop="设备异常单" label="设备异常单"></el-table-column>
      </el-table>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryForm: {
        制品票: "",
        设备票: ""
      },
      tabledata: []
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/票据关联_高级查询_面板厂.py",
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
  width: 220px !important;
}
.el-date-editor {
  width: 140px !important;
}
.el-tabs {
  height: 78vh;
}
</style>
