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
          <el-form-item label="开始日期" prop="开始日期">
            <el-date-picker
              v-model="queryForm.开始日期"
              type="date"
              placeholder="选择日期"
              size="small"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
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
          <el-form-item label="异常名称" prop="异常名称">
            <el-input v-model="queryForm.异常名称" placeholder="异常名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">查询</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-tabs type="border-card">
      <el-table :data="tabledata" height="550" border style="width: 100%">
        <el-table-column prop="编号" label="编号"></el-table-column>
        <el-table-column prop="工厂" label="工厂"></el-table-column>
        <el-table-column prop="年份" label="年份"></el-table-column>
        <el-table-column prop="序号" label="序号"></el-table-column>
        <el-table-column prop="创建人员" label="创建人员"></el-table-column>
        <el-table-column prop="创建组" label="创建组"></el-table-column>
        <el-table-column prop="创建时间" label="创建时间"></el-table-column>
        <el-table-column prop="状态" label="状态"></el-table-column>
        <el-table-column prop="异常发现时间" label="异常发现时间"></el-table-column>
        <el-table-column prop="制品分类" label="制品分类"></el-table-column>
        <el-table-column prop="异常程度" label="异常程度"></el-table-column>
        <el-table-column prop="异常名称" label="异常名称"></el-table-column>
        <el-table-column prop="异常描述" label="异常描述"></el-table-column>
        <el-table-column prop="处置组" label="处置组"></el-table-column>
        <el-table-column prop="起因设备" label="起因设备"></el-table-column>
        <el-table-column prop="原因" label="原因"></el-table-column>
        <el-table-column prop="正向追踪单" label="正向追踪单"></el-table-column>
        <el-table-column prop="最后处置人员" label="最后处置人员"></el-table-column>
        <el-table-column prop="最后处置时间" label="最后处置时间"></el-table-column>
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
        异常名称: ""
      },
      tabledata:[]
    }
  },
  methods: {
    async onSubmit() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/异常名称查票据_高级查询_面板厂.py",
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
