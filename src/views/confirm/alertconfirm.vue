<template>
  <div>
    <table class="table table-bordered" style="margin-bottom:10px;">
      <tr>
        <td>异常单编号</td>
        <td colspan="3">{{details.故障类型}}</td>
      </tr>
      <tr>
        <td>指示</td>
        <td colspan="3">{{details.故障类型}}</td>
      </tr>
      <tr>
        <td>指示人员</td>
        <td>{{details.号机}}</td>
        <td>指示组</td>
        <td>{{details.大单元}}</td>
      </tr>
      <tr>
        <td>指示时间</td>
        <td>{{details.小单元}}</td>
        <td>最后确认结果</td>
        <td>{{details.品名}}</td>
      </tr>
      <tr>
        <td>最后确认人</td>
        <td>{{details.小单元}}</td>
        <td>最后确认时间</td>
        <td>{{details.品名}}</td>
      </tr>
    </table>
    <el-card class="box-card el-card__head el-card-body" shadow="never">
      <div slot="header" class="clearfix">
        <span>LOT信息</span>
      </div>
      <el-table :data="equipmentItem" border max-height="250" align="center">
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
    <el-form
      :model="equipmentform"
      label-width="106px"
      class="elform"
      :rules="rules"
      label-position="right"
    >
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <el-form-item label="本次确认结果" prop="本次确认结果">
            <el-input placeholder="请输入结果" v-model="equipmentform.原因" maxlength="50" show-word-limit></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :span="18" >
          <el-form-item prop="type">
            <el-radio-group v-model="equipmentform.水平展开">
              <el-radio label="暂存:指示全部出来完成前暂存阶段结果"></el-radio>
              <el-radio label="完结:指示处理全部完成"></el-radio>
            </el-radio-group>
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
            :disabled="isdisabled"
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
import inputFilter from "../../utils/index.js";
export default {
  name: "equipmentprocess",
  data() {
    return {
      equipmentform: {
        原因: "",
        处置完成时间: "",
        处置方法: "",
        量产时间: "",
        处置结果: "",
        水平展开: "不展开",
        更换备件: "",
        水平展开_备注: "",
        设备_状态: "进行"
      },
      rules: [],
      details: [],
      equipmentItem: []
    };
  },
  methods: {
    async queryMessage() {
      const { data } = await this.$http.post(
        "/API/异常处置系统/设备立上_设备单处置_异常单.py",
        this.$qs.stringify({
          编号: this.$route.params.id
        })
      );
      this.details = data.设备异常详情;
      this.equipmentItem = data.设备立上;
    },
    //初始异常时间
    formatTime() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date
        .getDate()
        .toString()
        .padStart(2, "0");
      const hour = date
        .getHours()
        .toString()
        .padStart(2, "0");
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, "0");
      this.equipmentform.处置完成时间 = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      this.equipmentform.量产时间 = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    async submitForm() {
      let params = {
        确认人: "C00000",
        编号: this.$route.params.id,
        上限: this.equipmentItem
          .map(ele => {
            return ele.上限.replace("None", "");
          })
          .join(","),
        下限: this.equipmentItem
          .map(ele => {
            return ele.下限.replace("None", "");
          })
          .join(","),
        模式: this.equipmentItem
          .map(ele => {
            return ele.模式;
          })
          .join(","),
        确认: this.equipmentItem
          .map(ele => {
            return ele.确认 == true ? (ele.确认 = "是") : (ele.确认 = "否");
          })
          .join(","),
        状态: this.equipmentItem
          .map(ele => {
            return ele.状态;
          })
          .join(","),
        结果: this.equipmentItem
          .map(ele => {
            return ele.结果;
          })
          .join(","),
        备注: this.equipmentItem
          .map(ele => {
            return ele.备注;
          })
          .join(",")
      };
      params = Object.assign(params, this.equipmentform);
      console.log(params);
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
    this.queryMessage();
    this.formatTime();
  }
};
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