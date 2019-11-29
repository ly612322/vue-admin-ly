<template>
  <div>
    <el-row>
      <el-col :span='10' >
        <chart
          ref="chart"
          :options="this.chartoption"
          :auto-resize="true"
          class="chart"
          key="chart"
        ></chart>
      </el-col>
      <el-col :span='12' :offset='2'>
        <el-table :data="tabledata" height="450" border>
          <el-table-column :prop="name" :label="name"></el-table-column>
          <el-table-column prop="数量" label="数量"></el-table-column>
          <el-table-column prop="占比" label="占比"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "charts",
  props: ["chartoption", "tabledata", "name"],
  data() {
    return {
      title: [],
      proportion: [],
      option: {}
    }
  }
}
</script>
<style  scoped>
.chart {
  float: left;
  margin: 0;
  width: 650px !important;
  height: 450px;
}
</style>
