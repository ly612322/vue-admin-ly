<template>
  <div>
    <el-table :data="tableData" height="650" border style="width: 100%">
      <el-table-column prop="编号" label="编号"></el-table-column>
      <el-table-column prop="工厂" label="工厂"></el-table-column>
      <el-table-column prop="年份" label="年份"></el-table-column>
      <el-table-column prop="序号" label="序号"></el-table-column>
      <el-table-column prop="创建人员" label="创建人员"></el-table-column>
      <el-table-column prop="创建时间" label="创建时间"></el-table-column>
      <el-table-column prop="状态" label="状态"></el-table-column>
      <el-table-column prop="处置组" label="处置组"></el-table-column>
      <el-table-column prop="设备群" label="设备群"></el-table-column>
      <el-table-column prop="号机" label="号机"></el-table-column>
      <el-table-column prop="大单元" label="大单元"></el-table-column>
      <el-table-column prop="小单元" label="小单元"></el-table-column>
      <el-table-column prop="处置组" label="处置组"></el-table-column>
      <el-table-column prop="故障类型" label="故障类型"></el-table-column>
      <el-table-column prop="故障时间" label="故障时间"></el-table-column>
      <el-table-column prop="处置完成时间" label="处置完成时间"></el-table-column>
      <el-table-column prop="故障现象" label="故障现象"></el-table-column>
      <el-table-column prop="品名" label="品名"></el-table-column>
      <el-table-column prop="原因" label="原因"></el-table-column>
      <el-table-column prop="处置方法" label="处置方法"></el-table-column>
      <el-table-column prop="处置结果" label="处置结果"></el-table-column>
      <el-table-column prop="更换备件" label="更换备件"></el-table-column>
      <el-table-column prop="水平展开" label="水平展开"></el-table-column>
      <el-table-column prop="水平展开_备注" label="水平展开_备注"></el-table-column>
      <el-table-column prop="最后处置人员" label="最后处置人员"></el-table-column>
      <el-table-column prop="最后处置时间" label="最后处置时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["tableData"]
}
</script>
<style lang="less" scoped>
</style>