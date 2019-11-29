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
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="明细" name="明细">
        <tables :tableData="tabledata"></tables>
      </el-tab-pane>
      <el-tab-pane name="异常名称" label="异常名称">
        <charts :chartoption="option" name="异常名称" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane name="起因设备" label="起因设备">
        <charts :chartoption="option" name="起因设备" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane name="LOT" label="LOT">
        <charts :chartoption="option" name="LOT" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane name="品名" label="品名">
        <charts :chartoption="option" name="品名" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane name="设备" label="设备">
        <charts :chartoption="option" name="设备" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane name="工程" label="工程">
        <charts :chartoption="option" name="工程" :tabledata="tabledata"></charts>
      </el-tab-pane>
      <el-tab-pane label="位置">
        <el-row>
          <el-col :span="10">
            <el-card class="box-card el-card__head box-card-right" shadow="never">
              <div slot="header" class="clearfix">
                <span>不良位置</span>
              </div>
              <div class="picdisplay">
                <div style="margin-left: 66%">1300</div>
                <div class="picture"></div>
                <div class="picture"></div>
                <div class="picture"></div>
                <br />
                <div class="picture" style="margin-left:7%"></div>
                <div class="picture"></div>
                <div class="picture"></div>
                <div style="width:71%">
                  <span style="float:left">1100</span>
                  <span style="float:right">OF</span>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12" :offset="2">
            <el-table :data="position" height="450" border>
              <el-table-column prop="位置" label="位置"></el-table-column>
              <el-table-column prop="数量" label="数量"></el-table-column>
              <el-table-column prop="占比" label="占比"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import tables from "./components/table"
import charts from "./components/charts"
export default {
  data() {
    return {
      data: {},
      activeName: "明细",
      option: {},
      title: [],
      proportion: [],
      tabledata: [],
      queryForm: {
        开始日期: "",
        结束日期: "",
        处置组: "",
        开票组: "",
        确认组: ""
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
      this.$http
        .post(
          "/API/异常处置系统/制品异常分析_高级查询_面板厂.py",
          this.$qs.stringify(this.queryForm)
        )
        .then(res => {
          this.data = res.data
          this.tabledata = this.data.明细
          this.position = this.data.位置
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
      } else if (val == 7) {
        let count = document.getElementsByClassName("picture")
        for (let index in this.position) {
          count[index].innerHTML = this.position[index]["数量"]
        }
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
.picdisplay {
  margin-top: 2%;
  margin-left: 10%;
}
.picture {
  text-align: center;
  display: inline-block;
  width: 14%;
  height: 149px;
  margin-left: 7%;
  background-color: #5bf106;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
</style>
