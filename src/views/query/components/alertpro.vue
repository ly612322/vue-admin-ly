<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="加载中...">
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>工号</td>
        <td id="0"></td>
        <td>处置组</td>
        <td id="1"></td>
      </tr>
      <tr>
        <td>异常单</td>
        <td id="2"></td>
        <td>异常名称</td>
        <td id="3"></td>
      </tr>

      <tr>
        <td>异常描述</td>
        <td colspan="3" id="4"></td>
      </tr>
      <tr>
        <td>异常发生时间</td>
        <td id="5"></td>
        <td>异常程度</td>
        <td id="6"></td>
      </tr>
      <tr>
        <td>制品分类</td>
        <td id="7"></td>
        <td>异常关联</td>
        <td id="8"></td>
      </tr>
      <tr>
        <td>起因设备</td>
        <td colspan="3" id="9"></td>
      </tr>
      <tr>
        <td>正向追踪单</td>
        <td colspan="3" id="10"></td>
      </tr>
      <tr>
        <td>原因</td>
        <td colspan="3" id="11"></td>
      </tr>
    </table>
    <el-row type="flex">
      <el-col :span="19">
        <el-card class="box-card el-card__head el-card-body" shadow="never">
          <div slot="header" class="clearfix">
            <span>LOT信息</span>
          </div>
          <el-table :data="lotData" border align="center" class="el-table-unset" max-height="200">
            <el-table-column align="center" prop="LOT" label="LOT" width="100"></el-table-column>
            <el-table-column align="center" prop="SHEET" label="SHEET" width="100"></el-table-column>
            <el-table-column align="center" prop="PANEL" label="PANEL" width="100"></el-table-column>
            <el-table-column align="center" prop="品名" label="品名" width="150"></el-table-column>
            <el-table-column align="center" prop="设备" label="设备" width="100"></el-table-column>
            <el-table-column align="center" prop="大工程" label="大工程" width="100"></el-table-column>
            <el-table-column align="center" prop="小工程" label="小工程" width="100"></el-table-column>
            <el-table-column align="center" prop="备注" label="备注"></el-table-column>
          </el-table>
        </el-card>

        <el-card class="box-card el-card__head el-card-body" shadow="never">
          <div slot="header" class="clearfix">
            <span>最新处置进度</span>
          </div>
          <el-table :data="dealstep" border align="center" class="el-table-unset" max-height="200">
            <el-table-column
              align="center"
              prop="指示时间"
              label="指示时间"
              width="200"
              :formatter="this.common.sliceDate"
            ></el-table-column>
            <el-table-column align="center" prop="指示" label="指示"></el-table-column>
            <el-table-column
              align="center"
              prop="结果"
              label="结果"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column align="center" prop="进度" label="进度" width="100"></el-table-column>
            <el-table-column
              align="center"
              prop="确认时间"
              label="确认时间"
              width="180"
              :formatter="this.common.removeNone"
            ></el-table-column>
            <el-table-column
              align="center"
              prop="确认人"
              label="确认人"
              width="100"
              :formatter="this.common.removeNone"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="5">
        <el-card class="box-card el-card__head box-card-right" shadow="never">
          <div slot="header" class="clearfix">
            <span>不良位置</span>
          </div>
          <div class="picdisplay">
            <div style="margin-left: 80%">1300</div>
            <div class="picture"></div>
            <div class="picture"></div>
            <div class="picture"></div>
            <br />
            <div class="picture" style="margin-left:7%"></div>
            <div class="picture"></div>
            <div class="picture"></div>
            <div style="width:96%">
              <span style="float:left">1100</span>
              <span style="float:right">OF</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-input v-model="manremarked" placeholder="暂无" disabled>
          <template slot="prepend">经理已备注内容</template>
        </el-input>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input v-model="manremark" placeholder="请填写备注">
          <template slot="prepend">经理备注</template>
        </el-input>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="manconfirm('通过')">通过</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="danger" @click="manconfirm('驳回')">驳回</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="7">
        <el-input v-model="pqcremarked" placeholder="暂无" disabled>
          <template slot="prepend">PQC已备注内容</template>
        </el-input>
      </el-col>
      <el-col :span="9" :offset="1">
        <el-input v-model="pqcremark" placeholder="请填写备注">
          <template slot="prepend">PQC备注</template>PQC
        </el-input>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="success" @click="pqcconfirm('通过')">通过</el-button>
      </el-col>
      <el-col :span="1" :offset="1">
        <el-button type="danger" @click="pqcconfirm('驳回')">驳回</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      details: {},
      lotData: [],
      dealstep: [],
      manremarked: "",
      manremark: "",
      pqcremarked: "",
      pqcremark: ""
    }
  },
  props: ["id", "group"],
  methods: {
    async querymessage() {
      this.fullscreenLoading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/制品单关联.py",
        this.$qs.stringify({
          编号: this.id
        })
      )
      this.lotData = data.LOT信息
      this.dealstep = data.最新处置进度
      this.details = data.制品异常详情
      for (var i = 0; i < 12; i++) {
        document.getElementById(i).innerHTML = Object.values(this.details)[i]
      }
      console.log(data.不良位置.length)
      if (data.不良位置.length == 0) {
        console.log("不良位置为空")
      } else {
        let pictrue = document.getElementsByClassName("picture")
        for (let i = 0; i < 6; i++) {
          if (data.不良位置[0][Object.keys(data.不良位置[0])[i]] == 1) {
            pictrue[i].style.backgroundColor = "red"
          }
        }
      }
      this.manremarked = Object.values(data.经理确认)[0]
      this.pqcremarked = Object.values(data.PQC确认)[0]
      this.fullscreenLoading = false
    },
    async manconfirm(state) {
      const { data } = await this.$http.post(
        "/API/异常处置系统/经理_制品确认_面板厂.py",
        this.$qs.stringify({
          工号: this.$store.state.username,
          编号: this.id,
          备注: this.manremark,
          状态: state,
          处置组: this.group
        })
      )
      if (data.state == "无权限") {
        this.$message.error("无权限")
        return
      } else {
        this.$message.success("操作成功")
        this.$emit("proclose")
      }
    },
    async pqcconfirm(state) {
      const { data } = await this.$http.post(
        "/API/异常处置系统/PQC_制品确认_面板厂.py",
        this.$qs.stringify({
          工号: this.$store.state.username,
          编号: this.id,
          备注: this.pqcremark,
          状态: state,
          处置组: this.group
        })
      )
      if (data.state == "无权限") {
        this.$message.error("无权限")
        return
      } else {
        this.$message.success("操作成功")
        this.$emit("proclose")
      }
    }
  },
  created() {
    this.querymessage()
  }
}
</script>
<style  scoped>
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
.el-button {
  width: 100px;
}
.el-row {
  margin-bottom: 5px;
}
.el-card__head >>> .el-card__header {
  padding: 5px 20px !important;
  text-align: left;
  color: rgb(90, 90, 90);
  font-weight: 550;
  background-color: #dbd9da;
}

.box-card {
  height: 230px;
  margin: 4px;
  padding: 0;
}
.el-card-body >>> .el-card__body {
  padding: 0 !important;
}
.box-card-right {
  margin: 5px;
  height: 465px;
}
.box-card-ld {
  height: 365px;
}
.box-card-rd >>> .el-card__body {
  padding: 0;
  height: 370px !important;
}
.picdisplay {
  margin-top: 15%;
  margin-left: 15%;
}
.picture {
  display: inline-block;
  width: 20%;
  height: 129px;
  margin-left: 7%;
  background-color: #5bf106;
  border: 1px solid rgba(170, 170, 170, 0.87);
  border-radius: 2px;
  box-shadow: 4px 4px 5px #cccccc;
}
</style>
