<template>
  <div>
    <el-table :data="tableData" :height="height" border style="width: 100%" >
      <el-table-column prop="编号" label="编号"></el-table-column>
      <el-table-column prop="工厂" label="工厂"></el-table-column>
      <el-table-column prop="年份" label="年份"></el-table-column>
      <el-table-column prop="序号" label="序号"></el-table-column>
      <el-table-column prop="创建人员" label="创建人员"></el-table-column>
      <el-table-column prop="创建时间" label="创建时间"></el-table-column>
      <el-table-column prop="状态" label="状态"></el-table-column>
      <el-table-column prop="异常发现时间" label="异常发现时间"></el-table-column>
      <el-table-column prop="制品分类" label="制品分类"></el-table-column>
      <el-table-column prop="异常程度" label="异常程度"></el-table-column>
      <el-table-column prop="异常名称" label="异常名称"></el-table-column>
      <el-table-column prop="异常描述" label="异常描述"></el-table-column>
      <el-table-column prop="处置组" label="处置组"></el-table-column>
      <el-table-column prop="原因" label="原因"></el-table-column>
      <el-table-column prop="最后处置人员" label="最后处置人员"></el-table-column>
      <el-table-column prop="最后处置时间" label="最后处置时间"></el-table-column>
      <el-table-column prop="开票组" label="开票组"></el-table-column>
      <el-table-column prop="开票人" label="开票人"></el-table-column>
      <el-table-column prop="起因设备" label="起因设备"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      height:'70vh'
    }
  },
  props: ["tableData"]
}
</script>
<style lang="less" scoped>
</style>