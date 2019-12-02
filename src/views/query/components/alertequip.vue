<template>
  <div v-loading.lock="fullscreenLoading" element-loading-text="加载中...">
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>工号</td>
        <td>{{details.工号}}</td>
        <td>编号</td>
        <td>{{details.编号}}</td>
      </tr>
      <tr>
        <td>故障时间</td>
        <td>{{details.故障时间}}</td>
        <td>状态</td>
        <td>{{details.状态}}</td>
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
      <tr>
        <td>原因</td>
        <td colspan="3">{{details.原因.replace('None','')}}</td>
      </tr>
      <tr>
        <td>处置方法</td>
        <td colspan="3">{{details.处置方法.replace('None','')}}</td>
      </tr>
      <tr>
        <td>处置结果</td>
        <td colspan="3">{{details.处置结果.replace('None','')}}</td>
      </tr>
      <tr>
        <td>更换备件</td>
        <td colspan="3">{{details.更换备件.replace('None','')}}</td>
      </tr>
      <tr>
        <td>处置完成时间</td>
        <td>{{details.处置完成时间.replace('None','')}}</td>
        <td>量产时间</td>
        <td>{{details.量产时间.replace('None','')}}</td>
      </tr>
      <tr>
        <td>水平展开</td>
        <td>{{details.水平展开.replace('None','')}}</td>
        <td>最后处置人员</td>
        <td>{{details.最后处置人员}}</td>
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
            <el-checkbox v-model="scope.row.确认" checked></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="状态" width="120" label="状态"></el-table-column>
        <el-table-column align="center" prop="结果" label="结果"></el-table-column>
        <el-table-column align="center" prop="备注" label="备注"></el-table-column>
      </el-table>
    </el-card>
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
      details: [],
      equipmentItem: [],
      manremarked: "",
      manremark: "",
      pqcremarked: "",
      pqcremark: ""
    }
  },
  props: ["id", "group", "eququery"],
  methods: {
    async queryMessage() {
      this.fullscreenLoading = true
      const { data } = await this.$http.post(
        "/API/异常处置系统/设备单关联.py",
        this.$qs.stringify({
          编号: this.id
        })
      )
      this.details = data.设备异常详情
      this.equipmentItem = data.设备处置记录
      this.manremarked = Object.values(data.经理确认)[0]
      this.pqcremarked = Object.values(data.PQC确认)[0]
      this.fullscreenLoading = false
    },
    async manconfirm(state) {
      const { data } = await this.$http.post(
        "/API/异常处置系统/经理_设备确认_面板厂.py",
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
        this.$emit("equclose")
        this.$emit("eququery")
      }
    },
    async pqcconfirm(state) {
      const { data } = await this.$http.post(
        "/API/异常处置系统/PQC_设备确认_面板厂.py",
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
        this.$emit("equclose")
        this.$emit("eququery")
      }
    }
  },
  created() {
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
</style>
