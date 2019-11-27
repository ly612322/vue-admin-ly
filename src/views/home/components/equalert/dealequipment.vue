<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="加载中...">
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>编号</td>
        <td>{{details.编号}}</td>
        <td>故障时间</td>
        <td>{{details.故障时间}}</td>
      </tr>
      <tr>
        <td>处置组</td>
        <td>{{details.处置组}}</td>
        <td>设备群</td>
        <td>{{details.设备群}}</td>
      </tr>
      <tr>
        <td>号机</td>
        <td>{{details.号机}}</td>
        <td>大单元</td>
        <td>{{details.大单元}}</td>
      </tr>
      <tr>
        <td>小单元</td>
        <td>{{details.小单元}}</td>
        <td>品名</td>
        <td>{{details.品名}}</td>
      </tr>

      <tr>
        <td>故障类型</td>
        <td colspan="3">{{details.故障类型}}</td>
      </tr>
      <tr>
        <td>故障现象</td>
        <td colspan="3">{{details.故障现象}}</td>
      </tr>
    </table>
    <el-card class="box-card el-card__head el-card-body" shadow="never">
      <div slot="header" class="clearfix">
        <span>设备处置记录</span>
      </div>
      <el-table :data="equipmentItem" border max-height="300" align="center">
        <el-table-column align="center" prop="编号" width="240" label="编号"></el-table-column>
        <el-table-column align="center" prop="确认项" width="150" label="项目"></el-table-column>
        <el-table-column
          align="center"
          prop="上限"
          width="120"
          label="上限"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="下限"
          width="120"
          label="下限"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column
          align="center"
          prop="确认模式"
          width="120"
          label="确认模式"
          :formatter="this.common.removeNone"
        ></el-table-column>
        <el-table-column align="center" prop="确认" width="120" label="确认">
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row.确认" :checked="scope.row.确认 == '是'?true:false"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="状态" width="120" label="状态">
          <template slot-scope="scope">
            <el-select v-model="scope.row.状态">
              <el-option label="进行" value="进行"></el-option>
              <el-option label="完结" value="完结"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="结果" label="结果">
          <template slot-scope="scope">
            <el-input v-model="scope.row.结果"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="备注" label="备注">
          <template slot-scope="scope">
            <el-input v-model="scope.row.备注"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-divider>
      <i class="el-icon-edit">处置中</i>
    </el-divider>
    <el-form :model="equipmentform" label-width="106px" class="elform" label-position="right">
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :span="15">
          <el-form-item label="原因" prop="原因">
            <el-input placeholder="请输入原因" v-model="equipmentform.原因" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="处置完成时间">
            <el-date-picker
              type="datetime"
              v-model="equipmentform.处置完成时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :span="15">
          <el-form-item label="处置方法" prop="处置方法">
            <el-input
              placeholder="请输入处置方法"
              v-model="equipmentform.处置方法"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="量产时间">
            <el-date-picker
              type="datetime"
              v-model="equipmentform.量产时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :span="15">
          <el-form-item label="处置结果" prop="处置结果">
            <el-input
              placeholder="请输入处置结果"
              v-model="equipmentform.处置结果"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="水平展开" prop="type">
            <el-radio label="0" v-model="equipmentform.水平展开">不展开</el-radio>
            <el-radio label="1" v-model="equipmentform.水平展开">展开</el-radio>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :span="15">
          <el-form-item label="更换备件" prop="更换备件">
            <el-input
              placeholder="请输入更换备件"
              v-model="equipmentform.更换备件"
              maxlength="50"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item prop="水平展开_备注" label="展开备注">
            <el-input placeholder="请输入备注" v-model="equipmentform.水平展开_备注" maxlength="50"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="start" :gutter="10">
        <el-col :span="6">
          <el-form-item label="状态" prop="状态">
            <el-select v-model="equipmentform.设备_状态" placeholder="状态">
              <el-option label="完结" value="完结"></el-option>
              <el-option label="进行" value="进行"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item prop="经理备注" label="经理备注">
            <el-input placeholder="经理备注" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" :offset="1">
          <el-button
            ref="uploadbtn"
            type="primary"
            class="upload"
            @click="submitForm"
            style="width:200px"
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
import inputFilter from "../../../../utils/index.js"
export default {
  name: "equipmentprocess",
  data() {
    return {
      fullscreenLoading: false,
      equipmentform: {
        原因: "",
        处置完成时间: "",
        处置方法: "",
        量产时间: "",
        处置结果: "",
        水平展开: "0",
        更换备件: "",
        水平展开_备注: "",
        设备_状态: "进行"
      },
      rules: [],
      details: [],
      equipmentItem: [],
      jurisdiction: ""
    }
  },
  props: ["id", "group"],
  methods: {
    async queryMessage() {
      this.fullscreenLoading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/设备立上_设备单处置_异常单.py",
        this.$qs.stringify({
          编号: this.id
        })
      )
      this.details = data.设备异常详情
      console.log(this.details)
      this.equipmentItem = data.设备立上
      this.equipmentform.原因 = this.details.原因.replace("None", "")
      this.equipmentform.处置方法 = this.details.处置方法.replace("None", "")
      this.equipmentform.处置结果 = this.details.处置结果.replace("None", "")
      this.equipmentform.更换备件 = this.details.更换备件.replace("None", "")
      this.fullscreenLoading = false
    },
    // 初始异常时间
    formatTime() {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, "0")
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0")
      const hour = date
        .getHours()
        .toString()
        .padStart(2, "0")
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0")
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, "0")
      this.equipmentform.处置完成时间 = `${year}-${month}-${day} ${hour}:${minute}:${second}`
      this.equipmentform.量产时间 = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
    async submitForm() {
      if (this.jurisdiction == "无权限") {
        this.$message.error("无权限")
        return
      }
      let params = {
        确认人: this.$store.state.username,
        编号: this.equipmentItem
          .map(ele => {
            return ele.编号
          })
          .join(","),
        项目: this.equipmentItem
          .map(ele => {
            return ele.确认项
          })
          .join(","),
        上限: this.equipmentItem
          .map(ele => {
            return ele.上限.replace("None", "")
          })
          .join(","),
        下限: this.equipmentItem
          .map(ele => {
            return ele.下限.replace("None", "")
          })
          .join(","),
        模式: this.equipmentItem
          .map(ele => {
            return ele.确认模式.replace("None", "")
          })
          .join(","),
        确认: this.equipmentItem
          .map(ele => {
            return ele.确认 == true ? (ele.确认 = "是") : (ele.确认 = "否")
          })
          .join(","),
        状态: this.equipmentItem
          .map(ele => {
            return ele.状态
          })
          .join(","),
        结果: this.equipmentItem
          .map(ele => {
            return ele.结果
          })
          .join(","),
        备注: this.equipmentItem
          .map(ele => {
            return ele.备注
          })
          .join(",")
      }
      params = Object.assign(params, this.equipmentform)
      const { data: state } = await this.$http.post(
        "/API/异常处置系统/设备处置_异常单_面板厂.py",
        this.$qs.stringify(params)
      )
      if (state.state == "插入成功") {
        const h = this.$createElement
        this.submitloading = false
        this.$alert(
          h("span", { style: "font-size: 18px" }, "指示成功"),
          "提示",
          {
            confirmButtonText: "确定",
            showClose: false,
            type: "success",
            callback: action => {
              if (action === "confirm") {
                this.$emit("close")
                this.$store.state.refresh = new Date().getTime()
              }
            }
          }
        )
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    async Jurisdiction() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/权限_异常单_面板厂.py",
        this.$qs.stringify({
          工号: this.$store.state.username,
          处置组: this.group
        })
      )
      console.log(data.state)
      if (data.state == "无权限") {
        this.jurisdiction = "无权限"
      } else {
        this.jurisdiction = "有权限"
      }
    }
  },
  created() {
    this.queryMessage()
    this.formatTime()
    this.Jurisdiction()
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
  text-align: center;
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
  margin-left: 43%;
  font-weight: bold;
}
.el-card-body >>> .el-card__body {
  padding: 0 !important;
}
.box-card {
  height: 250px;
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
