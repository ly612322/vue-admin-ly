<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="加载中...">
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>异常单编号</td>
        <td colspan="3">{{details.编号}}</td>
      </tr>
      <tr>
        <td>指示</td>
        <td colspan="3">{{details.指示}}</td>
      </tr>
      <tr>
        <td>指示人员</td>
        <td>{{details.指示人员}}</td>
        <td>指示组</td>
        <td>{{details.确认组}}</td>
      </tr>
      <tr>
        <td>指示时间</td>
        <td>{{details.指示时间}}</td>
        <td>最后确认结果</td>
        <td>{{details.最后确认结果}}</td>
      </tr>
      <tr>
        <td>最后确认人</td>
        <td>{{details.最后确认人}}</td>
        <td>最后确认时间</td>
        <td>{{details.最后确认时间}}</td>
      </tr>
    </table>
    <el-card class="box-card el-card__head el-card-body" shadow="never">
      <div slot="header" class="clearfix">
        <span>LOT信息</span>
      </div>
      <el-table :data="confirmItem" border max-height="250" align="center">
        <el-table-column align="center" prop="LOT" width="200" label="LOT"></el-table-column>
        <el-table-column align="center" prop="SHEET" width="350" label="SHEET"></el-table-column>
        <el-table-column
          align="center"
          prop="PANEL"
          width="150"
          label="PANEL"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column align="center" prop="备注" label="备注" :formatter="this.common.removeNone"></el-table-column>
      </el-table>
    </el-card>
    <el-divider>
      <i class="el-icon-edit">确认结果</i>
    </el-divider>
    <el-form :model="confirmform" label-width="106px" class="elform" label-position="right">
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="本次确认结果" prop="本次确认结果">
            <el-input
              placeholder="请输入结果"
              v-model="confirmform.result"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18">
          <el-form-item prop="type">
            <el-radio v-model="confirmform.select" label="进行">暂存:指示全部出来完成前暂存阶段结果</el-radio>
            <el-radio v-model="confirmform.select" label="完结">完结:指示处理全部完成</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row type="flex" justify="center">
        <el-col :span="5">
          <el-button
            ref="uploadbtn"
            type="primary"
            class="upload"
            @click="submitForm"
            style="width:250px"
          >
            <span ref="uploadtext">提交</span>
            <i class="el-icon-upload el-icon--right"></i>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import inputFilter from "../../utils/index.js"
export default {
  name: "conf",
  data() {
    return {
      fullscreenLoading: false,
      confirmItem: [],
      confirmform: {
        result: "",
        select: ""
      },
      details: []
    }
  },
  props: ["id","close"],
  methods: {
    async queryMessage() {
      this.fullscreenLoading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/展示_制品指示确认.py",
        this.$qs.stringify({
          编号: this.id
        })
      )
      this.details = data.详细[0]
      this.confirmItem = data.PANEL
      this.fullscreenLoading = false
    },

    async submitForm() {
      if (this.confirmform.result == "" || this.confirmform.select == "") {
        this.$message({
          message: "请完善确认内容",
          type: "warning",
          duration: "1200"
        })
        return
      }
      const { data } = await this.$http.post(
        "/API/异常处置系统/确认_制品指示确认.py",
        this.$qs.stringify(this.confirmform)
      )
      if (data.state == "插入成功") {
        this.$message({
          message: "指示成功",
          type: "success",
          duration: "1200"
        })
        this.props.close()
      }
    }
  },
  mounted() {
    this.queryMessage()
  }
}
</script>
<style scoped>
.table {
  width: 100%;
  max-width: 100%;
  margin-bottom: 20px;
  background-color: transparent;
  border-spacing: 0;
  border-collapse: collapse;
}
.table-bordered {
  border: 1px solid #ddd;
}
td {
  border: 1px solid #ddd;
  color: rgb(117, 117, 117);
  font-size: 14px;
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
}
.el-input,
.el-select {
  float: left;
}
.el-page-header {
  line-height: 50px;
}
.el-page-header__text >>> .el-page-header__content {
  font-size: 20px;
  margin-left: 40%;
  font-weight: bold;
}
.el-card-body >>> .el-card__body {
  padding: 0 !important;
}
.box-card {
  height: 180px;
  margin: 4px;
  padding: 0;
}
.el-card__head >>> .el-card__header {
  padding: 5px 20px !important;
  text-align: left;
  color: rgb(90, 90, 90);
  font-weight: 550;
  background-color: #dbd9da;
}
.el-icon-edit {
  font-size: 19px;
  font-weight: 550;
}
</style>
