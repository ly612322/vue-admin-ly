<template>
  <div>
    <el-card class="box-card">
      <el-form
        ref="equipmentform"
        :model="equipmentform"
        label-width="106px"
        class="elform"
        :rules="rules"
      >
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
        <el-row>
          <el-col :span="10">
            <el-form-item label="故障现象" prop="group" class="selectitem">
              <el-input type="textarea" v-model="equipmentform.desc" :rows="3"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10">
            <el-form-item label="品名" prop="group" class="selectitem">
              <el-input type="text" v-model="equipmentform.pinming" placeholder="请输入品名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
export default {
  data() {
    return {
      isdisabled: false,
      equipmentform: {
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
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.equipmentform
          axios.post("/API/异常处置系统/LOT.py", qs.stringify(params))
          if (data.state === "") {
            this.lotDate = data.data
          } else {
            alert(data.state)
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
    }
  },
  updated() {
    console.log(this.$user)
  }
}
</script>
<style scoped>
.box-card {
  text-align: center;
  height: 90vh;
}
.el-input,
.el-select {
  float: left;
}
.el-form-item {
  margin-bottom: 19px;
}
.selectitem >>> .el-select {
  width: 221px !important;
}
.upload {
 float: left;
 margin-left: 10%;
  width: 20%;
  height: 42px;
  font-size: 19px;
}
</style>