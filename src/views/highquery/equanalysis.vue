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
          <el-form-item label="设备群" prop="设备群">
            <el-select v-model="queryForm.设备群" placeholder="请选择设备群">
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
    <el-tabs type="border-card" v-model="activeName" v-loading.lock="loading">
      <el-tab-pane label="明细" name="明细">
        <tables :tableData="tabledata"></tables>
      </el-tab-pane>
      <el-tab-pane label="号机" name="号机">
        <charts :chartoption="option" name="号机" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane label="故障类型" name="故障类型">
        <charts :chartoption="option" name="故障类型" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane label="大单元" name="大单元">
        <charts :chartoption="option" name="大单元" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane label="小单元" name="小单元">
        <charts :chartoption="option" name="小单元" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane label="MTBF" name="MTBF">MTBF</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tables from "./components/equiptable"
import charts from "./components/charts"
export default {
  data() {
    return {
      loading: false,
      data: {},
      activeName: "明细",
      option: {},
      title: [],
      proportion: [],
      tabledata: [],
      queryForm: {
        开始日期: "",
        结束日期: "",
        设备群: ""
      },
      tabledata: [],
      position: []
    }
  },
  components: {
    tables,
    charts
  },
  methods: {
    compare(property) {
      return function(a, b) {
        let value1 = a[property]
        let value2 = b[property]
        return value2 - value1
      }
    },
    async onsubmit() {
      this.loading = true
      this.$http
        .post(
          "/API/异常处置系统/设备异常分析_高级查询_面板厂.py",
          this.$qs.stringify(this.queryForm)
        )
        .then(res => {
          this.data = res.data
          this.tabledata = this.data.明细
          this.loading = false
        })
    },
    selectItem(data, name) {
      for (let i = 0; i < data.length; i++) {
        data[i].占比 = parseFloat(data[i].占比)
      }
      data = data.sort(this.compare("占比"))
      for (let x in data) {
        this.title.push(data[x][name])
        this.proportion.push(parseFloat(data[x]["占比"]))
      }
      this.option = {
        title: {
          text: `${name}分析`
        },
        tooltip: {},
        xAxis: {
          data: this.title
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: "{value}(%)"
          }
        },
        series: [
          {
            name: "占比",
            type: "bar",
            color: "rgb(4, 142, 255)",
            data: this.proportion,
            itemStyle: {
              normal: {
                label: {
                  show: false, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                    formatter: "占比%"
                  }
                }
              }
            }
          }
        ]
      }
      for (var i = 0; i < data.length; i++) {
        data[i].占比 = Number(data[i].占比) + "%"
      }
      this.tabledata = data
    }
  },
  watch: {
    activeName: function(val) {
      if (val == 0) {
        return
      } else {
        this.title = []
        this.proportion = []
        this.selectItem(this.data[val], val)
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
