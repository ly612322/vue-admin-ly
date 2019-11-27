<template>
  <div id="newsheet">
    <transition mode="out-in">
      <div ref="equipmentTic"  key="equipment">
          <el-form
            ref="equipmentform"
            :model="equipmentform"
            label-width="106px"
            class="elform"
            size="small "
          >
            <el-form-item label="故障时间" prop="time" class="selectitem">
              <el-date-picker
                v-model="equipmentform.time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="处置组" prop="group" class="selectitem">
              <el-select
                v-model="equipmentform.group"
                placeholder="请选择处置组"
                @change="queryeqgroup(api.eqgroup,equipmentform.group)"
              >
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
              <el-select
                v-model="equipmentform.eqgroup"
                placeholder="请选择设备群"
                @change="queryeqnum(api.eqnum, equipmentform.eqgroup)"
              >
                <el-option
                  v-for="item in eqgroup"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="号机" prop="group" class="selectitem">
              <el-select
                v-model="equipmentform.eqnum"
                placeholder="请选择号机"
                @change="querybigunit(api.bigunit, equipmentform.eqgroup,equipmentform.eqnum)"
              >
                <el-option
                  v-for="item in eqnum"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="大单元" prop="group" class="selectitem">
              <el-select
                v-model="equipmentform.bigunit"
                placeholder="请选择设大单元"
                @change="querysmallunit(api.smallunit,equipmentform.eqgroup,equipmentform.eqnum,equipmentform.bigunit)"
              >
                <el-option
                  v-for="item in bigunit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="小单元" prop="group" class="selectitem">
              <el-select
                v-model="equipmentform.smallunit"
                placeholder="请选择设小单元"
                @change="queryfaulttype(api.faulttype,equipmentform.eqgroup,equipmentform.eqnum,equipmentform.bigunit,equipmentform.smallunit)"
              >
                <el-option
                  v-for="item in smallunit"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障类型" prop="group" class="selectitem">
              <el-select v-model="equipmentform.faulttype" placeholder="请选择设故障类型">
                <el-option
                  v-for="item in faulttype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="故障现象" prop="group" class="selectitem">
              <el-input type="textarea" v-model="equipmentform.desc" :rows="5" style="float:left"></el-input>
            </el-form-item>
            <el-form-item label="品名" prop="group" class="selectitem">
              <el-input type="text" v-model="equipmentform.pinming" placeholder="请输入品名"></el-input>
            </el-form-item>
            <el-button
              ref="uploadbtn"
              type="primary"
              class="upload"
              @click.once="upload"
              :loading="uploadbtn"
            >
              <span ref="uploadtext">提交</span>
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'newsheet',
  data () {
    return {
      loading: false,
      uploadbtn: false,
      ticshow: false,
      api: {
        eqgroup: '/API/异常处置系统/设备群_新建异常单_面板厂.py',
        eqnum: '/API/异常处置系统/号机_新建异常单_面板厂.py',
        bigunit: '/API/异常处置系统/大单元_新建异常单_面板厂.py',
        smallunit: '/API/异常处置系统/小单元_新建异常单_面板厂.py',
        faulttype: '/API/异常处置系统/故障类型_新建异常单_面板厂.py'
      },
      equipmentform: {
        link: '否',
        time: '',
        group: '',
        eqgroups: '',
        eqnum: '',
        bigunit: '',
        smallunit: '',
        faulttype: '',
        desc: '',
        pinming: ''
      },
      eqgroup: [],
      eqnum: [],
      bigunit: [],
      smallunit: [],
      faulttype: []
    }
  },
  methods: {
    async queryeqgroup (api, ...value) {
      this.eqgroup = []
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify({ 处置组: value[0] })
      )
      data.data.split(',').forEach(ele => {
        this.eqgroup.push({
          value: ele,
          lable: ele
        })
      })
    },
    async queryeqnum (api, ...value) {
      this.eqnum = []
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify({ 设备群: value[0] })
      )
      console.log(data.data)
      data.data.split(',').forEach(ele => {
        this.eqnum.push({
          value: ele,
          lable: ele
        })
      })
    },
    async querybigunit (api, ...value) {
      this.bigunit = []
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify({ 设备群: value[0], 号机: value[1] })
      )
      data.data.split(',').forEach(ele => {
        this.bigunit.push({
          value: ele,
          lable: ele
        })
      })
    },
    async querysmallunit (api, ...value) {
      this.smallunit = []
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify({
          设备群: value[0],
          号机: value[1],
          大单元: value[2]
        })
      )
      data.data.split(',').forEach(ele => {
        this.smallunit.push({
          value: ele,
          lable: ele
        })
      })
    },
    async queryfaulttype (api, ...value) {
      this.faulttype = []
      const { data } = await this.$http.post(
        `${api}`,
        this.$qs.stringify({
          设备群: value[0],
          号机: value[1],
          大单元: value[2],
          小单元: value[3]
        })
      )
      data.data.split(',').forEach(ele => {
        this.faulttype.push({
          value: ele,
          lable: ele
        })
      })
    },
    // 初始异常时间
    formatTime () {
      const date = new Date()
      const year = date.getFullYear()
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date
        .getDate()
        .toString()
        .padStart(2, '0')
      const hour = date
        .getHours()
        .toString()
        .padStart(2, '0')
      const minute = date
        .getMinutes()
        .toString()
        .padStart(2, '0')
      const second = date
        .getSeconds()
        .toString()
        .padStart(2, '0')
      this.equipmentform.time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
    },
    changeupload () {
      if (this.equipmentform.link == '是') {
        this.$notify({
          title: '提示',
          message: '请填写相关制品异常单~',
          type: 'warning',
          duration: '',
          offset: 50
        })
      }
    },
    // 异常单信息上传
    async upload () {
      this.uploadbtn = true
      let params = {
        工号: 'C00000',
        制品_异常类型: '设备异常',
        设备_涉及制品: '否',
        设备_故障时间: this.equipmentform.time,
        设备_处置组: this.equipmentform.group,
        设备_设备群: this.equipmentform.eqgroup,
        设备_号机: this.equipmentform.eqnum,
        设备_大单元: this.equipmentform.bigunit,
        设备_小单元: this.equipmentform.smallunit,
        设备_故障类型: this.equipmentform.faulttype,
        设备_故障现象: this.equipmentform.desc,
        设备_品名: this.equipmentform.pinming
      }
      const { data } = await this.$http.post(
        '/API/异常处置系统/新建_异常单_面板厂.py',
        this.$qs.stringify(params)
      )
      if (data.state == '插入成功') {
        this.uploadbtn = false
        this.$notify({
          title: '提示',
          message: '创建成功~',
          type: 'success',
          duration: '2000'
        })
        this.$router.push('/设备单')
      } else {
        alert(data.state)
      }
    }
  },
  created () {
    this.formatTime()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload {
  width: 220px;
  height: 45px;
  font-size: 20px;
  margin-left: 105px;
}
.selectitem >>> .el-select {
  width: 221px !important;
}
.selectitem >>> .el-input {
  width: 221px !important;
}
.selectitem >>> .el-textarea {
  width: 221px !important;
}

</style>
