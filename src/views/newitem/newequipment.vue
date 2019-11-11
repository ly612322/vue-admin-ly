<template>
  <div>
    <el-card class="box-card">
      <el-form
        ref="equipmentform"
        :model="equipmentform"
        label-width="106px"
        class="elform"
        :rules="rules"
        size="mini"
      >
        <el-form-item label="涉及制品" prop="classify">
          <el-radio-group v-model="equipmentform.link" @change="changeupload">
            <el-radio label="否">否</el-radio>
            <el-radio label="是">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="故障时间" prop="time">
          <el-date-picker v-model="equipmentform.time" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="处置组" prop="group" class="selectitem">
          <el-select v-model="equipmentform.group" placeholder="请选择处置组">
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
        <el-form-item label="设备群" prop="group" class="selectitem">
          <el-select v-model="equipmentform.eqgroup" placeholder="请选择设备群">
            <el-option label value></el-option>
            <el-option label="1" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="号机" prop="group" class="selectitem">
          <el-select v-model="equipmentform.eqnum" placeholder="请选择号机">
            <el-option label value></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="大单元" prop="group" class="selectitem">
          <el-select v-model="equipmentform.bigunit" placeholder="请选择设大单元">
            <el-option label value></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小单元" prop="group" class="selectitem">
          <el-select v-model="equipmentform.smallunit" placeholder="请选择设小单元">
            <el-option label value></el-option>
            <el-option label="4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障类型" prop="group" class="selectitem">
          <el-select v-model="equipmentform.faulttype" placeholder="请选择设故障类型">
            <el-option label value></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="故障现象" prop="group" class="selectitem">
          <el-input type="textarea" v-model="equipmentform.desc" :rows="3"></el-input>
        </el-form-item>
        <el-form-item label="品名" prop="group" class="selectitem">
          <el-input type="text" v-model="equipmentform.pinming" placeholder="请输入品名"></el-input>
        </el-form-item>
        <el-button
          ref="uploadbtn"
          type="primary"
          class="upload"
          @click.once="submitForm('equipmentform')"
          :disabled="isdisabled"
        >
          <span ref="uploadtext">提交</span>
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>
<script>
// import Vue from "vue";
// import vuex from "vuex";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      isdisabled: false,
      equipmentform: {
        link: "否",
        time: "",
        group: "",
        eqgroup: "",
        eqnum: "",
        bigunit: "",
        smallunit: "",
        faulttype: "",
        desc: "",
        pinming: ""
      },
      rules: {}
    };
  },
  methods: {
    changeupload() {
      if (this.equipmentform.link == "是") {
        this.$refs.uploadtext.innerText = "请填写相关制品异常单";
        this.isdisabled = true;
      } else {
        this.$refs.uploadtext.innerText = "提交";
        this.isdisabled = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.equipmentform;
          axios.post("/API/异常处置系统/LOT.py", qs.stringify(params));
          if (data.state === "") {
            this.lotDate = data.data;
          } else {
            alert(data.state);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  },
  updated() {
    console.log(this.$user);
  }
};
</script>
<style scoped>
.box-card {
  width: 600px;
}
.el-radio-group {
  float: left;
  padding-top: 6px;
}
.el-input,
.el-select {
  float: left;
}
.selectitem >>> .el-select {
  width: 221px !important;
}
.upload {
  margin-top: 10px;
  width: 70%;
  height: 53px;
  font-size: 20px;
}
</style>